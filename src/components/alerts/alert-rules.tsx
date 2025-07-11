'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertTriangle, 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  Pause,
  Settings,
  Clock,
  Target,
  Bell,
  Mail,
  Smartphone,
  Globe,
  Zap
} from 'lucide-react';
import { toastSuccess } from '@/hooks/use-toast';
import { AlertRule, AlertCondition, AlertAction } from '@/types';
import { mockAlertRules } from '@/data/notification-mock-data';
import { formatDate } from '@/utils/format';

interface AlertRulesProps {
  onCreateRule?: (rule: Omit<AlertRule, 'id'>) => void;
  onUpdateRule?: (ruleId: string, updates: Partial<AlertRule>) => void;
  onDeleteRule?: (ruleId: string) => void;
  onToggleRule?: (ruleId: string, isActive: boolean) => void;
  triggerCreate?: boolean;
}

const conditionFields = [
  { value: 'churnScore', label: 'Churn Score', type: 'number' },
  { value: 'lifetimeValue', label: 'Lifetime Value', type: 'number' },
  { value: 'transactionAmount', label: 'Transaction Amount', type: 'number' },
  { value: 'conversionRate', label: 'Conversion Rate', type: 'number' },
  { value: 'dailyRevenue', label: 'Daily Revenue', type: 'number' },
  { value: 'timeInStage', label: 'Time in Stage (hours)', type: 'number' },
  { value: 'customerSegment', label: 'Customer Segment', type: 'string' },
  { value: 'campaignStatus', label: 'Campaign Status', type: 'string' }
];

const operators = [
  { value: 'equals', label: 'Equals' },
  { value: 'not_equals', label: 'Not Equals' },
  { value: 'greater_than', label: 'Greater Than' },
  { value: 'less_than', label: 'Less Than' },
  { value: 'greater_equal', label: 'Greater Than or Equal' },
  { value: 'less_equal', label: 'Less Than or Equal' },
  { value: 'contains', label: 'Contains' },
  { value: 'not_contains', label: 'Does Not Contain' }
];

const actionTypes = [
  { value: 'notification', label: 'In-App Notification', icon: Bell },
  { value: 'email', label: 'Email Alert', icon: Mail },
  { value: 'sms', label: 'SMS Alert', icon: Smartphone },
  { value: 'webhook', label: 'Webhook', icon: Globe },
  { value: 'task', label: 'Create Task', icon: Zap }
];

