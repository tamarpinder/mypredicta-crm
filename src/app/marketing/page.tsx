'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { CampaignOverview } from '@/components/marketing/campaign-overview';
import { CampaignList } from '@/components/marketing/campaign-list';
import { CampaignPerformance } from '@/components/marketing/campaign-performance';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
  ChevronDown,
  Zap,
  Clock,
  Settings
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sampleCampaigns } from '@/data/sample-data';
import { CampaignWizard } from '@/components/marketing/campaign-wizard';
import { QuickCampaignForm } from '@/components/marketing/quick-campaign-form';
import { toastSuccess } from '@/hooks/use-toast';

export default function MarketingPage() {
  const router = useRouter();
  const [selectedView, setSelectedView] = useState<'overview' | 'campaigns' | 'performance'>('overview');
  const [showCampaignWizard, setShowCampaignWizard] = useState(false);
  const [showQuickForm, setShowQuickForm] = useState(false);
  const [isScheduleMode, setIsScheduleMode] = useState(false);
  const [campaignType, setCampaignType] = useState<string>('');

  // Calculate campaign statistics
  const totalCampaigns = sampleCampaigns.length;
  const activeCampaigns = sampleCampaigns.filter(c => c.status === 'active').length;
  const totalRevenue = sampleCampaigns.reduce((sum, c) => sum + c.revenue, 0);
  const averageROI = sampleCampaigns.reduce((sum, c) => sum + c.roi, 0) / totalCampaigns;
  const totalSent = sampleCampaigns.reduce((sum, c) => sum + c.totalSent, 0);
  const totalConverted = sampleCampaigns.reduce((sum, c) => sum + c.totalConverted, 0);

  const handleCreateCampaign = (type?: string) => {
    setIsScheduleMode(false);
    if (type) setCampaignType(type);
    setShowCampaignWizard(true);
  };

  const handleScheduleCampaign = () => {
    setIsScheduleMode(true);
    setShowCampaignWizard(true);
  };

  const handleQuickCampaign = (templateId: string) => {
    setCampaignType(templateId);
    setIsScheduleMode(false);
    setShowQuickForm(true);
  };

  const handleQuickFormComplete = (campaignData: any) => {
    console.log('Quick campaign created:', campaignData);
    setShowQuickForm(false);
    
    toastSuccess(
      'Campaign Created Successfully!', 
      `Your campaign "${campaignData.name}" has been created and is ready to launch.`
    );
    
    router.push('/campaigns');
  };

  const handleQuickFormCancel = () => {
    setShowQuickForm(false);
    setCampaignType('');
  };

  const handleCampaignComplete = (campaignData: any) => {
    console.log('Campaign created:', campaignData);
    setShowCampaignWizard(false);
    setIsScheduleMode(false);
    
    // Show success toast
    toastSuccess(
      'Campaign Created Successfully!', 
      `Your campaign "${campaignData.name}" has been ${isScheduleMode ? 'scheduled' : 'created'} and is ready to launch.`
    );
    
    // Navigate to campaigns page
    router.push('/campaigns');
  };

  const handleCampaignCancel = () => {
    setShowCampaignWizard(false);
    setIsScheduleMode(false);
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

  const campaignTemplates = [
    { id: 'welcome', name: 'Welcome Series', icon: Mail, description: 'Onboard new customers' },
    { id: 'retention', name: 'Retention Campaign', icon: Target, description: 'Re-engage inactive users' },
    { id: 'vip-upgrade', name: 'VIP Upgrade', icon: TrendingUp, description: 'Promote VIP benefits' },
    { id: 'deposit-bonus', name: 'Deposit Bonus', icon: DollarSign, description: 'Encourage deposits' }
  ];

  const actions = (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className="gap-1 text-white border-white/30">
        <BarChart3 className="h-3 w-3" />
        ROI: {averageROI.toFixed(1)}%
      </Badge>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 hover:bg-gray-50 transition-all duration-200">
            <Zap className="h-4 w-4" />
            Quick Create
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Campaign Templates</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {campaignTemplates.map((template) => (
              <DropdownMenuItem
                key={template.id}
                onClick={() => handleQuickCampaign(template.id)}
                className="cursor-pointer"
              >
                <template.icon className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="font-medium">{template.name}</span>
                  <span className="text-xs text-muted-foreground">{template.description}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleCreateCampaign('custom')} className="cursor-pointer">
            <Settings className="h-4 w-4" />
            Custom Campaign
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" onClick={handleScheduleCampaign} className="gap-2 hover:bg-gray-50 transition-all duration-200">
        <Clock className="h-4 w-4" />
        Schedule
      </Button>
      
      <Button onClick={() => handleCreateCampaign()} className="gap-2 hover:bg-primary/90 transition-all duration-200">
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

      {/* Quick Campaign Form */}
      {showQuickForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <QuickCampaignForm
            onSubmit={handleQuickFormComplete}
            onCancel={handleQuickFormCancel}
            templateId={campaignType}
          />
        </div>
      )}

      {/* Campaign Wizard Sheet */}
      <Sheet open={showCampaignWizard} onOpenChange={setShowCampaignWizard}>
        <SheetContent className="w-full sm:max-w-2xl lg:max-w-4xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {isScheduleMode ? 'Schedule Campaign' : 'Create Campaign'}
            </SheetTitle>
            <SheetDescription>
              {isScheduleMode 
                ? 'Set up a campaign to be sent at a specific time'
                : 'Create and configure your marketing campaign'
              }
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <CampaignWizard
              onComplete={handleCampaignComplete}
              onCancel={handleCampaignCancel}
              initialType={campaignType}
              isScheduleMode={isScheduleMode}
            />
          </div>
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
}