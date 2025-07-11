'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Target, 
  Mail, 
  MessageSquare,
  Bell,
  Globe,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye,
  Send,
  Save,
  Wand2
} from 'lucide-react';

interface CampaignWizardProps {
  onComplete: (campaignData: any) => void;
  onCancel: () => void;
}

type Step = 'template' | 'targeting' | 'content' | 'schedule' | 'review';

export function CampaignWizard({ onComplete, onCancel }: CampaignWizardProps) {
  const [currentStep, setCurrentStep] = useState<Step>('template');
  const [campaignData, setCampaignData] = useState({
    name: '',
    type: '',
    template: '',
    targeting: {
      segments: [] as string[],
      countries: [] as string[],
      vipLevels: [] as string[],
      ageRange: { min: 18, max: 65 },
      lifetimeValueRange: { min: 0, max: 100000 }
    },
    content: {
      subject: '',
      message: '',
      cta: '',
      personalization: [] as string[]
    },
    schedule: {
      type: 'immediate',
      date: '',
      time: '',
      timezone: 'UTC'
    },
    budget: {
      total: 0,
      daily: 0
    }
  });

  const steps = [
    { id: 'template', name: 'Template', icon: Wand2 },
    { id: 'targeting', name: 'Targeting', icon: Target },
    { id: 'content', name: 'Content', icon: Mail },
    { id: 'schedule', name: 'Schedule', icon: Calendar },
    { id: 'review', name: 'Review', icon: Eye }
  ];

  const stepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((stepIndex + 1) / steps.length) * 100;

  const templates = [
    { id: 'welcome', name: 'Welcome Series', type: 'email', description: 'Welcome new customers with a series of onboarding emails' },
    { id: 'retention', name: 'Retention Campaign', type: 'email', description: 'Re-engage inactive customers with special offers' },
    { id: 'vip-upgrade', name: 'VIP Upgrade', type: 'email', description: 'Encourage high-value customers to upgrade to VIP' },
    { id: 'deposit-bonus', name: 'Deposit Bonus', type: 'sms', description: 'Offer deposit bonuses via SMS' },
    { id: 'game-recommendation', name: 'Game Recommendations', type: 'push', description: 'Personalized game recommendations' },
    { id: 'custom', name: 'Custom Campaign', type: 'email', description: 'Create a custom campaign from scratch' }
  ];

  const segments = [
    { id: 'high-value', name: 'High Value', description: 'Customers with LTV > $10k' },
    { id: 'regular', name: 'Regular', description: 'Standard customers' },
    { id: 'at-risk', name: 'At Risk', description: 'Customers likely to churn' },
    { id: 'vip', name: 'VIP', description: 'VIP customers' },
    { id: 'new', name: 'New', description: 'Recently registered' }
  ];

  const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Spain', 'Italy'];
  const vipLevels = ['Bronze', 'Silver', 'Gold', 'Platinum'];

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as Step);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id as Step);
    }
  };

  const handleComplete = () => {
    onComplete(campaignData);
  };

  const updateCampaignData = (section: string, data: any) => {
    setCampaignData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], ...data }
    }));
  };

  const renderTemplateStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose Campaign Template</h3>
        <p className="text-sm text-muted-foreground">Select a template to get started or create a custom campaign</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all ${
              campaignData.template === template.id 
                ? 'border-primary bg-primary/5' 
                : 'hover:border-muted-foreground/50'
            }`}
            onClick={() => setCampaignData(prev => ({ ...prev, template: template.id, type: template.type }))}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                  <Badge variant="secondary" className="mt-2">
                    {template.type.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="campaignName">Campaign Name</Label>
          <Input
            id="campaignName"
            placeholder="Enter campaign name"
            value={campaignData.name}
            onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
      </div>
    </div>
  );

  const renderTargetingStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Target Audience</h3>
        <p className="text-sm text-muted-foreground">Define who should receive this campaign</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-3 block">Customer Segments</Label>
            <div className="space-y-2">
              {segments.map((segment) => (
                <div key={segment.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={segment.id}
                    checked={campaignData.targeting.segments.includes(segment.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateCampaignData('targeting', {
                          segments: [...campaignData.targeting.segments, segment.id]
                        });
                      } else {
                        updateCampaignData('targeting', {
                          segments: campaignData.targeting.segments.filter(s => s !== segment.id)
                        });
                      }
                    }}
                  />
                  <Label htmlFor={segment.id} className="text-sm font-normal cursor-pointer">
                    {segment.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Countries</Label>
            <div className="space-y-2">
              {countries.map((country) => (
                <div key={country} className="flex items-center space-x-2">
                  <Checkbox
                    id={country}
                    checked={campaignData.targeting.countries.includes(country)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateCampaignData('targeting', {
                          countries: [...campaignData.targeting.countries, country]
                        });
                      } else {
                        updateCampaignData('targeting', {
                          countries: campaignData.targeting.countries.filter(c => c !== country)
                        });
                      }
                    }}
                  />
                  <Label htmlFor={country} className="text-sm font-normal cursor-pointer">
                    {country}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-3 block">VIP Levels</Label>
            <div className="space-y-2">
              {vipLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={level}
                    checked={campaignData.targeting.vipLevels.includes(level)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateCampaignData('targeting', {
                          vipLevels: [...campaignData.targeting.vipLevels, level]
                        });
                      } else {
                        updateCampaignData('targeting', {
                          vipLevels: campaignData.targeting.vipLevels.filter(v => v !== level)
                        });
                      }
                    }}
                  />
                  <Label htmlFor={level} className="text-sm font-normal cursor-pointer">
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Age Range</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="minAge" className="text-xs">Min Age</Label>
                <Input
                  id="minAge"
                  type="number"
                  value={campaignData.targeting.ageRange.min}
                  onChange={(e) => updateCampaignData('targeting', {
                    ageRange: { ...campaignData.targeting.ageRange, min: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="maxAge" className="text-xs">Max Age</Label>
                <Input
                  id="maxAge"
                  type="number"
                  value={campaignData.targeting.ageRange.max}
                  onChange={(e) => updateCampaignData('targeting', {
                    ageRange: { ...campaignData.targeting.ageRange, max: parseInt(e.target.value) }
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContentStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Campaign Content</h3>
        <p className="text-sm text-muted-foreground">Create compelling content for your campaign</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="subject">Subject Line</Label>
          <Input
            id="subject"
            placeholder="Enter subject line"
            value={campaignData.content.subject}
            onChange={(e) => updateCampaignData('content', { subject: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Enter your message"
            rows={8}
            value={campaignData.content.message}
            onChange={(e) => updateCampaignData('content', { message: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="cta">Call to Action</Label>
          <Input
            id="cta"
            placeholder="e.g., Claim Your Bonus, Play Now, Learn More"
            value={campaignData.content.cta}
            onChange={(e) => updateCampaignData('content', { cta: e.target.value })}
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">Personalization</Label>
          <div className="space-y-2">
            {['Customer Name', 'VIP Level', 'Favorite Game', 'Last Activity'].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={campaignData.content.personalization.includes(option)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateCampaignData('content', {
                        personalization: [...campaignData.content.personalization, option]
                      });
                    } else {
                      updateCampaignData('content', {
                        personalization: campaignData.content.personalization.filter(p => p !== option)
                      });
                    }
                  }}
                />
                <Label htmlFor={option} className="text-sm font-normal cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderScheduleStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Schedule Campaign</h3>
        <p className="text-sm text-muted-foreground">Choose when to send your campaign</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-3 block">Send Time</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="immediate"
                checked={campaignData.schedule.type === 'immediate'}
                onCheckedChange={() => updateCampaignData('schedule', { type: 'immediate' })}
              />
              <Label htmlFor="immediate" className="text-sm font-normal cursor-pointer">
                Send immediately
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="scheduled"
                checked={campaignData.schedule.type === 'scheduled'}
                onCheckedChange={() => updateCampaignData('schedule', { type: 'scheduled' })}
              />
              <Label htmlFor="scheduled" className="text-sm font-normal cursor-pointer">
                Schedule for later
              </Label>
            </div>
          </div>
        </div>

        {campaignData.schedule.type === 'scheduled' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={campaignData.schedule.date}
                onChange={(e) => updateCampaignData('schedule', { date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={campaignData.schedule.time}
                onChange={(e) => updateCampaignData('schedule', { time: e.target.value })}
              />
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="timezone">Timezone</Label>
          <Select value={campaignData.schedule.timezone} onValueChange={(value) => updateCampaignData('schedule', { timezone: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC">UTC</SelectItem>
              <SelectItem value="EST">Eastern Time</SelectItem>
              <SelectItem value="PST">Pacific Time</SelectItem>
              <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="totalBudget">Total Budget ($)</Label>
            <Input
              id="totalBudget"
              type="number"
              placeholder="0"
              value={campaignData.budget.total}
              onChange={(e) => updateCampaignData('budget', { total: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label htmlFor="dailyBudget">Daily Budget ($)</Label>
            <Input
              id="dailyBudget"
              type="number"
              placeholder="0"
              value={campaignData.budget.daily}
              onChange={(e) => updateCampaignData('budget', { daily: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Review Campaign</h3>
        <p className="text-sm text-muted-foreground">Review your campaign settings before launching</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Campaign Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium">Name:</span>
                <span className="text-sm text-muted-foreground ml-2">{campaignData.name}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Type:</span>
                <span className="text-sm text-muted-foreground ml-2">{campaignData.type.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Template:</span>
                <span className="text-sm text-muted-foreground ml-2">
                  {templates.find(t => t.id === campaignData.template)?.name}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Targeting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium">Segments:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {campaignData.targeting.segments.map(segment => (
                    <Badge key={segment} variant="secondary" className="text-xs">
                      {segments.find(s => s.id === segment)?.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium">Countries:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {campaignData.targeting.countries.slice(0, 3).map(country => (
                    <Badge key={country} variant="secondary" className="text-xs">
                      {country}
                    </Badge>
                  ))}
                  {campaignData.targeting.countries.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{campaignData.targeting.countries.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium">Subject:</span>
                <span className="text-sm text-muted-foreground ml-2">{campaignData.content.subject}</span>
              </div>
              <div>
                <span className="text-sm font-medium">CTA:</span>
                <span className="text-sm text-muted-foreground ml-2">{campaignData.content.cta}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Schedule & Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium">Send:</span>
                <span className="text-sm text-muted-foreground ml-2">
                  {campaignData.schedule.type === 'immediate' ? 'Immediately' : `${campaignData.schedule.date} at ${campaignData.schedule.time}`}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium">Budget:</span>
                <span className="text-sm text-muted-foreground ml-2">
                  ${campaignData.budget.total} total, ${campaignData.budget.daily} daily
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'template':
        return renderTemplateStep();
      case 'targeting':
        return renderTargetingStep();
      case 'content':
        return renderContentStep();
      case 'schedule':
        return renderScheduleStep();
      case 'review':
        return renderReviewStep();
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Create Campaign</h2>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${index <= stepIndex ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <step.icon className="h-4 w-4" />
              </div>
              <span className={`text-sm ${index <= stepIndex ? 'text-foreground' : 'text-muted-foreground'}`}>
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
        
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardContent className="p-6">
          {renderCurrentStep()}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={stepIndex === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          
          {stepIndex === steps.length - 1 ? (
            <Button onClick={handleComplete} className="gap-2">
              <Send className="h-4 w-4" />
              Launch Campaign
            </Button>
          ) : (
            <Button onClick={handleNext} className="gap-2">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}