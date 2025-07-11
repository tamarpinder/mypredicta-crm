'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail,
  Smartphone,
  Bell,
  Globe,
  Calendar,
  Filter
} from 'lucide-react';
import { JourneyAnalytics } from '@/types';
import { formatCurrency, formatNumber, formatPercentage } from '@/utils/format';

interface JourneyAnalyticsProps {
  analytics: JourneyAnalytics;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export function JourneyAnalyticsDashboard({ analytics, dateRange }: JourneyAnalyticsProps) {
  const [selectedMetric, setSelectedMetric] = useState('conversionRate');
  const [selectedChannel, setSelectedChannel] = useState('all');

  const channelIcons = {
    email: Mail,
    sms: Smartphone,
    push: Bell,
    web: Globe,
    app: Smartphone,
    phone: Smartphone,
    chat: Mail
  };

  const getChannelIcon = (channel: string) => {
    const Icon = channelIcons[channel as keyof typeof channelIcons] || Globe;
    return <Icon className="h-4 w-4" />;
  };

  const funnelData = analytics.stageAnalytics.map((stage, index) => ({
    name: stage.stageName,
    value: stage.entrances,
    fill: COLORS[index % COLORS.length]
  }));

  const conversionData = analytics.stageAnalytics.map((stage) => ({
    name: stage.stageName,
    conversionRate: stage.conversionRate,
    dropoffRate: stage.dropoffRate,
    averageTime: stage.averageTime
  }));

  const channelData = analytics.channelPerformance.map((channel) => ({
    name: channel.channel,
    interactions: channel.interactions,
    conversionRate: channel.conversionRate,
    engagementRate: channel.engagementRate,
    revenue: channel.revenue
  }));

  const cohortData = analytics.cohortAnalysis.map((cohort) => ({
    name: cohort.cohort,
    completionRate: cohort.completionRate,
    averageTime: cohort.averageTime,
    revenue: cohort.revenue,
    customers: cohort.customers
  }));

  const renderOverviewMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <div>
              <div className="text-2xl font-bold">{formatNumber(analytics.overview.totalCustomers)}</div>
              <div className="text-sm text-muted-foreground">Total Customers</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <div>
              <div className="text-2xl font-bold">{formatNumber(analytics.overview.completedJourneys)}</div>
              <div className="text-sm text-muted-foreground">Completed Journeys</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-purple-600" />
            <div>
              <div className="text-2xl font-bold">{formatPercentage(analytics.overview.conversionRate)}</div>
              <div className="text-sm text-muted-foreground">Conversion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-600" />
            <div>
              <div className="text-2xl font-bold">{analytics.overview.averageCompletionTime.toFixed(1)}d</div>
              <div className="text-sm text-muted-foreground">Avg Completion Time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStageAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Stage Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}${name === 'averageTime' ? ' days' : '%'}`,
                    name === 'conversionRate' ? 'Conversion Rate' : 
                    name === 'dropoffRate' ? 'Drop-off Rate' : 'Average Time'
                  ]}
                />
                <Bar dataKey="conversionRate" fill="#10b981" name="Conversion Rate" />
                <Bar dataKey="dropoffRate" fill="#ef4444" name="Drop-off Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stage Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.stageAnalytics.map((stage, index) => (
              <div key={stage.stageId} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  </div>
                  <div>
                    <div className="font-semibold">{stage.stageName}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatNumber(stage.entrances)} entrances → {formatNumber(stage.completions)} completions
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">
                      {formatPercentage(stage.conversionRate)}
                    </div>
                    <div className="text-xs text-muted-foreground">Conversion</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-blue-600">
                      {stage.averageTime.toFixed(1)}d
                    </div>
                    <div className="text-xs text-muted-foreground">Avg Time</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-red-600">
                      {formatPercentage(stage.dropoffRate)}
                    </div>
                    <div className="text-xs text-muted-foreground">Drop-off</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderChannelAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Channel Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? formatCurrency(value) : 
                    name === 'interactions' ? formatNumber(value) : 
                    `${value}%`,
                    name === 'interactions' ? 'Interactions' :
                    name === 'conversionRate' ? 'Conversion Rate' :
                    name === 'engagementRate' ? 'Engagement Rate' : 'Revenue'
                  ]}
                />
                <Bar dataKey="conversionRate" fill="#3b82f6" name="Conversion Rate" />
                <Bar dataKey="engagementRate" fill="#10b981" name="Engagement Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Channel Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="revenue"
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.channelPerformance.map((channel, index) => (
                <div key={channel.channel} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      {getChannelIcon(channel.channel)}
                    </div>
                    <div>
                      <div className="font-semibold capitalize">{channel.channel}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatNumber(channel.interactions)} interactions
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">
                      {formatPercentage(channel.conversionRate)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatCurrency(channel.revenue)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCohortAnalysis = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cohort Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cohortData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? formatCurrency(value) : 
                    name === 'customers' ? formatNumber(value) : 
                    name === 'averageTime' ? `${value} days` : 
                    `${value}%`,
                    name === 'completionRate' ? 'Completion Rate' :
                    name === 'averageTime' ? 'Average Time' :
                    name === 'revenue' ? 'Revenue' : 'Customers'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="completionRate" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Completion Rate"
                />
                <Line 
                  type="monotone" 
                  dataKey="averageTime" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Average Time"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cohort Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.cohortAnalysis.map((cohort, index) => (
              <div key={cohort.cohort} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold">{cohort.cohort}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatNumber(cohort.customers)} customers
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-right">
                  <div>
                    <div className="text-sm font-semibold text-green-600">
                      {formatPercentage(cohort.completionRate)}
                    </div>
                    <div className="text-xs text-muted-foreground">Completion</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-blue-600">
                      {cohort.averageTime.toFixed(1)}d
                    </div>
                    <div className="text-xs text-muted-foreground">Avg Time</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-purple-600">
                      {formatCurrency(cohort.revenue)}
                    </div>
                    <div className="text-xs text-muted-foreground">Revenue</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Journey Analytics</h2>
          <p className="text-muted-foreground">
            Analyze customer journey performance and identify optimization opportunities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conversionRate">Conversion Rate</SelectItem>
              <SelectItem value="dropoffRate">Drop-off Rate</SelectItem>
              <SelectItem value="averageTime">Average Time</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      {renderOverviewMetrics()}

      {/* Journey Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Active Journeys</span>
              </div>
              <div className="text-2xl font-bold">{formatNumber(analytics.overview.activeJourneys)}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">Abandoned Journeys</span>
              </div>
              <div className="text-2xl font-bold">{formatNumber(analytics.overview.abandonedJourneys)}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Abandonment Rate</span>
              </div>
              <div className="text-2xl font-bold">
                {((analytics.overview.abandonedJourneys / analytics.overview.totalCustomers) * 100).toFixed(1)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="stages" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stages">Stage Analytics</TabsTrigger>
          <TabsTrigger value="channels">Channel Performance</TabsTrigger>
          <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stages" className="space-y-4">
          {renderStageAnalytics()}
        </TabsContent>
        
        <TabsContent value="channels" className="space-y-4">
          {renderChannelAnalytics()}
        </TabsContent>
        
        <TabsContent value="cohorts" className="space-y-4">
          {renderCohortAnalysis()}
        </TabsContent>
      </Tabs>
    </div>
  );
}