// Dynamic revenue generator for realistic financial data
// Target: ~$53M annual revenue with natural variations

export function generateAnnualRevenue(): number {
  // Base annual revenue: $53M with ±15% variance
  const baseRevenue = 53000000;
  const variance = 0.15;
  const min = baseRevenue * (1 - variance);
  const max = baseRevenue * (1 + variance);
  
  return Math.floor(Math.random() * (max - min) + min);
}

export function generateDailyRevenue(annualRevenue: number = 53000000): number {
  // Daily revenue based on annual (with daily variance)
  const dailyBase = annualRevenue / 365;
  const dailyVariance = 0.25; // Higher daily variance for realism
  
  return Math.floor(dailyBase * (1 + (Math.random() - 0.5) * dailyVariance));
}

export function generateMonthlyRevenue(annualRevenue: number = 53000000): number {
  const monthlyBase = annualRevenue / 12;
  const monthlyVariance = 0.1;
  
  return Math.floor(monthlyBase * (1 + (Math.random() - 0.5) * monthlyVariance));
}

export function generateCustomerDeposit(): number {
  // Realistic deposit amounts with weighted distribution
  const weights = [
    { min: 100, max: 500, weight: 0.4 },      // 40% small deposits
    { min: 500, max: 2000, weight: 0.35 },    // 35% medium deposits
    { min: 2000, max: 10000, weight: 0.2 },   // 20% large deposits
    { min: 10000, max: 50000, weight: 0.05 }  // 5% VIP deposits
  ];
  
  const random = Math.random();
  let cumulativeWeight = 0;
  
  for (const range of weights) {
    cumulativeWeight += range.weight;
    if (random < cumulativeWeight) {
      return Math.floor(Math.random() * (range.max - range.min) + range.min);
    }
  }
  
  return weights[0].min;
}

export function generateWithdrawal(): number {
  // Withdrawals typically 60-80% of deposits
  const deposit = generateCustomerDeposit();
  const withdrawalRate = 0.6 + Math.random() * 0.2;
  return Math.floor(deposit * withdrawalRate);
}

export function generateActiveCustomers(baseCount: number = 18500): number {
  // Active customers with daily variance
  const variance = 0.08;
  return Math.floor(baseCount * (1 + (Math.random() - 0.5) * variance));
}

export function generateConversionRate(): number {
  // Conversion rate between 2.5% and 4.5%
  return +(2.5 + Math.random() * 2).toFixed(1);
}

export function generateDashboardMetrics() {
  const annualRevenue = generateAnnualRevenue();
  const dailyRevenue = generateDailyRevenue(annualRevenue);
  const activeCustomers = generateActiveCustomers();
  const conversionRate = generateConversionRate();
  
  return {
    totalRevenue: annualRevenue,
    activeCustomers,
    dailyRevenue,
    conversionRate
  };
}

export function generateRevenueData(days: number = 14) {
  const data = [];
  const baseDaily = generateDailyRevenue();
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    
    const revenue = Math.floor(baseDaily * (0.8 + Math.random() * 0.4));
    const deposits = Math.floor(revenue * (1.2 + Math.random() * 0.3));
    const withdrawals = Math.floor(deposits * (0.5 + Math.random() * 0.3));
    const bets = Math.floor(deposits * (1.3 + Math.random() * 0.4));
    
    data.push({
      date: date.toISOString().split('T')[0],
      revenue,
      deposits,
      withdrawals,
      bets
    });
  }
  
  return data;
}

export function generateMonthlyRevenueData() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const annualRevenue = generateAnnualRevenue();
  const monthlyBase = annualRevenue / 12;
  
  return months.map((month, index) => {
    // Add seasonal variation (higher in winter months for Bahamas tourism)
    const seasonalFactor = index >= 10 || index <= 2 ? 1.15 : 0.95;
    const revenue = Math.floor(monthlyBase * seasonalFactor * (0.9 + Math.random() * 0.2));
    
    return {
      month,
      revenue,
      deposits: Math.floor(revenue * 1.25),
      withdrawals: Math.floor(revenue * 0.75),
      netGaming: revenue
    };
  });
}