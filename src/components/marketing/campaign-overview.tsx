'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
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
  Activity
} from 'lucide-react';
import { Campaign } from '@/types';

interface CampaignOverviewProps {
  campaigns: Campaign[];
}

export function CampaignOverview({ campaigns }: CampaignOverviewProps) {
  // Calculate metrics
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalCost = campaigns.reduce((sum, c) => sum + c.cost, 0);
  const totalSent = campaigns.reduce((sum, c) => sum + c.totalSent, 0);
  const totalOpened = campaigns.reduce((sum, c) => sum + c.totalOpened, 0);
  const totalClicked = campaigns.reduce((sum, c) => sum + c.totalClicked, 0);
  const totalConverted = campaigns.reduce((sum, c) => sum + c.totalConverted, 0);

  const openRate = (totalOpened / totalSent) * 100;
  const clickRate = (totalClicked / totalOpened) * 100;
  const conversionRate = (totalConverted / totalSent) * 100;
  const netROI = ((totalRevenue - totalCost) / totalCost) * 100;

  // Performance by type
  const performanceByType = ['email', 'sms', 'push', 'social'].map(type => {
    const typeCampaigns = campaigns.filter(c => c.type === type);
    const typeRevenue = typeCampaigns.reduce((sum, c) => sum + c.revenue, 0);
    const typeCost = typeCampaigns.reduce((sum, c) => sum + c.cost, 0);
    const typeConverted = typeCampaigns.reduce((sum, c) => sum + c.totalConverted, 0);
    const typeSent = typeCampaigns.reduce((sum, c) => sum + c.totalSent, 0);
    
    return {
      type,
      revenue: typeRevenue,
      cost: typeCost,
      roi: typeCost > 0 ? ((typeRevenue - typeCost) / typeCost) * 100 : 0,
      conversion: typeSent > 0 ? (typeConverted / typeSent) * 100 : 0,
      count: typeCampaigns.length
    };
  });

  // Recent campaign performance
  const recentPerformance = campaigns
    .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
    .slice(0, 7)
    .map(campaign => ({
      name: campaign.name.substring(0, 20) + '...',
      revenue: campaign.revenue,
      cost: campaign.cost,
      roi: campaign.roi,
      conversion: ((campaign.totalConverted / campaign.totalSent) * 100).toFixed(1)
    }));

  // Status distribution
  const statusData = ['active', 'completed', 'paused', 'draft'].map(status => ({
    name: status,
    value: campaigns.filter(c => c.status === status).length,
    color: status === 'active' ? '#10B981' : 
           status === 'completed' ? '#3B82F6' : 
           status === 'paused' ? '#F59E0B' : '#6B7280'
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
      case 'email': return Mail;
      case 'sms': return Phone;
      case 'push': return Smartphone;
      case 'social': return Globe;
      default: return Mail;
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
                <span className="text-sm">{item.name}: {item.name.includes('Revenue') || item.name.includes('Cost') ? formatCurrency(item.value) : item.value}</span>
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
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Rate</p>
                <p className="text-2xl font-bold text-blue-600">{openRate.toFixed(1)}%</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Click Rate</p>
                <p className="text-2xl font-bold text-green-600">{clickRate.toFixed(1)}%</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold text-purple-600">{conversionRate.toFixed(1)}%</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net ROI</p>
                <p className={`text-2xl font-bold ${netROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {netROI >= 0 ? '+' : ''}{netROI.toFixed(1)}%
                </p>
              </div>
              <div className={`p-2 rounded-lg ${netROI >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {netROI >= 0 ? 
                  <TrendingUp className="h-5 w-5 text-green-600" /> : 
                  <TrendingDown className="h-5 w-5 text-red-600" />
                }
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance by Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Performance by Campaign Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceByType}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="type" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
                  <Bar dataKey="cost" fill="#EF4444" name="Cost" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Campaign Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaign Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Campaign Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={recentPerformance}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="cost" stroke="#EF4444" strokeWidth={2} name="Cost" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Channel Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Channel Performance Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceByType.map((type, index) => {
              const Icon = getTypeIcon(type.type);
              return (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="font-medium capitalize">{type.type}</span>
                    <Badge variant="outline">{type.count}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Revenue</span>
                      <span className="text-sm font-medium">{formatCurrency(type.revenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">ROI</span>
                      <span className={`text-sm font-medium ${type.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {type.roi >= 0 ? '+' : ''}{type.roi.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Conversion</span>
                      <span className="text-sm font-medium">{type.conversion.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}