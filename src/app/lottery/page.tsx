'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { LotteryDashboard } from '@/components/lottery/lottery-dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Download,
  Plus,
  Calendar,
  MapPin,
  Activity
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/utils/format';
import { sampleLotteryWinners, lotteryStats, lotteryGames } from '@/data/lottery-data';
import { useToast } from '@/hooks/use-toast';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function LotteryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('30d');
  const { toast } = useToast();

  // Filter winners based on search and filters
  const filteredWinners = sampleLotteryWinners.filter(winner => {
    const matchesSearch = searchQuery === '' || 
      winner.winnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      winner.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGame = selectedGame === 'all' || winner.gameType === selectedGame;
    const matchesLocation = selectedLocation === 'all' || winner.location === selectedLocation;
    const matchesStatus = selectedStatus === 'all' || winner.claimStatus === selectedStatus;
    
    return matchesSearch && matchesGame && matchesLocation && matchesStatus;
  });

  const locations = [...new Set(sampleLotteryWinners.map(w => w.location))].sort();

  const handleAddDraw = () => {
    toast({
      title: "Add New Draw",
      description: "New lottery draw creation form will be available in the next update.",
    });
  };

  const handleExport = () => {
    try {
      const exportData = {
        timestamp: new Date().toISOString(),
        winners: filteredWinners,
        statistics: {
          totalPrizeAmount: filteredWinners.reduce((sum, w) => sum + w.prizeAmount, 0),
          totalWinners: filteredWinners.length,
          gamesPlayed: [...new Set(filteredWinners.map(w => w.gameType))].length
        },
        games: lotteryGames,
        stats: lotteryStats
      };
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `lottery-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Successful",
        description: "Lottery data has been exported successfully.",
      });
    } catch (error) {
      console.error('Lottery export failed:', error);
      toast({
        title: "Export Failed",
        description: "Unable to export lottery data. Please try again.",
        type: "error",
      });
    }
  };

  const getPrizeColor = (amount: number) => {
    if (amount >= 100000) return 'text-red-600';
    if (amount >= 25000) return 'text-orange-600';
    if (amount >= 2500) return 'text-blue-600';
    return 'text-green-600';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'claimed':
        return <Badge variant="default" className="bg-green-600">Claimed</Badge>;
      case 'processing':
        return <Badge variant="secondary" className="bg-blue-600 text-white">Processing</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const actions = (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className="gap-1 text-white border-white/30">
        <Activity className="h-3 w-3" />
        {formatNumber(lotteryStats.totalWinners)} Winners
      </Badge>
      <Button variant="outline" onClick={handleExport} className="gap-2">
        <Download className="h-4 w-4" />
        Export
      </Button>
      <Button onClick={handleAddDraw} className="gap-2">
        <Plus className="h-4 w-4" />
        New Draw
      </Button>
    </div>
  );

  return (
    <DashboardLayout 
      title="Island Luck Lottery" 
      description="Manage lottery winners, payouts, and game performance"
      actions={actions}
    >
      {/* Lottery Dashboard */}
      <LotteryDashboard className="mb-8" />

      {/* Winners Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              Lottery Winners Management
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search winners or ticket..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedGame} onValueChange={setSelectedGame}>
              <SelectTrigger>
                <SelectValue placeholder="All Games" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Games</SelectItem>
                {lotteryGames.map(game => (
                  <SelectItem key={game} value={game}>{game}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="claimed">Claimed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Winners Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Winner</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Game</TableHead>
                  <TableHead>Numbers</TableHead>
                  <TableHead>Prize</TableHead>
                  <TableHead>Draw Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWinners.slice(0, 20).map((winner) => (
                  <TableRow key={winner.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{winner.winnerName}</div>
                        <div className="text-sm text-muted-foreground">{winner.ticketNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {winner.location}
                      </div>
                    </TableCell>
                    <TableCell>{winner.gameType}</TableCell>
                    <TableCell className="font-mono text-sm">{winner.winningNumbers}</TableCell>
                    <TableCell>
                      <div className={`font-bold ${getPrizeColor(winner.prizeAmount)}`}>
                        {formatCurrency(winner.prizeAmount)}
                      </div>
                      {winner.isJackpot && (
                        <Badge variant="destructive" className="text-xs mt-1">Jackpot</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(winner.drawDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(winner.claimStatus)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {Math.min(20, filteredWinners.length)} of {filteredWinners.length} winners
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}