'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  FlaskConical, 
  Play, 
  Pause, 
  Trophy, 
  Target,
  TrendingUp,
  Users,
  Mail,
  Calendar,
  ChevronRight,
  BarChart3,
  Settings
} from 'lucide-react';

interface ABTest {
  id: string;
  name: string;
  status: 'draft' | 'running' | 'completed' | 'paused';
  startDate: string;
  endDate: string;
  type: 'email' | 'sms' | 'push' | 'landing-page' | 'offer';
  variants: ABTestVariant[];
  metrics: ABTestMetrics;
  targetAudience: {
    segment: string;
    size: number;
    splitPercentage: number;
  };
  hypothesis: string;
  primaryMetric: string;
  secondaryMetrics: string[];
  confidence: number;
  statisticalSignificance: number;
  winner?: string;
}

interface ABTestVariant {
  id: string;
  name: string;
  description: string;
  content: {
    subject?: string;
    body?: string;
    ctaText?: string;
    offerAmount?: number;
    design?: string;
  };
  metrics: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    converted: number;
    revenue: number;
  };
  performance: {
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    conversionRate: number;
    revenuePerUser: number;
  };
}

interface ABTestMetrics {
  totalParticipants: number;
  duration: number;
  confidenceLevel: number;
  pValue: number;
  uplift: number;
  projectedRevenue: number;
}

const mockABTests: ABTest[] = [
  {
    id: 'ab_001',
    name: 'Welcome Email Subject Line Test',
    status: 'running',
    startDate: '2024-01-15T00:00:00.000Z',
    endDate: '2024-01-29T23:59:59.000Z',
    type: 'email',
    variants: [
      {
        id: 'variant_a',
        name: 'Control - Generic Welcome',
        description: 'Standard welcome message',
        content: {
          subject: 'Welcome to Predicta Casino!',
          body: 'Thank you for joining us. Get started with a 100% welcome bonus.',
          ctaText: 'Claim Bonus'
        },
        metrics: {
          sent: 5000,
          delivered: 4850,
          opened: 1455,
          clicked: 291,
          converted: 87,
          revenue: 12450
        },
        performance: {
          deliveryRate: 97.0,
          openRate: 30.0,
          clickRate: 20.0,
          conversionRate: 6.0,
          revenuePerUser: 143.10
        }
      },
      {
        id: 'variant_b',
        name: 'Personalized Welcome',
        description: 'Personalized welcome with name and location',
        content: {
          subject: 'Welcome to Predicta, [Name]! Your exclusive offer awaits',
          body: 'Hi [Name], welcome to Predicta! As a new member from [Location], you get an exclusive 120% welcome bonus.',
          ctaText: 'Get My Bonus'
        },
        metrics: {
          sent: 5000,
          delivered: 4875,
          opened: 1657,
          clicked: 365,
          converted: 119,
          revenue: 18230
        },
        performance: {
          deliveryRate: 97.5,
          openRate: 34.0,
          clickRate: 22.0,
          conversionRate: 7.2,
          revenuePerUser: 153.19
        }
      }
    ],
    metrics: {
      totalParticipants: 10000,
      duration: 14,
      confidenceLevel: 95,
      pValue: 0.023,
      uplift: 7.1,
      projectedRevenue: 34680
    },
    targetAudience: {
      segment: 'new-users',
      size: 10000,
      splitPercentage: 50
    },
    hypothesis: 'Personalized welcome emails with recipient name and location will increase open rates and conversions compared to generic welcome emails.',
    primaryMetric: 'conversion_rate',
    secondaryMetrics: ['open_rate', 'click_rate', 'revenue_per_user'],
    confidence: 95,
    statisticalSignificance: 97.7,
    winner: 'variant_b'
  },
  {
    id: 'ab_002',
    name: 'Bonus Offer Amount Test',
    status: 'completed',
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: '2024-01-14T23:59:59.000Z',
    type: 'offer',
    variants: [
      {
        id: 'variant_a',
        name: '100% Bonus',
        description: 'Standard 100% match bonus',
        content: {
          subject: 'Double Your Deposit - 100% Bonus Inside!',
          body: 'Get 100% match on your next deposit up to $500',
          ctaText: 'Claim 100% Bonus',
          offerAmount: 100
        },
        metrics: {
          sent: 7500,
          delivered: 7275,
          opened: 2037,
          clicked: 407,
          converted: 122,
          revenue: 18300
        },
        performance: {
          deliveryRate: 97.0,
          openRate: 28.0,
          clickRate: 20.0,
          conversionRate: 6.0,
          revenuePerUser: 150.00
        }
      },
      {
        id: 'variant_b',
        name: '150% Bonus',
        description: 'Higher 150% match bonus',
        content: {
          subject: 'EXCLUSIVE: 150% Bonus - Limited Time!',
          body: 'Get 150% match on your next deposit up to $750',
          ctaText: 'Claim 150% Bonus',
          offerAmount: 150
        },
        metrics: {
          sent: 7500,
          delivered: 7313,
          opened: 2341,
          clicked: 562,
          converted: 169,
          revenue: 30420
        },
        performance: {
          deliveryRate: 97.5,
          openRate: 32.0,
          clickRate: 24.0,
          conversionRate: 7.2,
          revenuePerUser: 180.12
        }
      }
    ],
    metrics: {
      totalParticipants: 15000,
      duration: 14,
      confidenceLevel: 95,
      pValue: 0.012,
      uplift: 20.1,
      projectedRevenue: 48720
    },
    targetAudience: {
      segment: 'active-users',
      size: 15000,
      splitPercentage: 50
    },
    hypothesis: 'Higher bonus percentages will increase user engagement and deposit amounts despite higher cost.',
    primaryMetric: 'revenue_per_user',
    secondaryMetrics: ['conversion_rate', 'click_rate'],
    confidence: 95,
    statisticalSignificance: 98.8,
    winner: 'variant_b'
  },
  {
    id: 'ab_003',
    name: 'SMS vs Email Retention',
    status: 'draft',
    startDate: '2024-02-01T00:00:00.000Z',
    endDate: '2024-02-15T23:59:59.000Z',
    type: 'sms',
    variants: [
      {
        id: 'variant_a',
        name: 'Email Retention',
        description: 'Email-based retention campaign',
        content: {
          subject: 'We miss you! Come back for exclusive offers',
          body: 'Your favorite games are waiting. Get 50% cashback on your next session.',
          ctaText: 'Play Now'
        },
        metrics: {
          sent: 0,
          delivered: 0,
          opened: 0,
          clicked: 0,
          converted: 0,
          revenue: 0
        },
        performance: {
          deliveryRate: 0,
          openRate: 0,
          clickRate: 0,
          conversionRate: 0,
          revenuePerUser: 0
        }
      },
      {
        id: 'variant_b',
        name: 'SMS Retention',
        description: 'SMS-based retention campaign',
        content: {
          subject: '',
          body: 'Miss the thrill? Get 50% cashback on your next game. Play now: [link]',
          ctaText: 'Play Now'
        },
        metrics: {
          sent: 0,
          delivered: 0,
          opened: 0,
          clicked: 0,
          converted: 0,
          revenue: 0
        },
        performance: {
          deliveryRate: 0,
          openRate: 0,
          clickRate: 0,
          conversionRate: 0,
          revenuePerUser: 0
        }
      }
    ],
    metrics: {
      totalParticipants: 8000,
      duration: 14,
      confidenceLevel: 95,
      pValue: 0,
      uplift: 0,
      projectedRevenue: 0
    },
    targetAudience: {
      segment: 'dormant-users',
      size: 8000,
      splitPercentage: 50
    },
    hypothesis: 'SMS messages will have higher open rates and immediate response compared to email for dormant user retention.',
    primaryMetric: 'reactivation_rate',
    secondaryMetrics: ['open_rate', 'click_rate', 'revenue_per_user'],
    confidence: 95,
    statisticalSignificance: 0
  }
];

