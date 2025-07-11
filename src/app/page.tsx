'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { LazyWrapper, ChartSkeleton, StatsSkeleton } from '@/components/ui/lazy-wrapper';
import { sampleDashboardMetrics } from '@/data/sample-data';
import { lazy, useState } from 'react';
import { useLiveNotifications } from '@/hooks/use-live-notifications';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { useToast } from '@/hooks/use-toast';

// Lazy load chart components
const RevenueChart = lazy(() => import('@/components/dashboard/revenue-chart').then(module => ({ default: module.RevenueChart })));
const CustomerActivityChart = lazy(() => import('@/components/dashboard/customer-activity-chart').then(module => ({ default: module.CustomerActivityChart })));
const GamePerformanceChart = lazy(() => import('@/components/dashboard/game-performance-chart').then(module => ({ default: module.GamePerformanceChart })));
const AIInsightsChart = lazy(() => import('@/components/dashboard/ai-insights-chart').then(module => ({ default: module.AIInsightsChart })));

export default function Home() {
  // Enable live notifications for the dashboard
  useLiveNotifications();
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Dashboard Refreshed",
        description: "All data has been updated successfully.",
      });
    } catch (error) {
      console.error('Dashboard refresh failed:', error);
      toast({
        title: "Refresh Failed",
        description: "Unable to refresh dashboard data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExport = () => {
    try {
      // Create export data
      const exportData = {
        timestamp: new Date().toISOString(),
        metrics: sampleDashboardMetrics,
        exportType: 'dashboard_summary'
      };
      
      // Create and download file
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Successful",
        description: "Dashboard data has been exported successfully.",
      });
    } catch (error) {
      console.error('Dashboard export failed:', error);
      toast({
        title: "Export Failed", 
        description: "Unable to export dashboard data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout 
        title="Dashboard" 
        description="Monitor your gambling platform's performance and customer insights"
      >
        <LazyWrapper fallback={<StatsSkeleton />}>
          <DashboardHeader 
            stats={sampleDashboardMetrics}
            onRefresh={handleRefresh}
            onExport={handleExport}
            isRefreshing={isRefreshing}
          />
        </LazyWrapper>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ErrorBoundary>
            <LazyWrapper fallback={<ChartSkeleton />}>
              <RevenueChart />
            </LazyWrapper>
          </ErrorBoundary>
          <ErrorBoundary>
            <LazyWrapper fallback={<ChartSkeleton />}>
              <CustomerActivityChart />
            </LazyWrapper>
          </ErrorBoundary>
          <ErrorBoundary>
            <LazyWrapper fallback={<ChartSkeleton />}>
              <GamePerformanceChart />
            </LazyWrapper>
          </ErrorBoundary>
          <ErrorBoundary>
            <LazyWrapper fallback={<ChartSkeleton />}>
              <AIInsightsChart />
            </LazyWrapper>
          </ErrorBoundary>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
