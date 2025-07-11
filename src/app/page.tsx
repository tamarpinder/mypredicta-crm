'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { CustomerActivityChart } from '@/components/dashboard/customer-activity-chart';
import { GamePerformanceChart } from '@/components/dashboard/game-performance-chart';
import { AIInsightsChart } from '@/components/dashboard/ai-insights-chart';
import { sampleDashboardMetrics } from '@/data/sample-data';

export default function Home() {
  const handleRefresh = () => {
    
  };

  const handleExport = () => {
    
  };

  return (
    <DashboardLayout 
      title="Dashboard" 
      description="Monitor your gambling platform's performance and customer insights"
    >
      <DashboardHeader 
        stats={sampleDashboardMetrics}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <CustomerActivityChart />
        <GamePerformanceChart />
        <AIInsightsChart />
      </div>
    </DashboardLayout>
  );
}
