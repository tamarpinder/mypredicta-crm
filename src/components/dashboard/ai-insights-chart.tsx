'use client';

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, AlertTriangle, Star, TrendingUp } from 'lucide-react';
import { customerSegmentData, formatNumber, formatCurrency } from '@/data/chart-data';

interface AIInsightsChartProps {
  className?: string;
}

export function AIInsightsChart({ className }: AIInsightsChartProps) {
  // Transform data for scatter plot (Customer Value vs Churn Risk)
  const scatterData = customerSegmentData.map(segment => ({
    name: segment.segment,
    value: segment.avgValue,
    risk: segment.churnRisk * 100,
    count: segment.count,
    color: segment.color,
    size: Math.log(segment.count) * 20 // Size based on customer count
  }));

  const highRiskCustomers = customerSegmentData
    .filter(segment => segment.churnRisk > 0.6)
    .reduce((sum, segment) => sum + segment.count, 0);

  const totalCustomers = customerSegmentData.reduce((sum, segment) => sum + segment.count, 0);
  const avgCustomerValue = customerSegmentData.reduce((sum, segment) => sum + (segment.avgValue * segment.count), 0) / totalCustomers;

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">{data.name} Segment</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></div>
              <span className="text-sm">Avg Value: {formatCurrency(data.value)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Churn Risk: {data.risk.toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Customers: {formatNumber(data.count)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props: { cx?: number; cy?: number; payload?: any }) => {
    const { cx, cy, payload } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={payload.size}
        fill={payload.color}
        fillOpacity={0.7}
        stroke={payload.color}
        strokeWidth={2}
      />
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">AI Customer Insights</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Customer segmentation analysis with churn risk and value predictions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Brain className="h-3 w-3" />
              AI Powered
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-lg font-bold text-red-600">
                {formatNumber(highRiskCustomers)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">High Risk</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="h-4 w-4 text-yellow-600" />
              <span className="text-lg font-bold text-yellow-600">
                {formatNumber(customerSegmentData.find(s => s.segment === 'VIP')?.count || 0)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">VIP Customers</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold text-primary">
                {formatCurrency(avgCustomerValue)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Avg Value</div>
          </div>
        </div>

        {/* Segment Legend */}
        <div className="pt-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {customerSegmentData.map((segment, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div 
                  className="w-3 h-3 rounded-full border-2" 
                  style={{ backgroundColor: segment.color, borderColor: segment.color }}
                />
                <span>{segment.segment}</span>
                <span className="text-muted-foreground">({formatNumber(segment.count)})</span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              data={scatterData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                type="number" 
                dataKey="value" 
                name="Customer Value"
                tickFormatter={(value) => formatCurrency(value)}
                className="text-xs"
              />
              <YAxis 
                type="number" 
                dataKey="risk" 
                name="Churn Risk"
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                className="text-xs"
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter 
                name="Customer Segments" 
                data={scatterData} 
                shape={<CustomDot />}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* AI Recommendations */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Recommendations
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>
                <strong>High Priority:</strong> {formatNumber(highRiskCustomers)} customers at risk of churning - trigger retention campaigns
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>
                <strong>Medium Priority:</strong> Upsell VIP customers with personalized offers
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>
                <strong>Low Priority:</strong> Focus on regular customer engagement programs
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}