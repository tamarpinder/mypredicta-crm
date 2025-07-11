'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PremiumCard, PremiumCardContent, PremiumCardHeader, PremiumCardTitle } from '@/components/ui/premium-card';
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
  Line,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Area,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Download,
  Gamepad2,
  AlertTriangle,
  Activity,
  MapPin,
  Target,
  Trophy
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/utils/format';

const revenueData = [
  { month: 'Jan', revenue: 18200000, deposits: 28500000, withdrawals: 15800000, newCustomers: 2150 },
  { month: 'Feb', revenue: 19500000, deposits: 31200000, withdrawals: 16900000, newCustomers: 2280 },
  { month: 'Mar', revenue: 20800000, deposits: 33800000, withdrawals: 18200000, newCustomers: 2420 },
  { month: 'Apr', revenue: 21100000, deposits: 35400000, withdrawals: 19100000, newCustomers: 2580 },
  { month: 'May', revenue: 22400000, deposits: 37800000, withdrawals: 20300000, newCustomers: 2650 },
  { month: 'Jun', revenue: 23700000, deposits: 39200000, withdrawals: 21400000, newCustomers: 2720 }
];

const gameTypeData = [
  { name: 'Sports Betting', value: 68500000, percentage: 30.2, color: 'var(--color-sports)' },
  { name: 'Casino Games', value: 58200000, percentage: 25.7, color: 'var(--color-casino)' },
  { name: 'Island Luck Lottery', value: 52100000, percentage: 23.0, color: 'var(--color-lottery)' },
  { name: 'Live Games', value: 48200000, percentage: 21.1, color: 'var(--color-live-games)' }
];

const customerSegmentData = [
  { segment: 'High Value', customers: 2850, revenue: 87500000, avgLTV: 30700, color: 'var(--color-high-value)' },
  { segment: 'Regular', customers: 15900, revenue: 68200000, avgLTV: 4289, color: 'var(--color-predicta-cyan)' },
  { segment: 'At Risk', customers: 4100, revenue: 28900000, avgLTV: 7049, color: 'var(--color-at-risk)' },
  { segment: 'Churned', customers: 2150, revenue: 12400000, avgLTV: 5767, color: 'var(--color-predicta-neutral)' }
];

const geographicData = [
  { country: 'Nassau', customers: 12800, revenue: 48500000, percentage: 42.1 },
  { country: 'Paradise Island', customers: 8200, revenue: 35200000, percentage: 28.9 },
  { country: 'Freeport', customers: 5400, revenue: 18800000, percentage: 16.8 },
  { country: 'Cable Beach', customers: 2100, revenue: 8400000, percentage: 7.2 },
  { country: 'Other Islands', customers: 1850, revenue: 6100000, percentage: 5.0 }
];

const customerRetentionData = [
  { month: 'Jan', newCustomers: 2150, retained: 22200, churnRate: 5.2 },
  { month: 'Feb', newCustomers: 2280, retained: 22800, churnRate: 4.8 },
  { month: 'Mar', newCustomers: 2420, retained: 23500, churnRate: 4.5 },
  { month: 'Apr', newCustomers: 2580, retained: 24200, churnRate: 4.2 },
  { month: 'May', newCustomers: 2650, retained: 24800, churnRate: 3.9 },
  { month: 'Jun', newCustomers: 2720, retained: 25500, churnRate: 3.6 }
];

const campaignPerformanceData = [
  { name: 'Email Campaigns', sent: 325000, opened: 227500, clicked: 81250, converted: 22750, roi: 285 },
  { name: 'SMS Campaigns', sent: 185000, opened: 166500, clicked: 55500, converted: 14800, roi: 225 },
  { name: 'Push Notifications', sent: 295000, opened: 201250, clicked: 63750, converted: 15700, roi: 164 },
  { name: 'Social Media', sent: 145000, opened: 116000, clicked: 40600, converted: 10150, roi: 128 }
];

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

