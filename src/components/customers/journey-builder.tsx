'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  X, 
  Eye, 
  UserPlus, 
  Zap, 
  Heart, 
  DollarSign, 
  Users, 
  Mail, 
  Smartphone, 
  Bell, 
  Globe,
  Save,
  Play,
  Copy,
  Settings,
  ArrowRight,
  ArrowDown,
  Clock,
  Target,
  Trash2,
  Edit
} from 'lucide-react';
import { JourneyFlow, JourneyStage, JourneyEvent, JourneyTemplate } from '@/types';
import { journeyTemplates } from '@/data/journey-mock-data';

interface JourneyBuilderProps {
  onSave?: (journey: JourneyFlow) => void;
  onPreview?: (journey: JourneyFlow) => void;
  existingJourney?: JourneyFlow;
  templates?: JourneyTemplate[];
}

const stageTypes = [
  { value: 'awareness', label: 'Awareness', icon: Eye, color: 'bg-blue-100 text-blue-800' },
  { value: 'acquisition', label: 'Acquisition', icon: UserPlus, color: 'bg-green-100 text-green-800' },
  { value: 'activation', label: 'Activation', icon: Zap, color: 'bg-yellow-100 text-yellow-800' },
  { value: 'retention', label: 'Retention', icon: Heart, color: 'bg-purple-100 text-purple-800' },
  { value: 'revenue', label: 'Revenue', icon: DollarSign, color: 'bg-orange-100 text-orange-800' },
  { value: 'referral', label: 'Referral', icon: Users, color: 'bg-pink-100 text-pink-800' }
];

const eventTypes = [
  { value: 'email_sent', label: 'Email Sent', icon: Mail, channel: 'email' },
  { value: 'email_opened', label: 'Email Opened', icon: Mail, channel: 'email' },
  { value: 'email_clicked', label: 'Email Clicked', icon: Mail, channel: 'email' },
  { value: 'sms_sent', label: 'SMS Sent', icon: Smartphone, channel: 'sms' },
  { value: 'sms_clicked', label: 'SMS Clicked', icon: Smartphone, channel: 'sms' },
  { value: 'push_sent', label: 'Push Sent', icon: Bell, channel: 'push' },
  { value: 'push_opened', label: 'Push Opened', icon: Bell, channel: 'push' },
  { value: 'registration', label: 'Registration', icon: UserPlus, channel: 'web' },
  { value: 'first_deposit', label: 'First Deposit', icon: DollarSign, channel: 'web' },
  { value: 'first_bet', label: 'First Bet', icon: Target, channel: 'web' },
  { value: 'game_played', label: 'Game Played', icon: Play, channel: 'web' },
  { value: 'withdrawal', label: 'Withdrawal', icon: DollarSign, channel: 'web' },
  { value: 'support_contact', label: 'Support Contact', icon: Globe, channel: 'phone' }
];

const channelOptions = [
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'sms', label: 'SMS', icon: Smartphone },
  { value: 'push', label: 'Push Notification', icon: Bell },
  { value: 'web', label: 'Website', icon: Globe },
  { value: 'app', label: 'Mobile App', icon: Smartphone },
  { value: 'phone', label: 'Phone', icon: Smartphone },
  { value: 'chat', label: 'Live Chat', icon: Mail }
];

