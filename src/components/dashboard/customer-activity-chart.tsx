'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, UserMinus, UserCheck, Activity } from 'lucide-react';
import { customerActivityData, formatNumber } from '@/data/chart-data';

interface CustomerActivityChartProps {
  className?: string;
}

export function CustomerActivityChart({ className }: CustomerActivityChartProps) {
  const totalActive = customerActivityData.reduce((sum, item) => sum + item.active, 0);
  const totalNew = customerActivityData.reduce((sum, item) => sum + item.new, 0);
  const totalChurned = customerActivityData.reduce((sum, item) => sum + item.churned, 0);

  const averageActive = Math.round(totalActive / customerActivityData.length);
  const churnRate = ((totalChurned / totalActive) * 100).toFixed(1);
  const retentionRate = (100 - parseFloat(churnRate)).toFixed(1);

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm">Active: {formatNumber(data.active)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">New: {formatNumber(data.new)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">Churned: {formatNumber(data.churned)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Returning: {formatNumber(data.returning)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Customer Activity</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor customer acquisition, retention, and churn patterns
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Activity className="h-3 w-3" />
              Live Data
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4 pt-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold text-primary">
                {formatNumber(averageActive)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Avg Active</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <UserPlus className="h-4 w-4 text-green-600" />
              <span className="text-lg font-bold text-green-600">
                {formatNumber(totalNew)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">New Users</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <UserMinus className="h-4 w-4 text-red-600" />
              <span className="text-lg font-bold text-red-600">
                {churnRate}%
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Churn Rate</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <UserCheck className="h-4 w-4 text-blue-600" />
              <span className="text-lg font-bold text-blue-600">
                {retentionRate}%
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Retention</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={customerActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="period" 
                className="text-xs"
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tickFormatter={(value) => formatNumber(value)}
                className="text-xs"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="active" 
                fill="hsl(var(--primary))" 
                name="Active Users"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="new" 
                fill="#10B981" 
                name="New Users"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="churned" 
                fill="#EF4444" 
                name="Churned Users"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="returning" 
                fill="#3B82F6" 
                name="Returning Users"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}