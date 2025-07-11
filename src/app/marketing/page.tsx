'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { CampaignOverview } from '@/components/marketing/campaign-overview';
import { CampaignList } from '@/components/marketing/campaign-list';
import { CampaignPerformance } from '@/components/marketing/campaign-performance';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Plus, 
  TrendingUp, 
  Target, 
  DollarSign,
  Mail,
  Phone,
  Smartphone,
  Globe,
  BarChart3,
  Calendar
} from 'lucide-react';
import { useState } from 'react';
import { sampleCampaigns } from '@/data/sample-data';

export default function MarketingPage() {
  const [selectedView, setSelectedView] = useState<'overview' | 'campaigns' | 'performance'>('overview');

  // Calculate campaign statistics
  const totalCampaigns = sampleCampaigns.length;
  const activeCampaigns = sampleCampaigns.filter(c => c.status === 'active').length;
  const totalRevenue = sampleCampaigns.reduce((sum, c) => sum + c.revenue, 0);
  const averageROI = sampleCampaigns.reduce((sum, c) => sum + c.roi, 0) / totalCampaigns;
  const totalSent = sampleCampaigns.reduce((sum, c) => sum + c.totalSent, 0);
  const totalConverted = sampleCampaigns.reduce((sum, c) => sum + c.totalConverted, 0);

  const handleCreateCampaign = () => {
    
  };

  const handleImportCampaign = () => {
    
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  const campaignTypeStats = [
    { type: 'email', count: sampleCampaigns.filter(c => c.type === 'email').length, icon: Mail, color: 'text-blue-600' },
    { type: 'sms', count: sampleCampaigns.filter(c => c.type === 'sms').length, icon: Phone, color: 'text-green-600' },
    { type: 'push', count: sampleCampaigns.filter(c => c.type === 'push').length, icon: Smartphone, color: 'text-purple-600' },
    { type: 'social', count: sampleCampaigns.filter(c => c.type === 'social').length, icon: Globe, color: 'text-orange-600' }
  ];

  const actions = (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className="gap-1">
        <BarChart3 className="h-3 w-3" />
        ROI: {averageROI.toFixed(1)}%
      </Badge>
      <Button variant="outline" onClick={handleImportCampaign} className="gap-2">
        <Calendar className="h-4 w-4" />
        Schedule Campaign
      </Button>
      <Button onClick={handleCreateCampaign} className="gap-2">
        <Plus className="h-4 w-4" />
        Create Campaign
      </Button>
    </div>
  );

  return (
    <DashboardLayout 
      title="Marketing Campaigns" 
      description="Create, manage, and track your marketing campaigns with advanced targeting and analytics"
      actions={actions}
    >
      {/* Campaign Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-sm transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Campaigns
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {totalCampaigns}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-sm transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Active Campaigns
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {activeCampaigns}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-sm transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-sm transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Conversion Rate
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {((totalConverted / totalSent) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Type Distribution */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Campaign Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {campaignTypeStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  <span className="text-2xl font-bold">
                    {stat.count}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground capitalize">
                  {stat.type} Campaigns
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Selector */}
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant={selectedView === 'overview' ? "default" : "outline"}
          onClick={() => setSelectedView('overview')}
          className="gap-2"
        >
          <BarChart3 className="h-4 w-4" />
          Overview
        </Button>
        <Button
          variant={selectedView === 'campaigns' ? "default" : "outline"}
          onClick={() => setSelectedView('campaigns')}
          className="gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          Campaigns
        </Button>
        <Button
          variant={selectedView === 'performance' ? "default" : "outline"}
          onClick={() => setSelectedView('performance')}
          className="gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Performance
        </Button>
      </div>

      {/* Content Based on Selected View */}
      {selectedView === 'overview' && (
        <CampaignOverview campaigns={sampleCampaigns} />
      )}
      
      {selectedView === 'campaigns' && (
        <CampaignList campaigns={sampleCampaigns} />
      )}
      
      {selectedView === 'performance' && (
        <CampaignPerformance campaigns={sampleCampaigns} />
      )}
    </DashboardLayout>
  );
}