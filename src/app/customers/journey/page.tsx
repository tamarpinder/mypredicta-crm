'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { JourneyVisualizer } from '@/components/customers/journey-visualizer';
import { JourneyAnalyticsDashboard } from '@/components/customers/journey-analytics';
import { JourneyBuilder } from '@/components/customers/journey-builder';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Route, 
  BarChart3, 
  Settings, 
  Download, 
  Filter,
  Plus,
  Eye,
  Play,
  Pause,
  Calendar,
  Users,
  TrendingUp,
  Clock
} from 'lucide-react';
import { 
  journeyFlows, 
  journeyAnalytics, 
  generateCustomerJourneys,
  journeyTemplates 
} from '@/data/journey-mock-data';
import { JourneyFlow, JourneyStage } from '@/types';
import { formatNumber, formatPercentage, formatDate } from '@/utils/format';

export default function CustomerJourneyPage() {
  const [selectedFlow, setSelectedFlow] = useState<JourneyFlow>(journeyFlows[0]);
  const [selectedStage, setSelectedStage] = useState<JourneyStage | null>(null);
  const [activeTab, setActiveTab] = useState('visualizer');
  const [isBuilding, setIsBuilding] = useState(false);

  // Generate some sample customer journeys
  const customerJourneys = generateCustomerJourneys(
    ['customer_1', 'customer_2', 'customer_3'], 
    50
  );

  const handleStageClick = (stage: JourneyStage) => {
    setSelectedStage(stage);
  };

  const handleSaveJourney = (journey: JourneyFlow) => {
    
    setIsBuilding(false);
  };

  const handlePreviewJourney = (journey: JourneyFlow) => {
    
    setSelectedFlow(journey);
    setActiveTab('visualizer');
  };

  const actions = (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className="gap-1">
        <Route className="h-3 w-3" />
        {journeyFlows.length} Active Journeys
      </Badge>
      <Select value={selectedFlow.id} onValueChange={(value) => {
        const flow = journeyFlows.find(f => f.id === value);
        if (flow) setSelectedFlow(flow);
      }}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {journeyFlows.map(flow => (
            <SelectItem key={flow.id} value={flow.id}>
              {flow.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="outline" className="gap-2">
        <Download className="h-4 w-4" />
        Export
      </Button>
      <Button variant="outline" className="gap-2">
        <Filter className="h-4 w-4" />
        Filter
      </Button>
      <Button onClick={() => setIsBuilding(true)} className="gap-2">
        <Plus className="h-4 w-4" />
        Create Journey
      </Button>
    </div>
  );

  if (isBuilding) {
    return (
      <DashboardLayout 
        title="Journey Builder" 
        description="Create and customize customer journey flows"
      >
        <JourneyBuilder 
          onSave={handleSaveJourney}
          onPreview={handlePreviewJourney}
          templates={journeyTemplates}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      title="Customer Journey Mapping" 
      description="Visualize and analyze customer journeys to optimize experience and conversions"
      actions={actions}
    >
      <div className="space-y-6">
        {/* Journey Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{formatNumber(selectedFlow.metrics.totalCustomers)}</div>
                  <div className="text-sm text-muted-foreground">Total Customers</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{formatPercentage(selectedFlow.metrics.completionRate)}</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">{selectedFlow.metrics.averageJourneyTime.toFixed(1)}d</div>
                  <div className="text-sm text-muted-foreground">Avg Journey Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">{selectedFlow.stages.length}</div>
                  <div className="text-sm text-muted-foreground">Journey Stages</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Journey Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5" />
                Journey Status
              </CardTitle>
              <Badge variant={selectedFlow.isActive ? "default" : "secondary"} className="gap-1">
                {selectedFlow.isActive ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                {selectedFlow.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Journey Name</span>
                <span className="font-medium">{selectedFlow.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Target Segments</span>
                <div className="flex gap-1">
                  {selectedFlow.targetSegment.map(segment => (
                    <Badge key={segment} variant="outline" className="text-xs">
                      {segment}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Modified</span>
                <span className="text-sm">{formatDate(selectedFlow.lastModified)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journey Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visualizer" className="gap-2">
              <Eye className="h-4 w-4" />
              Visualizer
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visualizer" className="space-y-4">
            <JourneyVisualizer
              flow={selectedFlow}
              customerJourneys={customerJourneys}
              onStageClick={handleStageClick}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <JourneyAnalyticsDashboard
              analytics={journeyAnalytics}
              dateRange={{
                startDate: '2024-01-01',
                endDate: '2024-01-31'
              }}
            />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Journey Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Journey Name</label>
                      <div className="mt-1 text-sm text-muted-foreground">{selectedFlow.name}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <div className="mt-1">
                        <Badge variant={selectedFlow.isActive ? "default" : "secondary"}>
                          {selectedFlow.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <div className="mt-1 text-sm text-muted-foreground">{selectedFlow.description}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Target Segments</label>
                    <div className="mt-1 flex gap-2">
                      {selectedFlow.targetSegment.map(segment => (
                        <Badge key={segment} variant="outline">
                          {segment}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}