export function ABTestingFramework() {
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newTest, setNewTest] = useState({
    name: '',
    type: 'email',
    hypothesis: '',
    primaryMetric: 'conversion_rate',
    audience: 'all',
    splitPercentage: 50,
    duration: 14
  });

  const runningTests = mockABTests.filter(test => test.status === 'running');
  const completedTests = mockABTests.filter(test => test.status === 'completed');
  const draftTests = mockABTests.filter(test => test.status === 'draft');

  const getStatusColor = (status: ABTest['status']) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWinnerBadge = (test: ABTest) => {
    if (!test.winner) return null;
    const winner = test.variants.find(v => v.id === test.winner);
    return (
      <Badge className="gap-1 bg-yellow-100 text-yellow-800">
        <Trophy className="h-3 w-3" />
        {winner?.name} Wins
      </Badge>
    );
  };

  const handleCreateTest = () => {
    
    setIsCreating(false);
    setNewTest({
      name: '',
      type: 'email',
      hypothesis: '',
      primaryMetric: 'conversion_rate',
      audience: 'all',
      splitPercentage: 50,
      duration: 14
    });
  };

  if (isCreating) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" />
            Create New A/B Test
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="test-name">Test Name</Label>
                <Input
                  id="test-name"
                  value={newTest.name}
                  onChange={(e) => setNewTest({...newTest, name: e.target.value})}
                  placeholder="Enter test name"
                />
              </div>
              <div>
                <Label htmlFor="test-type">Test Type</Label>
                <Select value={newTest.type} onValueChange={(value) => setNewTest({...newTest, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email Campaign</SelectItem>
                    <SelectItem value="sms">SMS Campaign</SelectItem>
                    <SelectItem value="push">Push Notification</SelectItem>
                    <SelectItem value="landing-page">Landing Page</SelectItem>
                    <SelectItem value="offer">Offer/Promotion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="hypothesis">Hypothesis</Label>
              <Textarea
                id="hypothesis"
                value={newTest.hypothesis}
                onChange={(e) => setNewTest({...newTest, hypothesis: e.target.value})}
                placeholder="What do you expect to happen and why?"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="primary-metric">Primary Metric</Label>
                <Select value={newTest.primaryMetric} onValueChange={(value) => setNewTest({...newTest, primaryMetric: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conversion_rate">Conversion Rate</SelectItem>
                    <SelectItem value="open_rate">Open Rate</SelectItem>
                    <SelectItem value="click_rate">Click Rate</SelectItem>
                    <SelectItem value="revenue_per_user">Revenue per User</SelectItem>
                    <SelectItem value="retention_rate">Retention Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="audience">Target Audience</Label>
                <Select value={newTest.audience} onValueChange={(value) => setNewTest({...newTest, audience: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="new-users">New Users</SelectItem>
                    <SelectItem value="active-users">Active Users</SelectItem>
                    <SelectItem value="high-value">High Value</SelectItem>
                    <SelectItem value="at-risk">At Risk</SelectItem>
                    <SelectItem value="dormant">Dormant Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Duration (days)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newTest.duration}
                  onChange={(e) => setNewTest({...newTest, duration: parseInt(e.target.value)})}
                  min="1"
                  max="90"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="split-percentage">Traffic Split (%)</Label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Control</span>
                <Input
                  id="split-percentage"
                  type="number"
                  value={newTest.splitPercentage}
                  onChange={(e) => setNewTest({...newTest, splitPercentage: parseInt(e.target.value)})}
                  min="10"
                  max="90"
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">% | Variant {100 - newTest.splitPercentage}%</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={handleCreateTest} className="gap-2">
                <FlaskConical className="h-4 w-4" />
                Create Test
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (selectedTest) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedTest(null)}>
              ← Back to Tests
            </Button>
            <div>
              <h2 className="text-xl font-semibold">{selectedTest.name}</h2>
              <p className="text-sm text-muted-foreground">{selectedTest.hypothesis}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(selectedTest.status)}>
              {selectedTest.status}
            </Badge>
            {getWinnerBadge(selectedTest)}
          </div>
        </div>

        {/* Test Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Test Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Participants</div>
                <div className="text-2xl font-bold">{selectedTest.metrics.totalParticipants.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Duration</div>
                <div className="text-2xl font-bold">{selectedTest.metrics.duration} days</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Confidence</div>
                <div className="text-2xl font-bold">{selectedTest.metrics.confidenceLevel}%</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Statistical Significance</div>
                <div className="text-2xl font-bold text-green-600">{selectedTest.statisticalSignificance}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Variant Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selectedTest.variants.map((variant, index) => (
            <Card key={variant.id} className={selectedTest.winner === variant.id ? 'ring-2 ring-yellow-500' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{variant.name}</CardTitle>
                  {selectedTest.winner === variant.id && (
                    <Badge className="gap-1 bg-yellow-100 text-yellow-800">
                      <Trophy className="h-3 w-3" />
                      Winner
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{variant.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Delivery Rate</span>
                      <span className="font-medium">{variant.performance.deliveryRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={variant.performance.deliveryRate} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Open Rate</span>
                      <span className="font-medium">{variant.performance.openRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={variant.performance.openRate} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Click Rate</span>
                      <span className="font-medium">{variant.performance.clickRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={variant.performance.clickRate} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Conversion Rate</span>
                      <span className="font-medium">{variant.performance.conversionRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={variant.performance.conversionRate} className="h-2" />
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm">Revenue per User</span>
                      <span className="font-medium">${variant.performance.revenuePerUser.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Revenue</span>
                      <span className="font-medium">${variant.metrics.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Test Results */}
        {selectedTest.status === 'completed' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Test Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+{selectedTest.metrics.uplift.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Performance Uplift</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{selectedTest.metrics.pValue.toFixed(3)}</div>
                  <div className="text-sm text-muted-foreground">p-value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">${selectedTest.metrics.projectedRevenue.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Projected Revenue Impact</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">A/B Testing Framework</h2>
          <p className="text-muted-foreground">Design, run, and analyze split tests to optimize your campaigns</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="gap-2">
          <FlaskConical className="h-4 w-4" />
          Create New Test
        </Button>
      </div>

      {/* Test Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{runningTests.length}</div>
                <div className="text-sm text-muted-foreground">Running Tests</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{completedTests.length}</div>
                <div className="text-sm text-muted-foreground">Completed Tests</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-gray-600" />
              <div>
                <div className="text-2xl font-bold">{draftTests.length}</div>
                <div className="text-sm text-muted-foreground">Draft Tests</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">+12.8%</div>
                <div className="text-sm text-muted-foreground">Avg Uplift</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Running Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Running Tests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {runningTests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FlaskConical className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">{test.name}</div>
                    <div className="text-sm text-muted-foreground">{test.targetAudience.size.toLocaleString()} participants</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{test.metrics.confidenceLevel}% confidence</div>
                    <div className="text-sm text-muted-foreground">{test.metrics.duration} days running</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedTest(test)}>
                    View Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Completed Tests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedTests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Trophy className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{test.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {test.targetAudience.size.toLocaleString()} participants • +{test.metrics.uplift}% uplift
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getWinnerBadge(test)}
                  <div className="text-right">
                    <div className="text-sm font-medium">${test.metrics.projectedRevenue.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">projected revenue</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedTest(test)}>
                    View Results
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}