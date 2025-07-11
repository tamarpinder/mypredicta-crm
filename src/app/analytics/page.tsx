'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  ComposedChart,
  Area,
  AreaChart,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Calendar,
  Download,
  Filter,
  Eye,
  Target,
  Gamepad2,
  Star,
  AlertTriangle,
  Activity,
  MapPin,
  Clock,
  BarChart3
} from 'lucide-react';
import { formatCurrency, formatNumber, formatPercentage } from '@/utils/format';

const revenueData = [
  { month: 'Jan', revenue: 4200000, deposits: 3800000, withdrawals: 2100000, newCustomers: 1250 },
  { month: 'Feb', revenue: 4500000, deposits: 4100000, withdrawals: 2300000, newCustomers: 1380 },
  { month: 'Mar', revenue: 4800000, deposits: 4400000, withdrawals: 2500000, newCustomers: 1520 },
  { month: 'Apr', revenue: 5100000, deposits: 4700000, withdrawals: 2700000, newCustomers: 1680 },
  { month: 'May', revenue: 5400000, deposits: 5000000, withdrawals: 2900000, newCustomers: 1750 },
  { month: 'Jun', revenue: 5700000, deposits: 5300000, withdrawals: 3100000, newCustomers: 1820 }
];

const gameTypeData = [
  { name: 'Sports Betting', value: 18500000, percentage: 35.2, color: '#0EA5E9' },
  { name: 'Casino Games', value: 15200000, percentage: 28.9, color: '#8B5CF6' },
  { name: 'Live Games', value: 12800000, percentage: 24.3, color: '#EF4444' },
  { name: 'Lottery', value: 6100000, percentage: 11.6, color: '#F59E0B' }
];

const customerSegmentData = [
  { segment: 'High Value', customers: 1250, revenue: 22500000, avgLTV: 18000, color: '#10B981' },
  { segment: 'Regular', customers: 8900, revenue: 18200000, avgLTV: 2045, color: '#3B82F6' },
  { segment: 'At Risk', customers: 2100, revenue: 8900000, avgLTV: 4238, color: '#F59E0B' },
  { segment: 'Churned', customers: 890, revenue: 3100000, avgLTV: 3483, color: '#EF4444' }
];

const geographicData = [
  { country: 'United States', customers: 4200, revenue: 18500000, percentage: 35.2 },
  { country: 'Canada', customers: 2800, revenue: 12300000, percentage: 23.4 },
  { country: 'United Kingdom', customers: 2100, revenue: 9800000, percentage: 18.6 },
  { country: 'Australia', customers: 1500, revenue: 7200000, percentage: 13.7 },
  { country: 'Others', customers: 2540, revenue: 4800000, percentage: 9.1 }
];

const customerRetentionData = [
  { month: 'Jan', newCustomers: 1250, retained: 11200, churnRate: 5.2 },
  { month: 'Feb', newCustomers: 1380, retained: 11800, churnRate: 4.8 },
  { month: 'Mar', newCustomers: 1520, retained: 12500, churnRate: 4.5 },
  { month: 'Apr', newCustomers: 1680, retained: 13200, churnRate: 4.2 },
  { month: 'May', newCustomers: 1750, retained: 13800, churnRate: 3.9 },
  { month: 'Jun', newCustomers: 1820, retained: 14500, churnRate: 3.6 }
];

