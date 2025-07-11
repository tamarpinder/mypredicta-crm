import { Customer, Transaction, Campaign, GameMetrics, DashboardMetrics, AIInsights } from '@/types';

// Helper functions for generating realistic data
const getRandomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
};

const getRandomChoice = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const getWeightedChoice = <T>(items: T[], weights: number[]): T => {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return items[i];
    }
  }
  
  return items[items.length - 1];
};

// First and last names for generating realistic customer names
const firstNames = {
  male: ['James', 'Michael', 'Robert', 'John', 'David', 'William', 'Richard', 'Charles', 'Joseph', 'Thomas', 'Christopher', 'Daniel', 'Paul', 'Mark', 'Donald', 'Steven', 'Kenneth', 'Andrew', 'Joshua', 'Kevin'],
  female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Helen', 'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon', 'Michelle']
};

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Clark'];

const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'New Zealand', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Belgium', 'Switzerland', 'Austria', 'Ireland', 'Portugal', 'Bahamas'];

const cities = ['New York', 'Los Angeles', 'London', 'Toronto', 'Sydney', 'Melbourne', 'Vancouver', 'Berlin', 'Paris', 'Madrid', 'Amsterdam', 'Stockholm', 'Copenhagen', 'Helsinki', 'Brussels', 'Zurich', 'Vienna', 'Dublin', 'Lisbon', 'Nassau'];

const gameNames = {
  sports: ['Premier League', 'NBA', 'NFL', 'Champions League', 'World Cup', 'Tennis Masters', 'Formula 1', 'Cricket World Cup', 'Golf Majors', 'Olympics'],
  casino: ['Blackjack', 'Roulette', 'Poker', 'Baccarat', 'Slots', 'Craps', 'Keno', 'Pai Gow', 'Caribbean Stud', 'Three Card Poker'],
  lottery: ['Powerball', 'Mega Millions', 'EuroMillions', 'Lotto Max', 'SuperEnalotto', 'El Gordo', 'Oz Lotto', 'UK Lotto', 'Irish Lotto', 'Thunderball'],
  'live-games': ['Live Blackjack', 'Live Roulette', 'Live Baccarat', 'Live Poker', 'Live Wheel of Fortune', 'Live Sic Bo', 'Live Dragon Tiger', 'Live Monopoly', 'Live Dream Catcher', 'Live Deal or No Deal']
};

const paymentMethods = ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'Crypto', 'E-Wallet', 'Apple Pay', 'Google Pay'];

