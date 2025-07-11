'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';
import { revenueData, monthlyRevenueData, formatCurrency } from '@/data/chart-data';

type TimePeriod = '7D' | '30D' | '90D' | '1Y';

interface RevenueChartProps {
  className?: string;
}

export function RevenueChart({ className }: RevenueChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('7D');
  
  const getData = () => {
    switch (selectedPeriod) {
      case '7D':
        return revenueData.slice(0, 7);
      case '30D':
        return revenueData;
      case '90D':
        return revenueData;
      case '1Y':
        return monthlyRevenueData;
      default:
        return revenueData;
    }
  };

  const currentData = getData();
  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0);
  const averageRevenue = totalRevenue / currentData.length;
  const previousAverage = averageRevenue * 0.92; // Mock previous period
  const growth = ((averageRevenue - previousAverage) / previousAverage) * 100;

  const formatXAxis = (value: string) => {
    if (selectedPeriod === '1Y') {
      return new Date(value).toLocaleDateString('en-US', { month: 'short' });
    }
    return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">
            {new Date(label).toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm">Revenue: {formatCurrency(data.revenue)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Deposits: {formatCurrency(data.deposits)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">Withdrawals: {formatCurrency(data.withdrawals)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Total Bets: {formatCurrency(data.bets)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const timePeriods: { value: TimePeriod; label: string }[] = [
    { value: '7D', label: '7 Days' },
    { value: '30D', label: '30 Days' },
    { value: '90D', label: '90 Days' },
    { value: '1Y', label: '1 Year' },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Revenue Overview</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track daily revenue, deposits, and betting activity
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <DollarSign className="h-3 w-3" />
              {formatCurrency(totalRevenue)}
            </Badge>
          </div>
        </div>
        
        {/* Time Period Selector */}
        <div className="flex items-center gap-2 pt-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-1">
            {timePeriods.map((period) => (
              <Button
                key={period.value}
                variant={selectedPeriod === period.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period.value)}
                className="h-7 px-3 text-xs"
              >
                {period.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(averageRevenue)}
            </div>
            <div className="text-xs text-muted-foreground">Avg Daily Revenue</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-2xl font-bold text-green-600">
                {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
              </span>
              {growth >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </div>
            <div className="text-xs text-muted-foreground">Growth Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {currentData.length}
            </div>
            <div className="text-xs text-muted-foreground">Days Tracked</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatXAxis}
                className="text-xs"
              />
              <YAxis 
                tickFormatter={(value) => formatCurrency(value)}
                className="text-xs"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                name="Revenue"
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="deposits" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Deposits"
                dot={{ fill: "#10B981", strokeWidth: 2, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="withdrawals" 
                stroke="#EF4444" 
                strokeWidth={2}
                name="Withdrawals"
                dot={{ fill: "#EF4444", strokeWidth: 2, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="bets" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Total Bets"
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 3 }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}