const campaignPerformanceData = [
  { name: 'Email Campaigns', sent: 125000, opened: 87500, clicked: 31250, converted: 8750, roi: 245 },
  { name: 'SMS Campaigns', sent: 85000, opened: 76500, clicked: 25500, converted: 6800, roi: 189 },
  { name: 'Push Notifications', sent: 95000, opened: 71250, clicked: 23750, converted: 5700, roi: 134 },
  { name: 'Social Media', sent: 45000, opened: 36000, clicked: 12600, converted: 3150, roi: 98 }
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6M');
  const [selectedMetric, setSelectedMetric] = useState('revenue');


  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm">
                  {item.name}: {item.name.includes('Revenue') || item.name.includes('Deposits') || item.name.includes('Withdrawals') 
                    ? formatCurrency(item.value) 
                    : formatNumber(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const actions = (
    <div className="flex items-center gap-3">
      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1M">Last Month</SelectItem>
          <SelectItem value="3M">Last 3 Months</SelectItem>
          <SelectItem value="6M">Last 6 Months</SelectItem>
          <SelectItem value="1Y">Last Year</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" className="gap-2">
        <Download className="h-4 w-4" />
        Export Report
      </Button>
    </div>
  );

  return (
    <DashboardLayout 
      title="Analytics Dashboard" 
      description="Comprehensive business intelligence and performance analytics"
      actions={actions}
    >
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(52600000)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+12.3%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Active Customers
                </p>
                <p className="text-2xl font-bold">
                  {formatNumber(25847)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+8.7%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Average LTV
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(2847)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+5.2%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Churn Rate
                </p>
                <p className="text-2xl font-bold">
                  3.6%
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">-1.2%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trends */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Revenue Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
              <Line type="monotone" dataKey="newCustomers" stroke="#10B981" name="New Customers" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Game Type Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5" />
              Game Type Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gameTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                >
                  {gameTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Segments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerSegmentData.map((segment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: segment.color }}
                    ></div>
                    <div>
                      <div className="font-medium">{segment.segment}</div>
                      <div className="text-sm text-muted-foreground">
                        {segment.customers.toLocaleString()} customers
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(segment.revenue)}</div>
                    <div className="text-sm text-muted-foreground">
                      Avg LTV: {formatCurrency(segment.avgLTV)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Distribution */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Geographic Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {geographicData.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">{country.country.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <div>
                      <div className="font-medium">{country.country}</div>
                      <div className="text-sm text-muted-foreground">
                        {country.customers.toLocaleString()} customers
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(country.revenue)}</div>
                    <div className="text-sm text-muted-foreground">{country.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={geographicData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="country" type="category" width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Retention */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Customer Retention Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={customerRetentionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="newCustomers" fill="#10B981" name="New Customers" />
              <Area dataKey="retained" fill="#3B82F6" name="Retained Customers" />
              <Line type="monotone" dataKey="churnRate" stroke="#EF4444" name="Churn Rate %" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Campaign Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Campaign Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaignPerformanceData.map((campaign, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{campaign.name}</h4>
                    <Badge variant={campaign.roi > 150 ? "default" : "secondary"}>
                      {campaign.roi}% ROI
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Sent: {formatNumber(campaign.sent)}</span>
                    <span>Opened: {formatNumber(campaign.opened)}</span>
                    <span>Clicked: {formatNumber(campaign.clicked)}</span>
                    <span>Converted: {formatNumber(campaign.converted)}</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Open Rate</div>
                    <div className="flex items-center gap-2">
                      <Progress value={(campaign.opened / campaign.sent) * 100} className="flex-1 h-2" />
                      <span className="text-sm font-medium">
                        {((campaign.opened / campaign.sent) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Click Rate</div>
                    <div className="flex items-center gap-2">
                      <Progress value={(campaign.clicked / campaign.opened) * 100} className="flex-1 h-2" />
                      <span className="text-sm font-medium">
                        {((campaign.clicked / campaign.opened) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Conversion Rate</div>
                    <div className="flex items-center gap-2">
                      <Progress value={(campaign.converted / campaign.sent) * 100} className="flex-1 h-2" />
                      <span className="text-sm font-medium">
                        {((campaign.converted / campaign.sent) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">ROI</div>
                    <div className="flex items-center gap-2">
                      <Progress value={Math.min(campaign.roi, 300)} className="flex-1 h-2" />
                      <span className="text-sm font-medium text-green-600">
                        {campaign.roi}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}