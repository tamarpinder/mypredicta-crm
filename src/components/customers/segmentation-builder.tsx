'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  X, 
  Users, 
  Target, 
  Filter,
  Save,
  Play,
  Eye,
  TrendingUp,
  DollarSign,
  Calendar,
  MapPin,
  Star,
  AlertTriangle,
  Clock,
  Gamepad2
} from 'lucide-react';
import { Customer } from '@/types';

interface SegmentationBuilderProps {
  customers: Customer[];
  onSave: (segment: any) => void;
  onCancel: () => void;
}

type Operator = 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'greater_equal' | 'less_equal' | 'contains' | 'not_contains' | 'in' | 'not_in';
type LogicalOperator = 'and' | 'or';

interface Condition {
  id: string;
  field: string;
  operator: Operator;
  value: string | number;
  logicalOperator?: LogicalOperator;
}

interface SegmentRule {
  id: string;
  name: string;
  conditions: Condition[];
  matchedCustomers: number;
  description?: string;
}

export function SegmentationBuilder({ customers, onSave, onCancel }: SegmentationBuilderProps) {
  const [segmentName, setSegmentName] = useState('');
  const [segmentDescription, setSegmentDescription] = useState('');
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  const fieldOptions = [
    { value: 'lifetimeValue', label: 'Lifetime Value', type: 'number', icon: DollarSign },
    { value: 'totalDeposits', label: 'Total Deposits', type: 'number', icon: DollarSign },
    { value: 'totalWithdrawals', label: 'Total Withdrawals', type: 'number', icon: DollarSign },
    { value: 'registrationDate', label: 'Registration Date', type: 'date', icon: Calendar },
    { value: 'lastLoginDate', label: 'Last Login', type: 'date', icon: Clock },
    { value: 'country', label: 'Country', type: 'string', icon: MapPin },
    { value: 'vipLevel', label: 'VIP Level', type: 'select', icon: Star, options: ['bronze', 'silver', 'gold', 'platinum'] },
    { value: 'status', label: 'Status', type: 'select', icon: Users, options: ['active', 'inactive', 'suspended', 'banned'] },
    { value: 'segment', label: 'Current Segment', type: 'select', icon: Target, options: ['high-value', 'regular', 'at-risk', 'churned'] },
    { value: 'churnScore', label: 'Churn Score', type: 'number', icon: AlertTriangle },
    { value: 'favoriteGame', label: 'Favorite Game', type: 'string', icon: Gamepad2 },
    { value: 'isVip', label: 'Is VIP', type: 'boolean', icon: Star },
    { value: 'marketingConsent', label: 'Marketing Consent', type: 'boolean', icon: Target }
  ];

  const operatorOptions = {
    string: [
      { value: 'equals', label: 'Equals' },
      { value: 'not_equals', label: 'Not Equals' },
      { value: 'contains', label: 'Contains' },
      { value: 'not_contains', label: 'Does Not Contain' }
    ],
    number: [
      { value: 'equals', label: 'Equals' },
      { value: 'not_equals', label: 'Not Equals' },
      { value: 'greater_than', label: 'Greater Than' },
      { value: 'less_than', label: 'Less Than' },
      { value: 'greater_equal', label: 'Greater Than or Equal' },
      { value: 'less_equal', label: 'Less Than or Equal' }
    ],
    date: [
      { value: 'equals', label: 'Equals' },
      { value: 'not_equals', label: 'Not Equals' },
      { value: 'greater_than', label: 'After' },
      { value: 'less_than', label: 'Before' },
      { value: 'greater_equal', label: 'On or After' },
      { value: 'less_equal', label: 'On or Before' }
    ],
    select: [
      { value: 'equals', label: 'Equals' },
      { value: 'not_equals', label: 'Not Equals' },
      { value: 'in', label: 'In' },
      { value: 'not_in', label: 'Not In' }
    ],
    boolean: [
      { value: 'equals', label: 'Is' }
    ]
  };

  const addCondition = () => {
    const newCondition: Condition = {
      id: Date.now().toString(),
      field: 'lifetimeValue',
      operator: 'greater_than',
      value: 0,
      logicalOperator: conditions.length > 0 ? 'and' : undefined
    };
    setConditions([...conditions, newCondition]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const updateCondition = (id: string, updates: Partial<Condition>) => {
    setConditions(conditions.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ));
  };

  const evaluateCondition = (customer: Customer, condition: Condition): boolean => {
    const fieldValue = customer[condition.field as keyof Customer];
    const conditionValue = condition.value;

    switch (condition.operator) {
      case 'equals':
        return fieldValue === conditionValue;
      case 'not_equals':
        return fieldValue !== conditionValue;
      case 'greater_than':
        return Number(fieldValue) > Number(conditionValue);
      case 'less_than':
        return Number(fieldValue) < Number(conditionValue);
      case 'greater_equal':
        return Number(fieldValue) >= Number(conditionValue);
      case 'less_equal':
        return Number(fieldValue) <= Number(conditionValue);
      case 'contains':
        return String(fieldValue).toLowerCase().includes(String(conditionValue).toLowerCase());
      case 'not_contains':
        return !String(fieldValue).toLowerCase().includes(String(conditionValue).toLowerCase());
      case 'in':
        return String(conditionValue).split(',').map(v => v.trim()).includes(String(fieldValue));
      case 'not_in':
        return !String(conditionValue).split(',').map(v => v.trim()).includes(String(fieldValue));
      default:
        return false;
    }
  };

  const getMatchedCustomers = () => {
    if (conditions.length === 0) return customers;

    return customers.filter(customer => {
      let result = true;
      
      for (let i = 0; i < conditions.length; i++) {
        const condition = conditions[i];
        const conditionResult = evaluateCondition(customer, condition);
        
        if (i === 0) {
          result = conditionResult;
        } else {
          if (condition.logicalOperator === 'and') {
            result = result && conditionResult;
          } else if (condition.logicalOperator === 'or') {
            result = result || conditionResult;
          }
        }
      }
      
      return result;
    });
  };

  const matchedCustomers = getMatchedCustomers();
  const matchPercentage = customers.length > 0 ? (matchedCustomers.length / customers.length) * 100 : 0;

  const getFieldType = (field: string) => {
    const fieldOption = fieldOptions.find(f => f.value === field);
    return fieldOption?.type || 'string';
  };

  const getFieldIcon = (field: string) => {
    const fieldOption = fieldOptions.find(f => f.value === field);
    return fieldOption?.icon || Filter;
  };

  const getFieldOptions = (field: string) => {
    const fieldOption = fieldOptions.find(f => f.value === field);
    return fieldOption?.options || [];
  };

  const handleSave = () => {
    const segment = {
      id: Date.now().toString(),
      name: segmentName,
      description: segmentDescription,
      conditions,
      matchedCustomers: matchedCustomers.length,
      createdAt: new Date().toISOString()
    };
    onSave(segment);
  };

  const renderConditionValue = (condition: Condition) => {
    const field = fieldOptions.find(f => f.value === condition.field);
    const fieldType = field?.type || 'string';

    switch (fieldType) {
      case 'number':
        return (
          <Input
            type="number"
            value={condition.value}
            onChange={(e) => updateCondition(condition.id, { value: parseFloat(e.target.value) || 0 })}
            placeholder="Enter value"
            className="w-32"
          />
        );
      case 'date':
        return (
          <Input
            type="date"
            value={condition.value}
            onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
            className="w-36"
          />
        );
      case 'select':
        return (
          <Select 
            value={String(condition.value)} 
            onValueChange={(value) => updateCondition(condition.id, { value })}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {getFieldOptions(condition.field).map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'boolean':
        return (
          <Select 
            value={String(condition.value)} 
            onValueChange={(value) => updateCondition(condition.id, { value: value === 'true' })}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            value={condition.value}
            onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
            placeholder="Enter value"
            className="w-32"
          />
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Customer Segmentation Builder</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              {previewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="segmentName">Segment Name</Label>
            <Input
              id="segmentName"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="Enter segment name"
            />
          </div>
          <div>
            <Label htmlFor="segmentDescription">Description (Optional)</Label>
            <Input
              id="segmentDescription"
              value={segmentDescription}
              onChange={(e) => setSegmentDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conditions Builder */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Segment Conditions
              </CardTitle>
              <Button size="sm" onClick={addCondition} className="gap-1">
                <Plus className="h-3 w-3" />
                Add Condition
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conditions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Filter className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No conditions added yet.</p>
                  <p className="text-sm">Click "Add Condition" to start building your segment.</p>
                </div>
              ) : (
                conditions.map((condition, index) => (
                  <div key={condition.id} className="space-y-2">
                    {index > 0 && (
                      <div className="flex items-center gap-2">
                        <Select
                          value={condition.logicalOperator || 'and'}
                          onValueChange={(value) => updateCondition(condition.id, { logicalOperator: value as LogicalOperator })}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="and">AND</SelectItem>
                            <SelectItem value="or">OR</SelectItem>
                          </SelectContent>
                        </Select>
                        <Separator className="flex-1" />
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 p-3 border rounded-lg">
                      {/* Field */}
                      <Select
                        value={condition.field}
                        onValueChange={(value) => updateCondition(condition.id, { field: value })}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldOptions.map(field => {
                            const Icon = field.icon;
                            return (
                              <SelectItem key={field.value} value={field.value}>
                                <div className="flex items-center gap-2">
                                  <Icon className="h-4 w-4" />
                                  {field.label}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>

                      {/* Operator */}
                      <Select
                        value={condition.operator}
                        onValueChange={(value) => updateCondition(condition.id, { operator: value as Operator })}
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {operatorOptions[getFieldType(condition.field) as keyof typeof operatorOptions]?.map(op => (
                            <SelectItem key={op.value} value={op.value}>
                              {op.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {/* Value */}
                      {renderConditionValue(condition)}

                      {/* Remove Button */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeCondition(condition.id)}
                        className="gap-1"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Segment Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Match Statistics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {matchedCustomers.length.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Matched Customers</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">
                    {matchPercentage.toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">of Total Customers</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Segment Coverage</span>
                  <span>{matchedCustomers.length} / {customers.length}</span>
                </div>
                <Progress value={matchPercentage} className="h-2" />
              </div>

              {/* Sample Customers */}
              {matchedCustomers.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Sample Customers</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {matchedCustomers.slice(0, 5).map(customer => (
                      <div key={customer.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              {customer.firstName} {customer.lastName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {customer.segment} • LTV: ${customer.lifetimeValue.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {customer.isVip ? 'VIP' : 'Regular'}
                        </Badge>
                      </div>
                    ))}
                    {matchedCustomers.length > 5 && (
                      <div className="text-center text-sm text-muted-foreground">
                        +{matchedCustomers.length - 5} more customers
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Segment Insights */}
              {matchedCustomers.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Segment Insights</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Avg LTV:</span>
                      <span className="font-medium ml-2">
                        ${(matchedCustomers.reduce((sum, c) => sum + c.lifetimeValue, 0) / matchedCustomers.length).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">VIP %:</span>
                      <span className="font-medium ml-2">
                        {((matchedCustomers.filter(c => c.isVip).length / matchedCustomers.length) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" className="gap-2">
          <Save className="h-4 w-4" />
          Save Draft
        </Button>
        <Button
          onClick={handleSave}
          disabled={!segmentName || conditions.length === 0}
          className="gap-2"
        >
          <Target className="h-4 w-4" />
          Create Segment
        </Button>
      </div>
    </div>
  );
}