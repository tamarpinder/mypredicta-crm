'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Trophy, 
  TrendingUp, 
  MapPin, 
  DollarSign,
  Users,
  Activity,
  Star,
  Clock,
  Download,
  Filter
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/utils/format';
import { sampleLotteryWinners, lotteryStats, LotteryWinner } from '@/data/lottery-data';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface LotteryDashboardProps {
  className?: string;
}

export function LotteryDashboard({ className }: LotteryDashboardProps) {
  const stats = lotteryStats;
  
  // Prepare data for charts
  const locationData = Object.entries(stats.winnersByLocation)
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const gameData = Object.entries(stats.winnersByGame)
    .map(([game, count]) => ({ game, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const tierData = [
    { name: 'Small ($400-$2.5K)', value: stats.prizesByTier.small, color: '#10b981' },
    { name: 'Medium ($2.5K-$25K)', value: stats.prizesByTier.medium, color: '#3b82f6' },
    { name: 'Large ($25K-$100K)', value: stats.prizesByTier.large, color: '#f59e0b' },
    { name: 'Jackpot ($100K+)', value: stats.prizesByTier.jackpot, color: '#ef4444' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            {payload[0].name}: {formatNumber(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const winDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - winDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getPrizeColor = (amount: number) => {
    if (amount >= 100000) return 'text-red-600 bg-red-100';
    if (amount >= 25000) return 'text-orange-600 bg-orange-100';
    if (amount >= 2500) return 'text-blue-600 bg-blue-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Winners
                </p>
                <p className="text-2xl font-bold text-[var(--color-predicta-navy)]">
                  {formatNumber(stats.totalWinners)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Last 30 days
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[var(--color-predicta-gold)]/10">
                <Trophy className="h-6 w-6 text-[var(--color-predicta-gold)]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Prizes Paid
                </p>
                <p className="text-2xl font-bold text-[var(--color-predicta-navy)]">
                  {formatCurrency(stats.totalPrizeAmount)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  All payouts
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Largest Prize
                </p>
                <p className="text-2xl font-bold text-[var(--color-predicta-navy)]">
                  {formatCurrency(stats.largestPrize)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Single winner
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-100">
                <Star className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Jackpot Winners
                </p>
                <p className="text-2xl font-bold text-[var(--color-predicta-navy)]">
                  {stats.jackpotWinners}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  $100K+ prizes
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Winners */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Island Luck Winners
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live Updates
              </Badge>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {stats.recentWinners.map((winner) => (
                <div key={winner.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${getPrizeColor(winner.prizeAmount)}`}>
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{winner.winnerName}</div>
                      <div className="text-sm text-muted-foreground">
                        {winner.location} • {winner.gameType}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {getTimeAgo(winner.drawDate)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{formatCurrency(winner.prizeAmount)}</div>
                    <Badge variant={winner.claimStatus === 'claimed' ? 'default' : 'secondary'} className="text-xs">
                      {winner.claimStatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prize Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Prize Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={tierData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {tierData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Winners by Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Winners by Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="var(--color-predicta-navy)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Popular Games */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Popular Games
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gameData.map((game, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium">{game.game}</div>
                      <div className="text-sm text-muted-foreground">
                        {game.count} winners
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">
                      {((game.count / stats.totalWinners) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter Winners
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
        <Button className="gap-2">
          <Trophy className="h-4 w-4" />
          Manage Lottery
        </Button>
      </div>
    </div>
  );
}