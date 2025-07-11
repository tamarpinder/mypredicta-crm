'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  TrendingDown, 
  Mail, 
  Phone, 
  MessageSquare, 
  User,
  Target,
  Activity,
  Clock
} from 'lucide-react';
import { AIInsights } from '@/types';
import { sampleCustomers } from '@/data/sample-data';

interface ChurnPredictionPanelProps {
  predictions: AIInsights['churnPrediction'];
  compact?: boolean;
}

export function ChurnPredictionPanel({ predictions, compact = false }: ChurnPredictionPanelProps) {
  const highRiskCustomers = predictions.filter(p => p.riskScore > 0.7);
  const mediumRiskCustomers = predictions.filter(p => p.riskScore > 0.4 && p.riskScore <= 0.7);
  const lowRiskCustomers = predictions.filter(p => p.riskScore <= 0.4);

  const getRiskColor = (score: number) => {
    if (score > 0.7) return 'text-red-600 bg-red-100';
    if (score > 0.4) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  const getRiskLevel = (score: number) => {
    if (score > 0.7) return 'High Risk';
    if (score > 0.4) return 'Medium Risk';
    return 'Low Risk';
  };

  const getCustomerInfo = (customerId: string) => {
    return sampleCustomers.find(c => c.id === customerId) || {
      firstName: 'Unknown',
      lastName: 'Customer',
      email: 'unknown@example.com',
      lifetimeValue: 0
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  if (compact) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Churn Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-600">{highRiskCustomers.length}</div>
                <div className="text-sm text-muted-foreground">High Risk</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{mediumRiskCustomers.length}</div>
                <div className="text-sm text-muted-foreground">Medium Risk</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{lowRiskCustomers.length}</div>
                <div className="text-sm text-muted-foreground">Low Risk</div>
              </div>
            </div>
            
            <div className="space-y-3">
              {predictions.slice(0, 5).map((prediction, index) => {
                const customer = getCustomerInfo(prediction.customerId);
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">
                          {customer.firstName} {customer.lastName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatCurrency(customer.lifetimeValue)} LTV
                        </div>
                      </div>
                    </div>
                    <Badge className={getRiskColor(prediction.riskScore)}>
                      {(prediction.riskScore * 100).toFixed(0)}%
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Risk Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Risk Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-4 bg-red-50 rounded-lg mb-2">
                <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">{highRiskCustomers.length}</div>
                <div className="text-sm text-muted-foreground">High Risk (70%+)</div>
              </div>
              <div className="text-xs text-muted-foreground">
                Immediate action required
              </div>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-orange-50 rounded-lg mb-2">
                <Activity className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">{mediumRiskCustomers.length}</div>
                <div className="text-sm text-muted-foreground">Medium Risk (40-70%)</div>
              </div>
              <div className="text-xs text-muted-foreground">
                Monitor closely
              </div>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-green-50 rounded-lg mb-2">
                <TrendingDown className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{lowRiskCustomers.length}</div>
                <div className="text-sm text-muted-foreground">Low Risk (0-40%)</div>
              </div>
              <div className="text-xs text-muted-foreground">
                Stable customers
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* High Risk Customers */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              High Risk Customers
            </CardTitle>
            <Button size="sm" variant="outline">
              Create Retention Campaign
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {highRiskCustomers.map((prediction, index) => {
              const customer = getCustomerInfo(prediction.customerId);
              return (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {customer.firstName} {customer.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {customer.email}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getRiskColor(prediction.riskScore)}>
                        {getRiskLevel(prediction.riskScore)}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        {(prediction.riskScore * 100).toFixed(1)}% risk
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Risk Score</span>
                      <span>{(prediction.riskScore * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={prediction.riskScore * 100} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Lifetime Value</div>
                      <div className="font-medium">{formatCurrency(customer.lifetimeValue)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Risk Factors</div>
                      <div className="font-medium">{prediction.factors.length} identified</div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-muted-foreground mb-2">Risk Factors:</div>
                    <div className="flex flex-wrap gap-1">
                      {prediction.factors.map((factor, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-muted-foreground mb-2">AI Recommendation:</div>
                    <div className="text-sm bg-blue-50 p-2 rounded-lg">
                      {prediction.recommendation}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Mail className="h-4 w-4" />
                      Email
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Phone className="h-4 w-4" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <MessageSquare className="h-4 w-4" />
                      SMS
                    </Button>
                    <Button size="sm" className="gap-1">
                      <User className="h-4 w-4" />
                      View Profile
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Model Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">94.2%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">91.7%</div>
              <div className="text-sm text-muted-foreground">Precision</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">89.3%</div>
              <div className="text-sm text-muted-foreground">Recall</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">
              <strong>Last Updated:</strong> 2 hours ago • 
              <strong>Training Data:</strong> 24,847 customers • 
              <strong>Next Update:</strong> Tomorrow 3:00 AM
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}