export function JourneyBuilder({ onSave, onPreview, existingJourney, templates = journeyTemplates }: JourneyBuilderProps) {
  const [journey, setJourney] = useState<Partial<JourneyFlow>>(() => ({
    id: existingJourney?.id || `journey_${Date.now()}`,
    name: existingJourney?.name || '',
    description: existingJourney?.description || '',
    stages: existingJourney?.stages || [],
    events: existingJourney?.events || [],
    targetSegment: existingJourney?.targetSegment || [],
    isActive: existingJourney?.isActive || false,
    createdDate: existingJourney?.createdDate || new Date().toISOString(),
    lastModified: new Date().toISOString(),
    metrics: existingJourney?.metrics || {
      totalCustomers: 0,
      completionRate: 0,
      averageJourneyTime: 0,
      totalRevenue: 0,
      conversionsByStage: {}
    }
  }));

  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [editingStage, setEditingStage] = useState<JourneyStage | null>(null);
  const [editingEvent, setEditingEvent] = useState<JourneyEvent | null>(null);

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setJourney(prev => ({
        ...prev,
        name: template.name,
        description: template.description,
        stages: template.stages.map((stage, index) => ({
          ...stage,
          metrics: {
            totalCustomers: 0,
            conversionRate: 0,
            averageTime: 0,
            dropoffRate: 0
          }
        })),
        targetSegment: template.targetSegments,
        events: template.defaultEvents.map(event => ({
          ...event,
          id: `event_${Date.now()}_${Math.random()}`,
          customerId: '',
          timestamp: new Date().toISOString()
        }))
      }));
    }
  };

  const addStage = () => {
    const newStage: JourneyStage = {
      id: `stage_${Date.now()}`,
      name: 'New Stage',
      description: 'Enter stage description',
      type: 'awareness',
      order: (journey.stages?.length || 0) + 1,
      icon: 'Eye',
      color: 'bg-blue-100 text-blue-800',
      metrics: {
        totalCustomers: 0,
        conversionRate: 0,
        averageTime: 0,
        dropoffRate: 0
      }
    };

    setJourney(prev => ({
      ...prev,
      stages: [...(prev.stages || []), newStage]
    }));
  };

  const updateStage = (stageId: string, updates: Partial<JourneyStage>) => {
    setJourney(prev => ({
      ...prev,
      stages: prev.stages?.map(stage => 
        stage.id === stageId ? { ...stage, ...updates } : stage
      )
    }));
  };

  const removeStage = (stageId: string) => {
    setJourney(prev => ({
      ...prev,
      stages: prev.stages?.filter(stage => stage.id !== stageId)
    }));
  };

  const addEvent = (stageId: string) => {
    const newEvent: JourneyEvent = {
      id: `event_${Date.now()}`,
      customerId: '',
      stageId,
      type: 'email_sent',
      channel: 'email',
      timestamp: new Date().toISOString(),
      metadata: {}
    };

    setJourney(prev => ({
      ...prev,
      events: [...(prev.events || []), newEvent]
    }));
  };

  const updateEvent = (eventId: string, updates: Partial<JourneyEvent>) => {
    setJourney(prev => ({
      ...prev,
      events: prev.events?.map(event => 
        event.id === eventId ? { ...event, ...updates } : event
      )
    }));
  };

  const removeEvent = (eventId: string) => {
    setJourney(prev => ({
      ...prev,
      events: prev.events?.filter(event => event.id !== eventId)
    }));
  };

  const handleSave = () => {
    if (journey.name && journey.stages && journey.stages.length > 0) {
      onSave?.(journey as JourneyFlow);
    }
  };

  const handlePreview = () => {
    if (journey.name && journey.stages && journey.stages.length > 0) {
      onPreview?.(journey as JourneyFlow);
    }
  };

  const renderStageEditor = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Journey Stages</h3>
        <Button onClick={addStage} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Stage
        </Button>
      </div>

      <div className="space-y-4">
        {journey.stages?.map((stage, index) => (
          <Card key={stage.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stage.color}`}>
                    {React.createElement(
                      stageTypes.find(t => t.value === stage.type)?.icon || Eye, 
                      { className: "h-4 w-4" }
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base">{stage.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{stage.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingStage(stage)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStage(stage.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Stage Events</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addEvent(stage.id)}
                    className="gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    Add Event
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {journey.events?.filter(event => event.stageId === stage.id).map(event => (
                    <div key={event.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div className="flex items-center gap-2">
                        {React.createElement(
                          eventTypes.find(t => t.value === event.type)?.icon || Mail,
                          { className: "h-4 w-4" }
                        )}
                        <span className="text-sm">
                          {eventTypes.find(t => t.value === event.type)?.label || event.type}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {event.channel}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingEvent(event)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEvent(event.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            
            {index < (journey.stages?.length || 0) - 1 && (
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-background p-1 rounded-full border">
                  <ArrowDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStageEditModal = () => {
    if (!editingStage) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Edit Stage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="stage-name">Stage Name</Label>
              <Input
                id="stage-name"
                value={editingStage.name}
                onChange={(e) => setEditingStage({...editingStage, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="stage-description">Description</Label>
              <Textarea
                id="stage-description"
                value={editingStage.description}
                onChange={(e) => setEditingStage({...editingStage, description: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="stage-type">Stage Type</Label>
              <Select 
                value={editingStage.type} 
                onValueChange={(value) => {
                  const stageType = stageTypes.find(t => t.value === value);
                  setEditingStage({
                    ...editingStage, 
                    type: value as any,
                    icon: stageType?.icon.name || 'Eye',
                    color: stageType?.color || 'bg-blue-100 text-blue-800'
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stageTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        {React.createElement(type.icon, { className: "h-4 w-4" })}
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => {
                  updateStage(editingStage.id, editingStage);
                  setEditingStage(null);
                }}
              >
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setEditingStage(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderEventEditModal = () => {
    if (!editingEvent) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Edit Event</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="event-type">Event Type</Label>
              <Select 
                value={editingEvent.type} 
                onValueChange={(value) => {
                  const eventType = eventTypes.find(t => t.value === value);
                  setEditingEvent({
                    ...editingEvent, 
                    type: value as any,
                    channel: eventType?.channel as any || 'email'
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        {React.createElement(type.icon, { className: "h-4 w-4" })}
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="event-channel">Channel</Label>
              <Select 
                value={editingEvent.channel} 
                onValueChange={(value) => setEditingEvent({...editingEvent, channel: value as any})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {channelOptions.map(channel => (
                    <SelectItem key={channel.value} value={channel.value}>
                      <div className="flex items-center gap-2">
                        {React.createElement(channel.icon, { className: "h-4 w-4" })}
                        {channel.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => {
                  updateEvent(editingEvent.id, editingEvent);
                  setEditingEvent(null);
                }}
              >
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setEditingEvent(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Journey Builder</h2>
          <p className="text-muted-foreground">Create and customize customer journey flows</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePreview} className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Journey
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Journey Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="journey-name">Journey Name</Label>
                <Input
                  id="journey-name"
                  value={journey.name}
                  onChange={(e) => setJourney({...journey, name: e.target.value})}
                  placeholder="Enter journey name"
                />
              </div>
              
              <div>
                <Label htmlFor="journey-description">Description</Label>
                <Textarea
                  id="journey-description"
                  value={journey.description}
                  onChange={(e) => setJourney({...journey, description: e.target.value})}
                  placeholder="Enter journey description"
                />
              </div>
              
              <div>
                <Label htmlFor="template-select">Use Template</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="target-segments">Target Segments</Label>
                <Select 
                  value={journey.targetSegment?.[0] || ''} 
                  onValueChange={(value) => setJourney({...journey, targetSegment: [value]})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select segments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="new-users">New Users</SelectItem>
                    <SelectItem value="active-users">Active Users</SelectItem>
                    <SelectItem value="high-value">High Value</SelectItem>
                    <SelectItem value="at-risk">At Risk</SelectItem>
                    <SelectItem value="churned">Churned</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="journey-active">Active Journey</Label>
                <Switch
                  id="journey-active"
                  checked={journey.isActive}
                  onCheckedChange={(checked) => setJourney({...journey, isActive: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Journey Builder */}
        <div className="lg:col-span-3">
          {renderStageEditor()}
        </div>
      </div>

      {/* Modals */}
      {renderStageEditModal()}
      {renderEventEditModal()}
    </div>
  );
}