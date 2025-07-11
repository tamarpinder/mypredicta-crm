'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Users, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface QuickCampaignFormProps {
  onSubmit: (campaignData: any) => void;
  onCancel: () => void;
  templateId?: string;
}

export function QuickCampaignForm({ onSubmit, onCancel, templateId }: QuickCampaignFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'email',
    template: templateId || 'custom',
    subject: '',
    message: '',
    segment: 'all',
    scheduleType: 'immediate'
  });

  const campaignTypes = [
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'sms', label: 'SMS', icon: MessageSquare },
    { value: 'push', label: 'Push', icon: Smartphone }
  ];

  const quickSegments = [
    { value: 'all', label: 'All Customers' },
    { value: 'high-value', label: 'High Value' },
    { value: 'vip', label: 'VIP Customers' },
    { value: 'new', label: 'New Customers' },
    { value: 'at-risk', label: 'At Risk' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Quick Campaign</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="gap-2"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Advanced
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Campaign Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., Welcome New Users"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="type" className="text-sm font-medium">
                Type
              </Label>
              <Select value={formData.type} onValueChange={(value) => updateFormData('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {campaignTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="subject" className="text-sm font-medium">
              Subject Line
            </Label>
            <Input
              id="subject"
              placeholder="Enter your subject line"
              value={formData.subject}
              onChange={(e) => updateFormData('subject', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-medium">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Enter your message content..."
              rows={4}
              value={formData.message}
              onChange={(e) => updateFormData('message', e.target.value)}
              required
            />
          </div>

          {/* Targeting */}
          <div>
            <Label htmlFor="segment" className="text-sm font-medium">
              Target Audience
            </Label>
            <Select value={formData.segment} onValueChange={(value) => updateFormData('segment', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {quickSegments.map((segment) => (
                  <SelectItem key={segment.value} value={segment.value}>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {segment.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Options (Collapsible) */}
          {isExpanded && (
            <div className="space-y-4 border-t pt-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Quick Options
                </Label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    Add Personalization
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    A/B Test Subject
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    Set Budget Limit
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label htmlFor="scheduleType" className="text-sm font-medium">
                  Schedule
                </Label>
                <Select value={formData.scheduleType} onValueChange={(value) => updateFormData('scheduleType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Send Immediately</SelectItem>
                    <SelectItem value="scheduled">Schedule for Later</SelectItem>
                    <SelectItem value="optimal">Send at Optimal Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 gap-2"
            >
              <Send className="h-4 w-4" />
              Send Campaign
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}