export function AlertRules({ 
  onCreateRule, 
  onUpdateRule, 
  onDeleteRule, 
  onToggleRule,
  triggerCreate 
}: AlertRulesProps) {
  const [rules, setRules] = useState<AlertRule[]>(mockAlertRules);
  const [isCreating, setIsCreating] = useState(false);
  const [editingRule, setEditingRule] = useState<AlertRule | null>(null);
  const [newRule, setNewRule] = useState<Partial<AlertRule>>({
    name: '',
    description: '',
    type: 'threshold',
    priority: 'medium',
    isActive: true,
    conditions: [],
    actions: [],
    cooldownPeriod: 1,
    targetAudience: []
  });

  useEffect(() => {
    if (triggerCreate) {
      setIsCreating(true);
    }
  }, [triggerCreate]);

  const handleToggleRule = (ruleId: string, isActive: boolean) => {
    setRules(prev => 
      prev.map(rule => 
        rule.id === ruleId ? { ...rule, isActive } : rule
      )
    );
    onToggleRule?.(ruleId, isActive);
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
    onDeleteRule?.(ruleId);
  };

  const addCondition = () => {
    const newCondition: AlertCondition = {
      id: `cond_${Date.now()}`,
      field: 'churnScore',
      operator: 'greater_than',
      value: 0.8
    };
    setNewRule(prev => ({
      ...prev,
      conditions: [...(prev.conditions || []), newCondition]
    }));
  };

  const addAction = () => {
    const newAction: AlertAction = {
      id: `action_${Date.now()}`,
      type: 'notification',
      target: 'team',
      priority: 'medium'
    };
    setNewRule(prev => ({
      ...prev,
      actions: [...(prev.actions || []), newAction]
    }));
  };

  const handleCreateRule = () => {
    if (newRule.name && newRule.conditions && newRule.actions) {
      const ruleToCreate: AlertRule = {
        ...newRule,
        id: `rule_${Date.now()}`,
        createdBy: 'admin',
        createdDate: new Date().toISOString(),
        triggerCount: 0,
        targetAudience: newRule.targetAudience || []
      } as AlertRule;
      
      setRules(prev => [...prev, ruleToCreate]);
      onCreateRule?.(ruleToCreate);
      setIsCreating(false);
      setNewRule({
        name: '',
        description: '',
        type: 'threshold',
        priority: 'medium',
        isActive: true,
        conditions: [],
        actions: [],
        cooldownPeriod: 1,
        targetAudience: []
      });
      
      // Show success toast
      toastSuccess(
        'Alert Rule Created Successfully!',
        `Your rule "${newRule.name}" has been created and is now ${ruleToCreate.isActive ? 'active' : 'inactive'}.`
      );
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'threshold': return Target;
      case 'anomaly': return AlertTriangle;
      case 'event': return Zap;
      case 'schedule': return Clock;
      default: return AlertTriangle;
    }
  };

  const renderRuleCreator = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create Alert Rule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rule-name">Rule Name</Label>
            <Input
              id="rule-name"
              value={newRule.name}
              onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
              placeholder="Enter rule name"
            />
          </div>
          <div>
            <Label htmlFor="rule-type">Rule Type</Label>
            <Select value={newRule.type} onValueChange={(value) => setNewRule({ ...newRule, type: value as any })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="threshold">Threshold</SelectItem>
                <SelectItem value="anomaly">Anomaly</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="schedule">Schedule</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="rule-description">Description</Label>
          <Textarea
            id="rule-description"
            value={newRule.description}
            onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
            placeholder="Describe what this rule does"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="rule-priority">Priority</Label>
            <Select value={newRule.priority} onValueChange={(value) => setNewRule({ ...newRule, priority: value as any })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="cooldown-period">Cooldown (hours)</Label>
            <Input
              id="cooldown-period"
              type="number"
              value={newRule.cooldownPeriod}
              onChange={(e) => setNewRule({ ...newRule, cooldownPeriod: parseInt(e.target.value) })}
              min="1"
              max="168"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="rule-active"
              checked={newRule.isActive}
              onCheckedChange={(checked) => setNewRule({ ...newRule, isActive: checked })}
            />
            <Label htmlFor="rule-active">Active</Label>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <Label>Conditions</Label>
            <Button onClick={addCondition} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Condition
            </Button>
          </div>
          <div className="space-y-2">
            {newRule.conditions?.map((condition, index) => (
              <div key={condition.id} className="flex items-center gap-2 p-2 border rounded">
                <Select value={condition.field} onValueChange={(value) => {
                  const updatedConditions = [...(newRule.conditions || [])];
                  updatedConditions[index] = { ...condition, field: value };
                  setNewRule({ ...newRule, conditions: updatedConditions });
                }}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditionFields.map(field => (
                      <SelectItem key={field.value} value={field.value}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={condition.operator} onValueChange={(value) => {
                  const updatedConditions = [...(newRule.conditions || [])];
                  updatedConditions[index] = { ...condition, operator: value as any };
                  setNewRule({ ...newRule, conditions: updatedConditions });
                }}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {operators.map(op => (
                      <SelectItem key={op.value} value={op.value}>
                        {op.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={condition.value?.toString()}
                  onChange={(e) => {
                    const updatedConditions = [...(newRule.conditions || [])];
                    updatedConditions[index] = { ...condition, value: e.target.value };
                    setNewRule({ ...newRule, conditions: updatedConditions });
                  }}
                  className="w-32"
                  placeholder="Value"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const updatedConditions = newRule.conditions?.filter((_, i) => i !== index) || [];
                    setNewRule({ ...newRule, conditions: updatedConditions });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <Label>Actions</Label>
            <Button onClick={addAction} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Action
            </Button>
          </div>
          <div className="space-y-2">
            {newRule.actions?.map((action, index) => (
              <div key={action.id} className="flex items-center gap-2 p-2 border rounded">
                <Select value={action.type} onValueChange={(value) => {
                  const updatedActions = [...(newRule.actions || [])];
                  updatedActions[index] = { ...action, type: value as any };
                  setNewRule({ ...newRule, actions: updatedActions });
                }}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {actionTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          {React.createElement(type.icon, { className: "h-4 w-4" })}
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={action.target}
                  onChange={(e) => {
                    const updatedActions = [...(newRule.actions || [])];
                    updatedActions[index] = { ...action, target: e.target.value };
                    setNewRule({ ...newRule, actions: updatedActions });
                  }}
                  className="flex-1"
                  placeholder="Target (email, team, etc.)"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const updatedActions = newRule.actions?.filter((_, i) => i !== index) || [];
                    setNewRule({ ...newRule, actions: updatedActions });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleCreateRule}>
            Create Rule
          </Button>
          <Button variant="outline" onClick={() => setIsCreating(false)}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (isCreating) {
    return renderRuleCreator();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Alert Rules</h2>
          <p className="text-muted-foreground">Configure automated alerts and notifications</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Rule
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{rules.filter(r => r.isActive).length}</div>
                <div className="text-sm text-muted-foreground">Active Rules</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{rules.reduce((sum, r) => sum + r.triggerCount, 0)}</div>
                <div className="text-sm text-muted-foreground">Total Triggers</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{rules.filter(r => r.priority === 'critical' || r.priority === 'high').length}</div>
                <div className="text-sm text-muted-foreground">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => {
          const TypeIcon = getTypeIcon(rule.type);
          return (
            <Card key={rule.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{rule.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getPriorityColor(rule.priority)}>
                      {rule.priority}
                    </Badge>
                    <Badge variant={rule.isActive ? "default" : "secondary"}>
                      {rule.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{rule.triggerCount}</div>
                    <div className="text-sm text-muted-foreground">Triggers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{rule.conditions.length}</div>
                    <div className="text-sm text-muted-foreground">Conditions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{rule.actions.length}</div>
                    <div className="text-sm text-muted-foreground">Actions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{rule.cooldownPeriod}h</div>
                    <div className="text-sm text-muted-foreground">Cooldown</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {rule.lastTriggered ? `Last triggered: ${formatDate(rule.lastTriggered)}` : 'Never triggered'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleRule(rule.id, !rule.isActive)}
                    >
                      {rule.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteRule(rule.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}