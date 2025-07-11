'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { CampaignWizard } from '@/components/marketing/campaign-wizard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Target, 
  TrendingUp,
  Mail,
  MessageSquare,
  Bell,
  Eye,
  Edit,
  Play,
  Pause,
  Copy
} from 'lucide-react';

export default function CampaignsPage() {
  const [showWizard, setShowWizard] = useState(false);
  const [campaigns, setCampaigns] = useState([
    {
      id: '1',
      name: 'Welcome New Players',
      type: 'email',
      status: 'active',
      sent: 1250,
      opened: 875,
      clicked: 312,
      converted: 89,
      revenue: 45000,
      cost: 2500,
      createdAt: '2024-01-15',
      scheduledAt: '2024-01-16T10:00:00Z'
    },
    {
      id: '2',
      name: 'VIP Upgrade Offer',
      type: 'email',
      status: 'completed',
      sent: 450,
      opened: 387,
      clicked: 156,
      converted: 67,
      revenue: 89000,
      cost: 3200,
      createdAt: '2024-01-10',
      scheduledAt: '2024-01-11T14:00:00Z'
    },
    {
      id: '3',
      name: 'Weekend Bonus SMS',
      type: 'sms',
      status: 'scheduled',
      sent: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      revenue: 0,
      cost: 800,
      createdAt: '2024-01-20',
      scheduledAt: '2024-01-22T09:00:00Z'
    }
  ]);

  const handleCreateCampaign = (campaignData: Record<string, any>) => {
    const newCampaign = {
      id: Date.now().toString(),
      name: campaignData.name,
      type: campaignData.type,
      status: campaignData.schedule.type === 'immediate' ? 'active' : 'scheduled',
      sent: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      revenue: 0,
      cost: campaignData.budget?.total || 0,
      createdAt: new Date().toISOString().split('T')[0],
      scheduledAt: campaignData.schedule.type === 'scheduled' 
        ? `${campaignData.schedule.date}T${campaignData.schedule.time}:00Z`
        : new Date().toISOString()
    };

    setCampaigns(prev => [newCampaign, ...prev]);
    setShowWizard(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      case 'scheduled':
        return 'text-orange-600 bg-orange-100';
      case 'paused':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      case 'push':
        return <Bell className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateROI = (revenue: number, cost: number) => {
    if (cost === 0) return 0;
    return ((revenue - cost) / cost) * 100;
  };

  const calculateOpenRate = (opened: number, sent: number) => {
    if (sent === 0) return 0;
    return (opened / sent) * 100;
  };

  const calculateClickRate = (clicked: number, opened: number) => {
    if (opened === 0) return 0;
    return (clicked / opened) * 100;
  };

  const calculateConversionRate = (converted: number, sent: number) => {
    if (sent === 0) return 0;
    return (converted / sent) * 100;
  };

  if (showWizard) {
    return (
      <CampaignWizard
        onComplete={handleCreateCampaign}
        onCancel={() => setShowWizard(false)}
      />
    );
  }

  const actions = (
    <div className="flex items-center gap-3">
      <Button onClick={() => setShowWizard(true)} className="gap-2">
        <Plus className="h-4 w-4" />
        Create Campaign
      </Button>
    </div>
  );

  return (
    <DashboardLayout 
      title="Campaign Management" 
      description="Create, manage, and track your marketing campaigns"
      actions={actions}
    >
      {/* Campaign Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Campaigns
                </p>
                <p className="text-2xl font-bold">
                  {campaigns.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Active Campaigns
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {campaigns.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <Play className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(campaigns.reduce((sum, c) => sum + c.revenue, 0))}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Avg ROI
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {campaigns.length > 0 
                    ? (campaigns.reduce((sum, c) => sum + calculateROI(c.revenue, c.cost), 0) / campaigns.length).toFixed(1)
                    : 0}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      {getTypeIcon(campaign.type)}
                    </div>
                    <div>
                      <h3 className="font-medium">{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Created {formatDate(campaign.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Copy className="h-3 w-3" />
                        Clone
                      </Button>
                      {campaign.status === 'active' ? (
                        <Button size="sm" variant="outline" className="gap-1">
                          <Pause className="h-3 w-3" />
                          Pause
                        </Button>
                      ) : campaign.status === 'scheduled' ? (
                        <Button size="sm" variant="outline" className="gap-1">
                          <Play className="h-3 w-3" />
                          Start
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Sent</p>
                    <p className="text-lg font-semibold">{campaign.sent.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Open Rate</p>
                    <p className="text-lg font-semibold">
                      {calculateOpenRate(campaign.opened, campaign.sent).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Click Rate</p>
                    <p className="text-lg font-semibold">
                      {calculateClickRate(campaign.clicked, campaign.opened).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Conversion</p>
                    <p className="text-lg font-semibold">
                      {calculateConversionRate(campaign.converted, campaign.sent).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-lg font-semibold text-green-600">
                      {formatCurrency(campaign.revenue)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">ROI</p>
                    <p className="text-lg font-semibold text-blue-600">
                      {calculateROI(campaign.revenue, campaign.cost).toFixed(1)}%
                    </p>
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