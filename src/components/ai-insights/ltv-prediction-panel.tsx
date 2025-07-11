'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  Star,
  Activity,
  Clock,
  User,
  Crown
} from 'lucide-react';
import { AIInsights } from '@/types';
import { sampleCustomers } from '@/data/sample-data';
import { formatCurrency } from '@/utils/format';

interface LTVPredictionPanelProps {
  predictions: AIInsights['lifetimeValuePrediction'];
  compact?: boolean;
}

export function LTVPredictionPanel({ predictions, compact = false }: LTVPredictionPanelProps) {
  const highValuePredictions = predictions.filter(p => p.predictedValue > 50000);
  const mediumValuePredictions = predictions.filter(p => p.predictedValue > 10000 && p.predictedValue <= 50000);
  const lowValuePredictions = predictions.filter(p => p.predictedValue <= 10000);

  const getValueColor = (value: number) => {
    if (value > 50000) return 'text-green-600 bg-green-100';
    if (value > 10000) return 'text-blue-600 bg-blue-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getValueLevel = (value: number) => {
    if (value > 50000) return 'High Value';
    if (value > 10000) return 'Medium Value';
    return 'Standard Value';
  };

  const getCustomerInfo = (customerId: string) => {
    return sampleCustomers.find(c => c.id === customerId) || {
      firstName: 'Unknown',
      lastName: 'Customer',
      email: 'unknown@example.com',
      lifetimeValue: 0,
      segment: 'regular'
    };
  };


  if (compact) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            LTV Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{highValuePredictions.length}</div>
                <div className="text-sm text-muted-foreground">High Value</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{mediumValuePredictions.length}</div>
                <div className="text-sm text-muted-foreground">Medium Value</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">{lowValuePredictions.length}</div>
                <div className="text-sm text-muted-foreground">Standard Value</div>
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
                          Current: {formatCurrency(customer.lifetimeValue)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm text-green-600">
                        {formatCurrency(prediction.predictedValue)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {prediction.confidence.toFixed(0)}% confidence
                      </div>
                    </div>
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            LTV Prediction Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-4 bg-green-50 rounded-lg mb-2">
                <Crown className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{highValuePredictions.length}</div>
                <div className="text-sm text-muted-foreground">High Value ($50K+)</div>
              </div>
              <div className="text-xs text-muted-foreground">
                VIP treatment recommended
              </div>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-blue-50 rounded-lg mb-2">
                <Star className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{mediumValuePredictions.length}</div>
                <div className="text-sm text-muted-foreground">Medium Value ($10K-$50K)</div>
              </div>
              <div className="text-xs text-muted-foreground">
                Growth opportunities
              </div>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-gray-50 rounded-lg mb-2">
                <Activity className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-600">{lowValuePredictions.length}</div>
                <div className="text-sm text-muted-foreground">Standard Value (&lt;$10K)</div>
              </div>
              <div className="text-xs text-muted-foreground">
                Nurture potential
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5" />
              High Value Predictions
            </CardTitle>
            <Button size="sm" variant="outline">
              Create VIP Campaign
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {highValuePredictions.map((prediction, index) => {
              const customer = getCustomerInfo(prediction.customerId);
              const growthPotential = prediction.predictedValue - customer.lifetimeValue;
              const growthPercentage = ((growthPotential / customer.lifetimeValue) * 100);
              
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
                          Current Segment: {customer.segment}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getValueColor(prediction.predictedValue)}>
                        {getValueLevel(prediction.predictedValue)}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        {prediction.confidence.toFixed(0)}% confidence
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Confidence Level</span>
                      <span>{prediction.confidence.toFixed(1)}%</span>
                    </div>
                    <Progress value={prediction.confidence} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Current LTV</div>
                      <div className="font-medium">{formatCurrency(customer.lifetimeValue)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Predicted LTV</div>
                      <div className="font-medium text-green-600">{formatCurrency(prediction.predictedValue)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Growth Potential</div>
                      <div className="font-medium text-blue-600">
                        +{formatCurrency(growthPotential)} ({growthPercentage.toFixed(0)}%)
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-muted-foreground mb-2">Prediction Timeframe:</div>
                    <Badge variant="outline">{prediction.timeframe}</Badge>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-muted-foreground mb-2">AI Recommendations:</div>
                    <div className="text-sm bg-green-50 p-2 rounded-lg">
                      <strong>VIP Upgrade:</strong> Customer shows high growth potential. Consider VIP treatment, 
                      personalized offers, and dedicated account management to maximize lifetime value.
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Star className="h-4 w-4" />
                      Upgrade to VIP
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Target className="h-4 w-4" />
                      Create Offer
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            LTV Model Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">89.7%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$2.3M</div>
              <div className="text-sm text-muted-foreground">Avg Predicted LTV</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">87.2%</div>
              <div className="text-sm text-muted-foreground">Prediction Reliability</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">
              <strong>Model Features:</strong> Transaction history, betting patterns, demographics, engagement metrics • 
              <strong>Training Period:</strong> 24 months • 
              <strong>Last Updated:</strong> 4 hours ago
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}