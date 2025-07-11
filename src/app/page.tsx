'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { LazyWrapper, ChartSkeleton, StatsSkeleton } from '@/components/ui/lazy-wrapper';
import { sampleDashboardMetrics } from '@/data/sample-data';
import { lazy } from 'react';
import { useLiveNotifications } from '@/hooks/use-live-notifications';
import { ErrorBoundary } from '@/components/ui/error-boundary';

// Lazy load chart components
const RevenueChart = lazy(() => import('@/components/dashboard/revenue-chart').then(module => ({ default: module.RevenueChart })));
const CustomerActivityChart = lazy(() => import('@/components/dashboard/customer-activity-chart').then(module => ({ default: module.CustomerActivityChart })));
const GamePerformanceChart = lazy(() => import('@/components/dashboard/game-performance-chart').then(module => ({ default: module.GamePerformanceChart })));
const AIInsightsChart = lazy(() => import('@/components/dashboard/ai-insights-chart').then(module => ({ default: module.AIInsightsChart })));

export default function Home() {
  // Enable live notifications for the dashboard
  useLiveNotifications();

  const handleRefresh = () => {
    
  };

  const handleExport = () => {
    
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
