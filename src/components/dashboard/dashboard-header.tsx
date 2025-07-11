'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Activity,
  AlertCircle,
  Download,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency, formatNumber } from '@/utils/format';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
}

function StatCard({ title, value, change, changeLabel, icon, trend }: StatCardProps) {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';
  
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {value}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isPositive && "text-green-600",
              isNegative && "text-red-600",
              trend === 'neutral' && "text-muted-foreground"
            )}>
              {isPositive && <TrendingUp className="h-4 w-4" />}
              {isNegative && <TrendingDown className="h-4 w-4" />}
              {change > 0 && '+'}
              {change}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {changeLabel}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface DashboardHeaderProps {
  stats: {
    totalRevenue: number;
    activeCustomers: number;
    dailyRevenue: number;
    conversionRate: number;
  };
  onRefresh?: () => void;
  onExport?: () => void;
}

export function DashboardHeader({ stats, onRefresh, onExport }: DashboardHeaderProps) {

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Today&apos;s Overview
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-time insights and key metrics
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live Data
          </Badge>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          change={12.5}
          changeLabel="vs last month"
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          trend="up"
        />
        
        <StatCard
          title="Active Customers"
          value={formatNumber(stats.activeCustomers)}
          change={8.2}
          changeLabel="vs last month"
          icon={<Users className="h-5 w-5 text-primary" />}
          trend="up"
        />
        
        <StatCard
          title="Daily Revenue"
          value={formatCurrency(stats.dailyRevenue)}
          change={-2.1}
          changeLabel="vs yesterday"
          icon={<Activity className="h-5 w-5 text-primary" />}
          trend="down"
        />
        
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate.toFixed(1)}%`}
          change={1.3}
          changeLabel="vs last week"
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          trend="up"
        />
      </div>

      {/* Alert Banner */}
      <Card className="bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                High-Risk Customers Detected
              </p>
              <p className="text-xs text-orange-700 dark:text-orange-300">
                23 customers show high churn probability. Review recommended actions.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-orange-300 text-orange-700 hover:bg-orange-100 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-900"
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}