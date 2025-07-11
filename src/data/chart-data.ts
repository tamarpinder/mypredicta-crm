// Mock data for charts and visualizations
export const revenueData = [
  { date: '2024-01-01', revenue: 145000, deposits: 180000, withdrawals: 95000, bets: 220000 },
  { date: '2024-01-02', revenue: 152000, deposits: 190000, withdrawals: 88000, bets: 235000 },
  { date: '2024-01-03', revenue: 138000, deposits: 175000, withdrawals: 102000, bets: 210000 },
  { date: '2024-01-04', revenue: 165000, deposits: 200000, withdrawals: 110000, bets: 250000 },
  { date: '2024-01-05', revenue: 158000, deposits: 195000, withdrawals: 105000, bets: 240000 },
  { date: '2024-01-06', revenue: 172000, deposits: 210000, withdrawals: 98000, bets: 260000 },
  { date: '2024-01-07', revenue: 145000, deposits: 185000, withdrawals: 115000, bets: 225000 },
  { date: '2024-01-08', revenue: 168000, deposits: 205000, withdrawals: 92000, bets: 255000 },
  { date: '2024-01-09', revenue: 155000, deposits: 192000, withdrawals: 108000, bets: 238000 },
  { date: '2024-01-10', revenue: 162000, deposits: 198000, withdrawals: 96000, bets: 245000 },
  { date: '2024-01-11', revenue: 148000, deposits: 188000, withdrawals: 112000, bets: 230000 },
  { date: '2024-01-12', revenue: 175000, deposits: 215000, withdrawals: 89000, bets: 265000 },
  { date: '2024-01-13', revenue: 169000, deposits: 208000, withdrawals: 104000, bets: 258000 },
  { date: '2024-01-14', revenue: 156000, deposits: 193000, withdrawals: 99000, bets: 242000 },
];

export const customerActivityData = [
  { period: 'Jan 1-7', active: 18500, new: 1200, churned: 450, returning: 850 },
  { period: 'Jan 8-14', active: 19200, new: 1350, churned: 380, returning: 920 },
  { period: 'Jan 15-21', active: 18800, new: 1100, churned: 520, returning: 780 },
  { period: 'Jan 22-28', active: 19500, new: 1450, churned: 320, returning: 1050 },
  { period: 'Jan 29-Feb 4', active: 20100, new: 1600, churned: 280, returning: 1150 },
  { period: 'Feb 5-11', active: 19800, new: 1300, churned: 410, returning: 890 },
  { period: 'Feb 12-18', active: 20300, new: 1550, churned: 350, returning: 1020 },
];

export const gamePerformanceData = [
  { name: 'Sports Betting', revenue: 2640000, percentage: 60, players: 15000, color: '#2563EB' },
  { name: 'Casino Games', revenue: 1100000, percentage: 25, players: 8500, color: '#DC2626' },
  { name: 'Lottery', revenue: 440000, percentage: 10, players: 12000, color: '#059669' },
  { name: 'Live Games', revenue: 220000, percentage: 5, players: 3200, color: '#7C3AED' },
];

export const customerSegmentData = [
  { segment: 'VIP', count: 500, avgValue: 45000, churnRisk: 0.12, color: '#F59E0B' },
  { segment: 'High-Value', count: 2000, avgValue: 12000, churnRisk: 0.18, color: '#8B5CF6' },
  { segment: 'Regular', count: 17500, avgValue: 2500, churnRisk: 0.35, color: '#059669' },
  { segment: 'At-Risk', count: 3750, avgValue: 850, churnRisk: 0.75, color: '#EF4444' },
  { segment: 'Churned', count: 1250, avgValue: 320, churnRisk: 0.95, color: '#6B7280' },
];

export const monthlyRevenueData = [
  { month: 'Jul 2023', revenue: 4100000, growth: 8.5 },
  { month: 'Aug 2023', revenue: 4250000, growth: 3.7 },
  { month: 'Sep 2023', revenue: 4180000, growth: -1.6 },
  { month: 'Oct 2023', revenue: 4350000, growth: 4.1 },
  { month: 'Nov 2023', revenue: 4280000, growth: -1.6 },
  { month: 'Dec 2023', revenue: 4650000, growth: 8.6 },
  { month: 'Jan 2024', revenue: 4420000, growth: -4.9 },
  { month: 'Feb 2024', revenue: 4580000, growth: 3.6 },
  { month: 'Mar 2024', revenue: 4720000, growth: 3.1 },
  { month: 'Apr 2024', revenue: 4380000, growth: -7.2 },
  { month: 'May 2024', revenue: 4695000, growth: 7.2 },
  { month: 'Jun 2024', revenue: 4820000, growth: 2.7 },
];

export const gameTypeTrendsData = [
  { date: '2024-01-01', sports: 89000, casino: 45000, lottery: 18000, live: 12000 },
  { date: '2024-01-02', sports: 92000, casino: 48000, lottery: 19000, live: 13000 },
  { date: '2024-01-03', sports: 85000, casino: 42000, lottery: 17000, live: 11000 },
  { date: '2024-01-04', sports: 98000, casino: 52000, lottery: 21000, live: 15000 },
  { date: '2024-01-05', sports: 94000, casino: 49000, lottery: 20000, live: 14000 },
  { date: '2024-01-06', sports: 102000, casino: 55000, lottery: 22000, live: 16000 },
  { date: '2024-01-07', sports: 88000, casino: 46000, lottery: 18000, live: 12000 },
  { date: '2024-01-08', sports: 100000, casino: 53000, lottery: 21000, live: 15000 },
  { date: '2024-01-09', sports: 96000, casino: 50000, lottery: 20000, live: 14000 },
  { date: '2024-01-10', sports: 99000, casino: 51000, lottery: 21000, live: 15000 },
];

export const churnPredictionData = [
  { risk: 'Low (0-30%)', customers: 18500, ltv: 4200, color: '#10B981' },
  { risk: 'Medium (31-60%)', customers: 4200, ltv: 2800, color: '#F59E0B' },
  { risk: 'High (61-80%)', customers: 1800, ltv: 1200, color: '#EF4444' },
  { risk: 'Critical (81-100%)', customers: 500, ltv: 450, color: '#7F1D1D' },
];

// Export formatting functions from utils/format
export { formatCurrency, formatNumber, formatPercentage } from '@/utils/format';