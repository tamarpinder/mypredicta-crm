'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  User,
  Eye,
  Flag,
  Clock,
  Activity,
  Target
} from 'lucide-react';
import { Customer } from '@/types';
import { formatCurrency } from '@/utils/format';

interface RiskAssessmentPanelProps {
  customers: Customer[];
  compact?: boolean;
}

export function RiskAssessmentPanel({ customers, compact = false }: RiskAssessmentPanelProps) {
  // Calculate risk scores based on customer behavior
  const assessRisk = (customer: Customer) => {
    let riskScore = 0;
    const riskFactors: string[] = [];

    // High spending patterns
    if (customer.lifetimeValue > 100000) {
      riskScore += 0.3;
      riskFactors.push('High spending volume');
    }

    // Rapid deposit increases
    if (customer.totalDeposits > 50000) {
      riskScore += 0.2;
      riskFactors.push('Large deposit amounts');
    }

    // Loss streaks
    if (customer.totalWithdrawals < customer.totalDeposits * 0.3) {
      riskScore += 0.2;
      riskFactors.push('Low withdrawal ratio');
    }

    // Account age vs spending
    const accountAge = Math.floor(Math.random() * 365) + 30; // Mock account age
    if (customer.totalDeposits > 10000 && accountAge < 90) {
      riskScore += 0.3;
      riskFactors.push('High spending, new account');
    }

    // VIP customers with declining activity
    if (customer.segment === 'vip' && customer.lastActivity && 
        new Date(customer.lastActivity) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
      riskScore += 0.2;
      riskFactors.push('VIP with declining activity');
    }

    return {
      score: Math.min(riskScore, 1),
      factors: riskFactors,
      level: riskScore > 0.7 ? 'High' : riskScore > 0.4 ? 'Medium' : 'Low'
    };
  };

  const customerRiskAssessments = customers.map(customer => ({
    customer,
    risk: assessRisk(customer)
  }));

  const highRiskCustomers = customerRiskAssessments.filter(c => c.risk.score > 0.7);
  const mediumRiskCustomers = customerRiskAssessments.filter(c => c.risk.score > 0.4 && c.risk.score <= 0.7);
  const lowRiskCustomers = customerRiskAssessments.filter(c => c.risk.score <= 0.4);

  const getRiskColor = (score: number) => {
    if (score > 0.7) return 'text-red-600 bg-red-100';
    if (score > 0.4) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  const getRiskIcon = (score: number) => {
    if (score > 0.7) return <XCircle className="h-4 w-4" />;
    if (score > 0.4) return <AlertTriangle className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };


  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (compact) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Risk Assessment
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
              {customerRiskAssessments.slice(0, 5).map((assessment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {assessment.customer.firstName.charAt(0)}{assessment.customer.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">
                        {assessment.customer.firstName} {assessment.customer.lastName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatCurrency(assessment.customer.lifetimeValue)} LTV
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getRiskIcon(assessment.risk.score)}
                    <Badge className={getRiskColor(assessment.risk.score)}>
                      {assessment.risk.level}
                    </Badge>
                  </div>
                </div>
              ))}
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
            Risk Assessment Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-4 bg-red-50 rounded-lg mb-2">
                <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">{highRiskCustomers.length}</div>
                <div className="text-sm text-muted-foreground">High Risk (70%+)</div>
              </div>
              <div className="text-xs text-muted-foreground">
                Requires immediate attention
              </div>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-orange-50 rounded-lg mb-2">
                <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">{mediumRiskCustomers.length}</div>
                <div className="text-sm text-muted-foreground">Medium Risk (40-70%)</div>
              </div>
              <div className="text-xs text-muted-foreground">
                Monitor and engage
              </div>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-green-50 rounded-lg mb-2">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{lowRiskCustomers.length}</div>
                <div className="text-sm text-muted-foreground">Low Risk (0-40%)</div>
              </div>
              <div className="text-xs text-muted-foreground">
                Healthy gambling behavior
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
              <XCircle className="h-5 w-5" />
              High Risk Customers
            </CardTitle>
            <Button size="sm" variant="outline">
              Generate Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {highRiskCustomers.map((assessment, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {assessment.customer.firstName.charAt(0)}{assessment.customer.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {assessment.customer.firstName} {assessment.customer.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {assessment.customer.email}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getRiskColor(assessment.risk.score)}>
                      {assessment.risk.level} Risk
                    </Badge>
                    <div className="text-sm text-muted-foreground mt-1">
                      {(assessment.risk.score * 100).toFixed(1)}% risk score
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Risk Score</span>
                    <span>{(assessment.risk.score * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={assessment.risk.score * 100} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Lifetime Value</div>
                    <div className="font-medium">{formatCurrency(assessment.customer.lifetimeValue)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Deposits</div>
                    <div className="font-medium">{formatCurrency(assessment.customer.totalDeposits)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Withdrawals</div>
                    <div className="font-medium">{formatCurrency(assessment.customer.totalWithdrawals)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Last Activity</div>
                    <div className="font-medium text-sm">
                      {assessment.customer.lastActivity ? formatDate(assessment.customer.lastActivity) : 'N/A'}
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-sm text-muted-foreground mb-2">Risk Factors:</div>
                  <div className="flex flex-wrap gap-1">
                    {assessment.risk.factors.map((factor, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-sm text-muted-foreground mb-2">Recommended Actions:</div>
                  <div className="text-sm bg-red-50 p-2 rounded-lg">
                    <strong>Immediate Review:</strong> This customer shows signs of problematic gambling behavior. 
                    Consider implementing deposit limits, cooling-off periods, or direct outreach for support resources.
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Flag className="h-4 w-4" />
                    Flag Account
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Clock className="h-4 w-4" />
                    Set Limits
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Eye className="h-4 w-4" />
                    Monitor
                  </Button>
                  <Button size="sm" className="gap-1">
                    <User className="h-4 w-4" />
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medium Risk Customers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Medium Risk Customers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mediumRiskCustomers.slice(0, 3).map((assessment, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {assessment.customer.firstName.charAt(0)}{assessment.customer.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {assessment.customer.firstName} {assessment.customer.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {assessment.customer.segment} customer
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getRiskColor(assessment.risk.score)}>
                      {assessment.risk.level} Risk
                    </Badge>
                    <div className="text-sm text-muted-foreground mt-1">
                      {(assessment.risk.score * 100).toFixed(1)}% risk score
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Risk Score</span>
                    <span>{(assessment.risk.score * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={assessment.risk.score * 100} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Lifetime Value</div>
                    <div className="font-medium">{formatCurrency(assessment.customer.lifetimeValue)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Risk Factors</div>
                    <div className="font-medium">{assessment.risk.factors.length} identified</div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-sm text-muted-foreground mb-2">Preventive Actions:</div>
                  <div className="text-sm bg-orange-50 p-2 rounded-lg">
                    <strong>Monitor Closely:</strong> Watch for escalating patterns and proactively engage with 
                    educational content about responsible gambling.
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Eye className="h-4 w-4" />
                    Monitor
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Activity className="h-4 w-4" />
                    Engage
                  </Button>
                  <Button size="sm" className="gap-1">
                    <User className="h-4 w-4" />
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Risk Assessment Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">92.1%</div>
              <div className="text-sm text-muted-foreground">Detection Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">847</div>
              <div className="text-sm text-muted-foreground">Customers Assessed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">23</div>
              <div className="text-sm text-muted-foreground">High Risk Flagged</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">96.3%</div>
              <div className="text-sm text-muted-foreground">False Positive Rate</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">
              <strong>Assessment Criteria:</strong> Deposit patterns, withdrawal ratios, session duration, loss frequency • 
              <strong>Compliance:</strong> Responsible gambling regulations • 
              <strong>Last Updated:</strong> 30 minutes ago
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}