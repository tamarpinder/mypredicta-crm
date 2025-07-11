'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Eye, 
  UserPlus, 
  Zap, 
  Heart, 
  DollarSign, 
  Users, 
  ArrowDown,
  ChevronRight,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  PlayCircle,
  Pause
} from 'lucide-react';
import { JourneyStage, JourneyFlow, CustomerJourney } from '@/types';
import { formatCurrency, formatNumber } from '@/utils/format';

interface JourneyVisualizerProps {
  flow: JourneyFlow;
  customerJourneys?: CustomerJourney[];
  viewMode?: 'funnel' | 'flow' | 'timeline';
  onStageClick?: (stage: JourneyStage) => void;
}

const stageIcons = {
  awareness: Eye,
  acquisition: UserPlus,
  activation: Zap,
  retention: Heart,
  revenue: DollarSign,
  referral: Users
};

export function JourneyVisualizer({ 
  flow, 
  customerJourneys = [], 
  viewMode = 'funnel',
  onStageClick 
}: JourneyVisualizerProps) {
  const [selectedStage, setSelectedStage] = useState<JourneyStage | null>(null);
  const [currentViewMode, setCurrentViewMode] = useState(viewMode);

  const handleStageClick = (stage: JourneyStage) => {
    setSelectedStage(stage);
    onStageClick?.(stage);
  };

  const getStageProgress = (stage: JourneyStage) => {
    const stageCustomers = flow.metrics.conversionsByStage[stage.id] || 0;
    const totalCustomers = flow.metrics.totalCustomers;
    return totalCustomers > 0 ? (stageCustomers / totalCustomers) * 100 : 0;
  };

  const getStageConversionRate = (stage: JourneyStage, index: number) => {
    if (index === 0) return 100;
    const previousStage = flow.stages[index - 1];
    const previousCustomers = flow.metrics.conversionsByStage[previousStage.id] || 0;
    const currentCustomers = flow.metrics.conversionsByStage[stage.id] || 0;
    return previousCustomers > 0 ? (currentCustomers / previousCustomers) * 100 : 0;
  };

  const renderFunnelView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{flow.name}</h3>
          <p className="text-sm text-muted-foreground">{flow.description}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{formatNumber(flow.metrics.totalCustomers)}</div>
          <div className="text-sm text-muted-foreground">Total Customers</div>
        </div>
      </div>

      <div className="space-y-4">
        {flow.stages.map((stage, index) => {
          const Icon = stageIcons[stage.type];
          const customers = flow.metrics.conversionsByStage[stage.id] || 0;
          const progress = getStageProgress(stage);
          const conversionRate = getStageConversionRate(stage, index);
          const isSelected = selectedStage?.id === stage.id;

          return (
            <div key={stage.id} className="relative">
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleStageClick(stage)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${stage.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{stage.name}</h4>
                        <p className="text-sm text-muted-foreground">{stage.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{formatNumber(customers)}</div>
                      <div className="text-sm text-muted-foreground">Customers</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">
                        {conversionRate.toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Conversion Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">
                        {stage.metrics.averageTime.toFixed(1)}d
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-600">
                        {stage.metrics.dropoffRate.toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Drop-off Rate</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {index < flow.stages.length - 1 && (
                <div className="flex justify-center my-2">
                  <ArrowDown className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderFlowView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{flow.name}</h3>
          <p className="text-sm text-muted-foreground">{flow.description}</p>
        </div>
        <Badge variant="outline" className="gap-2">
          <PlayCircle className="h-4 w-4" />
          {flow.isActive ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between bg-muted/50 p-6 rounded-lg">
          {flow.stages.map((stage, index) => {
            const Icon = stageIcons[stage.type];
            const customers = flow.metrics.conversionsByStage[stage.id] || 0;
            const isSelected = selectedStage?.id === stage.id;

            return (
              <div key={stage.id} className="flex items-center">
                <div
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    isSelected ? 'scale-110' : ''
                  }`}
                  onClick={() => handleStageClick(stage)}
                >
                  <div className="text-center space-y-2">
                    <div className={`p-4 rounded-full ${stage.color} mx-auto w-16 h-16 flex items-center justify-center`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{stage.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatNumber(customers)}
                      </div>
                    </div>
                  </div>
                </div>
                
                {index < flow.stages.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className="flex items-center">
                      <div className="flex-1 h-0.5 bg-border"></div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
                      <div className="flex-1 h-0.5 bg-border"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage Details */}
      {selectedStage && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(stageIcons[selectedStage.type], { className: "h-5 w-5" })}
              {selectedStage.name} Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatNumber(selectedStage.metrics.totalCustomers)}
                </div>
                <div className="text-sm text-muted-foreground">Total Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {selectedStage.metrics.conversionRate.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Conversion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {selectedStage.metrics.averageTime.toFixed(1)} days
                </div>
                <div className="text-sm text-muted-foreground">Average Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {selectedStage.metrics.dropoffRate.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Drop-off Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderTimelineView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Customer Journey Timeline</h3>
          <p className="text-sm text-muted-foreground">Average customer progression through stages</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {flow.metrics.averageJourneyTime.toFixed(1)} days
          </div>
          <div className="text-sm text-muted-foreground">Average Journey Time</div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
        
        <div className="space-y-8">
          {flow.stages.map((stage, index) => {
            const Icon = stageIcons[stage.type];
            const customers = flow.metrics.conversionsByStage[stage.id] || 0;
            const conversionRate = getStageConversionRate(stage, index);

            return (
              <div key={stage.id} className="relative flex items-start gap-4">
                <div className={`p-3 rounded-full ${stage.color} z-10`}>
                  <Icon className="h-6 w-6" />
                </div>
                
                <div className="flex-1">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{stage.name}</h4>
                        <Badge variant="outline">
                          Day {index * 3 + 1}-{(index + 1) * 3}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {stage.description}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-semibold text-green-600">
                            {formatNumber(customers)}
                          </div>
                          <div className="text-muted-foreground">Customers</div>
                        </div>
                        <div>
                          <div className="font-semibold text-blue-600">
                            {conversionRate.toFixed(1)}%
                          </div>
                          <div className="text-muted-foreground">Conversion</div>
                        </div>
                        <div>
                          <div className="font-semibold text-orange-600">
                            {stage.metrics.averageTime.toFixed(1)}d
                          </div>
                          <div className="text-muted-foreground">Avg Time</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Mode Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">Journey Visualization</h2>
          <Select value={currentViewMode} onValueChange={setCurrentViewMode}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="funnel">Funnel View</SelectItem>
              <SelectItem value="flow">Flow View</SelectItem>
              <SelectItem value="timeline">Timeline View</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-2">
            <Clock className="h-4 w-4" />
            Avg. {flow.metrics.averageJourneyTime.toFixed(1)} days
          </Badge>
          <Badge variant="outline" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            {flow.metrics.completionRate.toFixed(1)}% completion
          </Badge>
        </div>
      </div>

      {/* Journey Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{formatNumber(flow.metrics.totalCustomers)}</div>
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
                <div className="text-2xl font-bold">{flow.metrics.completionRate.toFixed(1)}%</div>
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
                <div className="text-2xl font-bold">{flow.metrics.averageJourneyTime.toFixed(1)}d</div>
                <div className="text-sm text-muted-foreground">Avg Journey Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{formatCurrency(flow.metrics.totalRevenue)}</div>
                <div className="text-sm text-muted-foreground">Total Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visualization */}
      {currentViewMode === 'funnel' && renderFunnelView()}
      {currentViewMode === 'flow' && renderFlowView()}
      {currentViewMode === 'timeline' && renderTimelineView()}
    </div>
  );
}