'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Gamepad2, Users, TrendingUp, Target } from 'lucide-react';
import { gamePerformanceData, formatCurrency, formatNumber } from '@/data/chart-data';

interface GamePerformanceChartProps {
  className?: string;
}

type ViewType = 'pie' | 'bar';

export function GamePerformanceChart({ className }: GamePerformanceChartProps) {
  const [viewType, setViewType] = useState<ViewType>('pie');
  
  const totalRevenue = gamePerformanceData.reduce((sum, item) => sum + item.revenue, 0);
  const totalPlayers = gamePerformanceData.reduce((sum, item) => sum + item.players, 0);
  const topGame = gamePerformanceData.reduce((prev, current) => 
    prev.revenue > current.revenue ? prev : current
  );

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">{data.name}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></div>
              <span className="text-sm">Revenue: {formatCurrency(data.revenue)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Players: {formatNumber(data.players)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Share: {data.percentage}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: { payload?: any[] }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload?.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Game Performance</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Revenue distribution and player engagement across game types
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Gamepad2 className="h-3 w-3" />
              {gamePerformanceData.length} Games
            </Badge>
          </div>
        </div>

        {/* View Type Selector */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            variant={viewType === 'pie' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewType('pie')}
            className="h-7 px-3 text-xs"
          >
            Pie Chart
          </Button>
          <Button
            variant={viewType === 'bar' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewType('bar')}
            className="h-7 px-3 text-xs"
          >
            Bar Chart
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold text-primary">
                {formatCurrency(totalRevenue)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Total Revenue</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="h-4 w-4 text-green-600" />
              <span className="text-lg font-bold text-green-600">
                {formatNumber(totalPlayers)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Total Players</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-lg font-bold text-blue-600">
                {topGame.name}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Top Performer</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {viewType === 'pie' ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gamePerformanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {gamePerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gamePerformanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="name" 
                  className="text-xs"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value)}
                  className="text-xs"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="revenue" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}