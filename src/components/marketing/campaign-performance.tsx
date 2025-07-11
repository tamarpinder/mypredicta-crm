'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target, 
  Mail,
  Phone,
  Smartphone,
  Globe,
  Calendar,
  Activity,
  Award,
  Download,
  Filter
} from 'lucide-react';
import { Campaign } from '@/types';

interface CampaignPerformanceProps {
  campaigns: Campaign[];
}

export function CampaignPerformance({ campaigns }: CampaignPerformanceProps) {
  const [selectedMetric, setSelectedMetric] = useState('roi');
  const [timeRange, setTimeRange] = useState('all');

  // Calculate performance metrics
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalCost = campaigns.reduce((sum, c) => sum + c.cost, 0);
  const totalSent = campaigns.reduce((sum, c) => sum + c.totalSent, 0);
  const totalOpened = campaigns.reduce((sum, c) => sum + c.totalOpened, 0);
  const totalClicked = campaigns.reduce((sum, c) => sum + c.totalClicked, 0);
  const totalConverted = campaigns.reduce((sum, c) => sum + c.totalConverted, 0);

  const averageROI = campaigns.reduce((sum, c) => sum + c.roi, 0) / campaigns.length;
  const conversionRate = (totalConverted / totalSent) * 100;

  // Top performing campaigns
  const topCampaigns = campaigns
    .sort((a, b) => b.roi - a.roi)
    .slice(0, 5)
    .map(campaign => ({
      name: campaign.name,
      type: campaign.type,
      roi: campaign.roi,
      revenue: campaign.revenue,
      conversion: ((campaign.totalConverted / campaign.totalSent) * 100).toFixed(1),
      status: campaign.status
    }));

  // Performance by channel
  const channelPerformance = ['email', 'sms', 'push', 'social'].map(type => {
    const typeCampaigns = campaigns.filter(c => c.type === type);
    const typeRevenue = typeCampaigns.reduce((sum, c) => sum + c.revenue, 0);
    const typeCost = typeCampaigns.reduce((sum, c) => sum + c.cost, 0);
    const typeSent = typeCampaigns.reduce((sum, c) => sum + c.totalSent, 0);
    const typeOpened = typeCampaigns.reduce((sum, c) => sum + c.totalOpened, 0);
    const typeClicked = typeCampaigns.reduce((sum, c) => sum + c.totalClicked, 0);
    const typeConverted = typeCampaigns.reduce((sum, c) => sum + c.totalConverted, 0);

    return {
      channel: type,
      revenue: typeRevenue,
      cost: typeCost,
      roi: typeCost > 0 ? ((typeRevenue - typeCost) / typeCost) * 100 : 0,
      openRate: typeSent > 0 ? (typeOpened / typeSent) * 100 : 0,
      clickRate: typeOpened > 0 ? (typeClicked / typeOpened) * 100 : 0,
      conversionRate: typeSent > 0 ? (typeConverted / typeSent) * 100 : 0,
      campaigns: typeCampaigns.length
    };
  });

  // Monthly performance trend
  const monthlyData = campaigns.reduce((acc, campaign) => {
    const month = new Date(campaign.createdDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = { month, revenue: 0, cost: 0, campaigns: 0 };
    }
    acc[month].revenue += campaign.revenue;
    acc[month].cost += campaign.cost;
    acc[month].campaigns += 1;
    return acc;
  }, {} as Record<string, any>);

  const monthlyPerformance = Object.values(monthlyData).map((data: any) => ({
    ...data,
    roi: data.cost > 0 ? ((data.revenue - data.cost) / data.cost) * 100 : 0
  }));

  // Funnel analysis
  const funnelData = [
    { stage: 'Sent', value: totalSent, color: '#E5E7EB' },
    { stage: 'Opened', value: totalOpened, color: '#93C5FD' },
    { stage: 'Clicked', value: totalClicked, color: '#60A5FA' },
    { stage: 'Converted', value: totalConverted, color: '#3B82F6' }
  ];

  // Radar chart data for channel comparison
  const radarData = channelPerformance.map(channel => ({
    channel: channel.channel,
    ROI: Math.max(0, Math.min(100, channel.roi)),
    OpenRate: channel.openRate,
    ClickRate: channel.clickRate,
    ConversionRate: channel.conversionRate * 10 // Scale for better visibility
  }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'sms': return <Phone className="h-4 w-4" />;
      case 'push': return <Smartphone className="h-4 w-4" />;
      case 'social': return <Globe className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">{label}</p>
          <div className="space-y-1">
            {payload?.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm">{item.name}: {item.name.includes('Revenue') || item.name.includes('Cost') ? formatCurrency(item.value) : `${item.value.toFixed(1)}${item.name.includes('Rate') || item.name.includes('ROI') ? '%' : ''}`}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Performance Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Performance Analytics
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roi">ROI</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="conversion">Conversion Rate</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average ROI</p>
                <p className={`text-2xl font-bold ${averageROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {averageROI >= 0 ? '+' : ''}{averageROI.toFixed(1)}%
                </p>
              </div>
              <div className={`p-2 rounded-lg ${averageROI >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {averageROI >= 0 ? 
                  <TrendingUp className="h-5 w-5 text-green-600" /> : 
                  <TrendingDown className="h-5 w-5 text-red-600" />
                }
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold text-blue-600">{conversionRate.toFixed(1)}%</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reach</p>
                <p className="text-2xl font-bold text-purple-600">{totalSent.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Channel Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelPerformance}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="channel" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="roi" fill="#10B981" name="ROI %" />
                  <Bar dataKey="conversionRate" fill="#3B82F6" name="Conversion Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Funnel Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="stage" type="category" className="text-xs" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Monthly Performance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} name="Revenue" />
                  <Line type="monotone" dataKey="cost" stroke="#EF4444" strokeWidth={2} name="Cost" />
                  <Line type="monotone" dataKey="roi" stroke="#3B82F6" strokeWidth={2} name="ROI %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Channel Comparison Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Channel Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="channel" />
                  <PolarRadiusAxis />
                  <Radar name="Performance" dataKey="ROI" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Radar name="Open Rate" dataKey="OpenRate" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Radar name="Click Rate" dataKey="ClickRate" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Top Performing Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCampaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{campaign.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="gap-1">
                        {getTypeIcon(campaign.type)}
                        {campaign.type}
                      </Badge>
                      <Badge variant="outline">
                        {campaign.conversion}% conversion
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    +{campaign.roi.toFixed(1)}% ROI
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(campaign.revenue)} revenue
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}