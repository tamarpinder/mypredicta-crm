'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ChurnPredictionPanel } from '@/components/ai-insights/churn-prediction-panel';
import { LTVPredictionPanel } from '@/components/ai-insights/ltv-prediction-panel';
import { RecommendationEngine } from '@/components/ai-insights/recommendation-engine';
import { RiskAssessmentPanel } from '@/components/ai-insights/risk-assessment-panel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Target, 
  Star,
  Activity,
  Download,
  Settings,
  RefreshCw,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import { sampleAIInsights, sampleCustomers } from '@/data/sample-data';
import { formatCurrency } from '@/utils/format';

export default function AIInsightsPage() {
  const [selectedView, setSelectedView] = useState<'overview' | 'churn' | 'ltv' | 'recommendations'>('overview');

  // Calculate AI insights statistics
  const highRiskCustomers = sampleAIInsights.churnPrediction.filter(c => c.riskScore > 0.7).length;
  const totalPredictions = sampleAIInsights.churnPrediction.length;
  const averageRiskScore = sampleAIInsights.churnPrediction.reduce((sum, c) => sum + c.riskScore, 0) / totalPredictions;
  const totalLTVPredictions = sampleAIInsights.lifetimeValuePrediction.length;
  const averageLTVPrediction = sampleAIInsights.lifetimeValuePrediction.reduce((sum, c) => sum + c.predictedValue, 0) / totalLTVPredictions;
  const totalRecommendations = sampleAIInsights.gameRecommendations.length;

  const handleRefreshModels = () => {
    // Refresh AI models
  };

  const handleExportInsights = () => {
    // Export AI insights
  };

  const handleConfigureAI = () => {
    // Configure AI settings
  };


  const actions = (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className="gap-1">
        <Activity className="h-3 w-3" />
        Models Updated: 2 hours ago
      </Badge>
      <Button variant="outline" onClick={handleRefreshModels} className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Refresh Models
      </Button>
      <Button variant="outline" onClick={handleExportInsights} className="gap-2">
        <Download className="h-4 w-4" />
        Export Insights
      </Button>
      <Button onClick={handleConfigureAI} className="gap-2">
        <Settings className="h-4 w-4" />
        Configure AI
      </Button>
    </div>
  );

  return (
    <DashboardLayout 
      title="AI Insights & Predictions" 
      description="Advanced machine learning insights for customer behavior and business optimization"
      actions={actions}
    >
      {/* AI Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-sm transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  High Risk Customers
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {highRiskCustomers}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-sm transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Avg Risk Score
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {(averageRiskScore * 100).toFixed(1)}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-sm transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Avg LTV Prediction
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(averageLTVPrediction)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-sm transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Active Recommendations
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {totalRecommendations}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Model Status */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Model Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Churn Prediction</span>
                <Badge variant="default" className="gap-1">
                  <Zap className="h-3 w-3" />
                  Active
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Accuracy: 94.2% • Last trained: 2 hours ago
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">LTV Prediction</span>
                <Badge variant="default" className="gap-1">
                  <Zap className="h-3 w-3" />
                  Active
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Accuracy: 89.7% • Last trained: 4 hours ago
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Game Recommendations</span>
                <Badge variant="default" className="gap-1">
                  <Zap className="h-3 w-3" />
                  Active
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Accuracy: 87.3% • Last trained: 1 hour ago
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Risk Assessment</span>
                <Badge variant="default" className="gap-1">
                  <Zap className="h-3 w-3" />
                  Active
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Accuracy: 92.1% • Last trained: 30 minutes ago
              </div>
            </div>
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
          <Brain className="h-4 w-4" />
          Overview
        </Button>
        <Button
          variant={selectedView === 'churn' ? "default" : "outline"}
          onClick={() => setSelectedView('churn')}
          className="gap-2"
        >
          <AlertTriangle className="h-4 w-4" />
          Churn Prediction
        </Button>
        <Button
          variant={selectedView === 'ltv' ? "default" : "outline"}
          onClick={() => setSelectedView('ltv')}
          className="gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          LTV Prediction
        </Button>
        <Button
          variant={selectedView === 'recommendations' ? "default" : "outline"}
          onClick={() => setSelectedView('recommendations')}
          className="gap-2"
        >
          <Star className="h-4 w-4" />
          Recommendations
        </Button>
      </div>

      {/* Content Based on Selected View */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChurnPredictionPanel 
            predictions={sampleAIInsights.churnPrediction.slice(0, 10)} 
            compact={true}
          />
          <LTVPredictionPanel 
            predictions={sampleAIInsights.lifetimeValuePrediction.slice(0, 10)} 
            compact={true}
          />
          <RecommendationEngine 
            recommendations={sampleAIInsights.gameRecommendations.slice(0, 10)} 
            compact={true}
          />
          <RiskAssessmentPanel 
            customers={sampleCustomers.slice(0, 10)} 
            compact={true}
          />
        </div>
      )}
      
      {selectedView === 'churn' && (
        <ChurnPredictionPanel 
          predictions={sampleAIInsights.churnPrediction} 
          compact={false}
        />
      )}
      
      {selectedView === 'ltv' && (
        <LTVPredictionPanel 
          predictions={sampleAIInsights.lifetimeValuePrediction} 
          compact={false}
        />
      )}
      
      {selectedView === 'recommendations' && (
        <RecommendationEngine 
          recommendations={sampleAIInsights.gameRecommendations} 
          compact={false}
        />
      )}
    </DashboardLayout>
  );
}