// Import lottery data
import { lotteryStats } from '@/data/lottery-data';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6M');

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((item: TooltipPayload, index: number) => (
              <div key={`tooltip-${item.name}-${item.dataKey || index}`} className="flex items-center gap-2">
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
        <SelectTrigger className="w-32 text-white border-white/30 hover:bg-white/10">
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
        <PremiumCard variant="stats" className="hover:scale-105 transition-transform duration-300">
          <PremiumCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-[var(--color-predicta-navy)]">
                  {formatCurrency(125000000)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[var(--color-profit)]" />
                  <span className="text-xs text-[var(--color-profit)]">+12.3%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[var(--color-profit)]/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-predicta-gold)]/10 to-transparent"></div>
                <DollarSign className="h-6 w-6 text-[var(--color-profit)] relative z-10" />
              </div>
            </div>
          </PremiumCardContent>
        </PremiumCard>

        <PremiumCard variant="stats" className="hover:scale-105 transition-transform duration-300">
          <PremiumCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Active Customers
                </p>
                <p className="text-2xl font-bold text-[var(--color-predicta-navy)]">
                  {formatNumber(25000)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[var(--color-profit)]" />
                  <span className="text-xs text-[var(--color-profit)]">+8.7%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[var(--color-predicta-cyan)]/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-predicta-gold)]/10 to-transparent"></div>
                <Users className="h-6 w-6 text-[var(--color-predicta-cyan)] relative z-10" />
              </div>
            </div>
          </PremiumCardContent>
        </PremiumCard>

        <PremiumCard variant="stats" className="hover:scale-105 transition-transform duration-300">
          <PremiumCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Average LTV
                </p>
                <p className="text-2xl font-bold text-[var(--color-predicta-navy)]">
                  {formatCurrency(5000)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-[var(--color-profit)]" />
                  <span className="text-xs text-[var(--color-profit)]">+5.2%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[var(--color-vip)]/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-predicta-gold)]/10 to-transparent"></div>
                <Target className="h-6 w-6 text-[var(--color-vip)] relative z-10" />
              </div>
            </div>
          </PremiumCardContent>
        </PremiumCard>

        <PremiumCard variant="stats" className="hover:scale-105 transition-transform duration-300">
          <PremiumCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Churn Rate
                </p>
                <p className="text-2xl font-bold text-[var(--color-predicta-navy)]">
                  6.8%
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-[var(--color-profit)]" />
                  <span className="text-xs text-[var(--color-profit)]">-1.2%</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[var(--color-at-risk)]/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-predicta-gold)]/10 to-transparent"></div>
                <AlertTriangle className="h-6 w-6 text-[var(--color-at-risk)] relative z-10" />
              </div>
            </div>
          </PremiumCardContent>
        </PremiumCard>
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
              <Bar dataKey="revenue" fill="var(--color-predicta-navy)" name="Revenue" />
              <Line type="monotone" dataKey="newCustomers" stroke="var(--color-predicta-gold)" name="New Customers" strokeWidth={2} />
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
                    <Cell key={`cell-${entry.name || index}`} fill={entry.color} />
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
                <div key={`segment-${segment.segment || index}`} className="flex items-center justify-between p-3 border rounded-lg">
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
            Bahamas Islands Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {geographicData.map((country, index) => (
                <div key={`country-${country.country || index}`} className="flex items-center justify-between">
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
                  <Bar dataKey="revenue" fill="var(--color-predicta-navy)" />
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
              <Bar dataKey="newCustomers" fill="var(--color-predicta-gold)" name="New Customers" />
              <Area dataKey="retained" fill="var(--color-predicta-cyan)" name="Retained Customers" />
              <Line type="monotone" dataKey="churnRate" stroke="var(--color-at-risk)" name="Churn Rate %" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Lottery Analytics */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Island Luck Lottery Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--color-predicta-gold)]">
                {formatNumber(lotteryStats.totalWinners)}
              </div>
              <div className="text-sm text-muted-foreground">Total Winners (30d)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(lotteryStats.totalPrizeAmount)}
              </div>
              <div className="text-sm text-muted-foreground">Total Prizes Paid</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(lotteryStats.largestPrize)}
              </div>
              <div className="text-sm text-muted-foreground">Largest Prize</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {lotteryStats.jackpotWinners}
              </div>
              <div className="text-sm text-muted-foreground">Jackpot Winners</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Winning Locations */}
            <div>
              <h4 className="font-medium mb-3">Top Winning Locations</h4>
              <div className="space-y-2">
                {Object.entries(lotteryStats.winnersByLocation)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([location, count], index) => (
                    <div key={`location-${location || index}`} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{location}</span>
                      </div>
                      <Badge variant="outline">{count} winners</Badge>
                    </div>
                  ))}
              </div>
            </div>
            
            {/* Popular Games */}
            <div>
              <h4 className="font-medium mb-3">Popular Lottery Games</h4>
              <div className="space-y-2">
                {Object.entries(lotteryStats.winnersByGame)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([game, count], index) => (
                    <div key={`game-${game || index}`} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span className="font-medium">{game}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(count / lotteryStats.totalWinners) * 100} className="w-20 h-2" />
                        <span className="text-sm text-muted-foreground">{count}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
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
              <div key={`campaign-${campaign.name || index}`} className="border rounded-lg p-4">
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