// Generate customer data
export const generateCustomers = (count: number): Customer[] => {
  const customers: Customer[] = [];
  const now = new Date();
  const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());

  for (let i = 0; i < count; i++) {
    const gender = getRandomChoice(['male', 'female', 'other'] as const);
    const firstName = gender === 'male' ? getRandomChoice(firstNames.male) : 
                     gender === 'female' ? getRandomChoice(firstNames.female) : 
                     getRandomChoice([...firstNames.male, ...firstNames.female]);
    const lastName = getRandomChoice(lastNames);
    const registrationDate = getRandomDate(twoYearsAgo, now);
    const lastLoginDate = getRandomDate(new Date(registrationDate), now);
    
    // Determine customer segment and VIP status
    const segmentRandom = Math.random();
    let segment: Customer['segment'];
    let isVip = false;
    let vipLevel: Customer['vipLevel'] = null;
    
    if (segmentRandom < 0.05) {
      segment = 'churned';
    } else if (segmentRandom < 0.20) {
      segment = 'at-risk';
    } else if (segmentRandom < 0.28) {
      segment = 'high-value';
      isVip = Math.random() < 0.5;
    } else {
      segment = 'regular';
      isVip = Math.random() < 0.02;
    }
    
    if (isVip) {
      vipLevel = getRandomChoice(['bronze', 'silver', 'gold', 'platinum']);
    }
    
    // Generate financial data based on segment
    let lifetimeValue, totalDeposits, totalWithdrawals, totalBets, totalWins, totalLosses;
    
    switch (segment) {
      case 'high-value':
        lifetimeValue = getRandomFloat(10000, 100000);
        totalDeposits = getRandomFloat(15000, 120000);
        totalWithdrawals = getRandomFloat(8000, 80000);
        totalBets = getRandomFloat(20000, 150000);
        totalWins = getRandomFloat(8000, 70000);
        totalLosses = getRandomFloat(12000, 80000);
        break;
      case 'regular':
        lifetimeValue = getRandomFloat(500, 10000);
        totalDeposits = getRandomFloat(1000, 15000);
        totalWithdrawals = getRandomFloat(300, 8000);
        totalBets = getRandomFloat(1500, 20000);
        totalWins = getRandomFloat(500, 8000);
        totalLosses = getRandomFloat(1000, 12000);
        break;
      case 'at-risk':
        lifetimeValue = getRandomFloat(100, 2000);
        totalDeposits = getRandomFloat(500, 3000);
        totalWithdrawals = getRandomFloat(200, 1500);
        totalBets = getRandomFloat(600, 4000);
        totalWins = getRandomFloat(200, 1500);
        totalLosses = getRandomFloat(400, 2500);
        break;
      default: // churned
        lifetimeValue = getRandomFloat(50, 500);
        totalDeposits = getRandomFloat(100, 1000);
        totalWithdrawals = getRandomFloat(50, 500);
        totalBets = getRandomFloat(150, 1200);
        totalWins = getRandomFloat(50, 400);
        totalLosses = getRandomFloat(100, 800);
    }
    
    const customer: Customer = {
      id: `customer_${i + 1}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      phone: `+1${getRandomBetween(2000000000, 9999999999)}`,
      dateOfBirth: getRandomDate(new Date(1945, 0, 1), new Date(2005, 11, 31)),
      gender,
      country: getRandomChoice(countries),
      city: getRandomChoice(cities),
      registrationDate,
      lastLoginDate,
      isVip,
      vipLevel,
      status: getWeightedChoice(['active', 'inactive', 'suspended', 'banned'], [75, 20, 4, 1]),
      lifetimeValue,
      totalDeposits,
      totalWithdrawals,
      totalBets,
      totalWins,
      totalLosses,
      favoriteGame: getRandomChoice(Object.values(gameNames).flat()),
      churnScore: segment === 'churned' ? getRandomFloat(0.8, 1.0) :
                  segment === 'at-risk' ? getRandomFloat(0.6, 0.8) :
                  segment === 'regular' ? getRandomFloat(0.2, 0.6) :
                  getRandomFloat(0.0, 0.3),
      segment,
      marketingConsent: Math.random() < 0.8,
      communicationPreference: getRandomChoice(['email', 'sms', 'push', 'all'])
    };
    
    customers.push(customer);
  }
  
  return customers;
};

// Generate transaction data
export const generateTransactions = (customers: Customer[], count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const customer = getRandomChoice(customers);
    const gameType = getRandomChoice(Object.keys(gameNames)) as keyof typeof gameNames;
    const gameName = getRandomChoice(gameNames[gameType]);
    const transactionType = getWeightedChoice(['deposit', 'withdrawal', 'bet', 'win', 'bonus'] as const, [20, 15, 40, 20, 5]);
    
    let amount: number;
    switch (transactionType) {
      case 'deposit':
        amount = getRandomFloat(50, 2000);
        break;
      case 'withdrawal':
        amount = getRandomFloat(25, 1500);
        break;
      case 'bet':
        amount = getRandomFloat(1, 500);
        break;
      case 'win':
        amount = getRandomFloat(5, 5000);
        break;
      case 'bonus':
        amount = getRandomFloat(10, 200);
        break;
    }
    
    const transaction: Transaction = {
      id: `transaction_${i + 1}`,
      customerId: customer.id,
      type: transactionType,
      amount,
      currency: 'USD',
      date: getRandomDate(new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()), now),
      status: getWeightedChoice(['completed', 'pending', 'failed', 'cancelled'], [90, 5, 3, 2]),
      gameType,
      gameId: `game_${gameType}_${getRandomBetween(1, 100)}`,
      gameName,
      description: `${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} - ${gameName}`,
      paymentMethod: ['deposit', 'withdrawal'].includes(transactionType) ? getRandomChoice(paymentMethods) : undefined
    };
    
    transactions.push(transaction);
  }
  
  return transactions;
};

// Generate campaign data
export const generateCampaigns = (count: number): Campaign[] => {
  const campaigns: Campaign[] = [];
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
  
  const campaignNames = [
    'Welcome Bonus Campaign',
    'VIP Exclusive Offer',
    'Weekend Sports Special',
    'Casino Night Promo',
    'Loyalty Rewards Program',
    'Fathers Day Special',
    'Summer Sports Betting',
    'New Player Bonus',
    'High Roller Tournament',
    'Monthly Cashback',
    'Mobile App Launch',
    'Live Casino Experience',
    'Lottery Jackpot Alert',
    'Birthday Bonus Campaign',
    'Holiday Season Promo'
  ];
  
  for (let i = 0; i < count; i++) {
    const startDate = getRandomDate(sixMonthsAgo, now);
    const endDate = getRandomDate(new Date(startDate), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
    const totalSent = getRandomBetween(1000, 15000);
    const totalOpened = Math.floor(totalSent * getRandomFloat(0.15, 0.35));
    const totalClicked = Math.floor(totalOpened * getRandomFloat(0.10, 0.25));
    const totalConverted = Math.floor(totalClicked * getRandomFloat(0.05, 0.15));
    const cost = getRandomFloat(500, 5000);
    const revenue = totalConverted * getRandomFloat(50, 500);
    
    const campaign: Campaign = {
      id: `campaign_${i + 1}`,
      name: getRandomChoice(campaignNames),
      type: getRandomChoice(['email', 'sms', 'push', 'social']),
      status: getWeightedChoice(['completed', 'active', 'paused', 'draft'], [60, 25, 10, 5]),
      startDate,
      endDate,
      targetSegment: getRandomChoice([['high-value'], ['regular'], ['at-risk'], ['vip'], ['all']]),
      subject: 'Exclusive Offer Just for You!',
      content: 'Don\'t miss out on our latest promotion...',
      totalSent,
      totalOpened,
      totalClicked,
      totalConverted,
      revenue,
      cost,
      roi: ((revenue - cost) / cost) * 100,
      createdBy: 'Marketing Team',
      createdDate: getRandomDate(sixMonthsAgo, now)
    };
    
    campaigns.push(campaign);
  }
  
  return campaigns;
};

// Generate game metrics
export const generateGameMetrics = (): GameMetrics[] => {
  const metrics: GameMetrics[] = [];
  
  Object.entries(gameNames).forEach(([gameType, names]) => {
    names.forEach((name, index) => {
      const totalPlayers = getRandomBetween(100, 5000);
      const totalBets = getRandomBetween(totalPlayers * 5, totalPlayers * 50);
      const averageBet = getRandomFloat(10, 200);
      const totalRevenue = totalBets * averageBet * getRandomFloat(0.8, 1.2);
      
      const metric: GameMetrics = {
        gameId: `game_${gameType}_${index + 1}`,
        gameName: name,
        gameType: gameType as 'sports' | 'casino' | 'lottery' | 'live-games',
        totalPlayers,
        totalBets,
        totalRevenue,
        averageBet,
        popularityScore: getRandomFloat(60, 100),
        profitMargin: getRandomFloat(5, 25),
        weeklyGrowth: getRandomFloat(-10, 25)
      };
      
      metrics.push(metric);
    });
  });
  
  return metrics;
};

// Generate dashboard metrics
export const generateDashboardMetrics = (customers: Customer[], transactions: Transaction[]): DashboardMetrics => {
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const newCustomers = customers.filter(c => {
    const regDate = new Date(c.registrationDate);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return regDate >= thirtyDaysAgo;
  }).length;
  
  const totalRevenue = transactions
    .filter(t => t.type === 'bet' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const monthlyRevenue = transactions
    .filter(t => {
      const transDate = new Date(t.date);
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      return transDate >= thirtyDaysAgo && t.type === 'bet' && t.status === 'completed';
    })
    .reduce((sum, t) => sum + t.amount, 0);
  
  const weeklyRevenue = transactions
    .filter(t => {
      const transDate = new Date(t.date);
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return transDate >= sevenDaysAgo && t.type === 'bet' && t.status === 'completed';
    })
    .reduce((sum, t) => sum + t.amount, 0);
  
  const dailyRevenue = transactions
    .filter(t => {
      const transDate = new Date(t.date);
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return transDate >= oneDayAgo && t.type === 'bet' && t.status === 'completed';
    })
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalDeposits = transactions
    .filter(t => t.type === 'deposit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalWithdrawals = transactions
    .filter(t => t.type === 'withdrawal' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalBets = transactions
    .filter(t => t.type === 'bet' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return {
    totalCustomers: customers.length,
    activeCustomers,
    newCustomers,
    totalRevenue,
    monthlyRevenue,
    weeklyRevenue,
    dailyRevenue,
    totalDeposits,
    totalWithdrawals,
    totalBets,
    averageCustomerValue: customers.reduce((sum, c) => sum + c.lifetimeValue, 0) / customers.length,
    churnRate: (customers.filter(c => c.segment === 'churned').length / customers.length) * 100,
    conversionRate: getRandomFloat(2, 8),
    customerSatisfactionScore: getRandomFloat(75, 95)
  };
};

// Generate AI insights
export const generateAIInsights = (customers: Customer[]): AIInsights => {
  const churnPrediction = customers
    .filter(c => c.churnScore > 0.6)
    .slice(0, 50)
    .map(c => ({
      customerId: c.id,
      riskScore: c.churnScore,
      factors: getRandomChoice([
        ['Decreased betting frequency', 'No recent deposits'],
        ['Long time since last login', 'Low engagement'],
        ['Negative balance trend', 'Reduced session duration'],
        ['Competition activity', 'Changed betting patterns']
      ]),
      recommendation: getRandomChoice([
        'Send personalized bonus offer',
        'Trigger retention campaign',
        'Assign to VIP manager',
        'Offer cashback incentive'
      ])
    }));
  
  const lifetimeValuePrediction = customers
    .filter(c => c.segment === 'high-value' || c.segment === 'regular')
    .slice(0, 30)
    .map(c => ({
      customerId: c.id,
      predictedValue: c.lifetimeValue * getRandomFloat(1.2, 2.5),
      confidence: getRandomFloat(75, 95),
      timeframe: getRandomChoice(['6 months', '12 months', '24 months'])
    }));
  
  const gameRecommendations = customers
    .filter(c => c.status === 'active')
    .slice(0, 100)
    .map(c => ({
      customerId: c.id,
      recommendedGames: getRandomChoice([
        ['Live Blackjack', 'Roulette'],
        ['Sports Betting', 'Tennis Masters'],
        ['Slots', 'Poker'],
        ['Lottery', 'Scratch Cards']
      ]),
      reason: getRandomChoice([
        'Based on playing history',
        'Similar players enjoyed',
        'Trending in your region',
        'Matches your preferences'
      ]),
      expectedEngagement: getRandomFloat(60, 95)
    }));
  
  return {
    churnPrediction,
    lifetimeValuePrediction,
    gameRecommendations,
    marketingInsights: {
      bestTimeToSend: getRandomChoice(['10:00 AM', '2:00 PM', '7:00 PM', '9:00 PM']),
      optimalFrequency: getRandomChoice(['Daily', 'Weekly', 'Bi-weekly', 'Monthly']),
      highPerformingSegments: ['high-value', 'vip', 'sports-bettors'],
      contentPreferences: {
        'bonuses': 85,
        'sports': 72,
        'casino': 68,
        'lottery': 45,
        'tournaments': 63
      }
    }
  };
};