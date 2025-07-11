import { Customer, Transaction, Campaign, GameMetrics, DashboardMetrics, AIInsights } from '@/types';
import { generateDashboardMetrics } from '@/utils/revenue-generator';

export const sampleCustomers: Customer[] = [
  {
    id: "customer_1",
    firstName: "James",
    lastName: "Wilson",
    email: "james.wilson@email.com",
    phone: "+12345678901",
    dateOfBirth: "1985-03-15T00:00:00.000Z",
    gender: "male",
    country: "United States",
    city: "New York",
    registrationDate: "2023-01-15T00:00:00.000Z",
    lastLoginDate: "2024-01-10T00:00:00.000Z",
    lastActivity: "2024-01-10T00:00:00.000Z",
    isVip: true,
    vipLevel: "gold",
    status: "active",
    lifetimeValue: 45000,
    totalDeposits: 65000,
    totalWithdrawals: 35000,
    totalBets: 85000,
    totalWins: 42000,
    totalLosses: 43000,
    favoriteGame: "Blackjack",
    churnScore: 0.15,
    segment: "high-value",
    marketingConsent: true,
    communicationPreference: "email"
  },
  {
    id: "customer_2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+12345678902",
    dateOfBirth: "1990-07-22T00:00:00.000Z",
    gender: "female",
    country: "Canada",
    city: "Toronto",
    registrationDate: "2023-06-20T00:00:00.000Z",
    lastLoginDate: "2024-01-09T00:00:00.000Z",
    lastActivity: "2024-01-09T00:00:00.000Z",
    isVip: false,
    vipLevel: null,
    status: "active",
    lifetimeValue: 2500,
    totalDeposits: 3500,
    totalWithdrawals: 1800,
    totalBets: 4200,
    totalWins: 1900,
    totalLosses: 2300,
    favoriteGame: "Sports Betting",
    churnScore: 0.35,
    segment: "regular",
    marketingConsent: true,
    communicationPreference: "sms"
  },
  {
    id: "customer_3",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@email.com",
    phone: "+12345678903",
    dateOfBirth: "1978-12-05T00:00:00.000Z",
    gender: "male",
    country: "United Kingdom",
    city: "London",
    registrationDate: "2022-11-10T00:00:00.000Z",
    lastLoginDate: "2023-12-15T00:00:00.000Z",
    lastActivity: "2023-12-15T00:00:00.000Z",
    isVip: true,
    vipLevel: "platinum",
    status: "active",
    lifetimeValue: 85000,
    totalDeposits: 125000,
    totalWithdrawals: 78000,
    totalBets: 165000,
    totalWins: 82000,
    totalLosses: 83000,
    favoriteGame: "Live Roulette",
    churnScore: 0.08,
    segment: "high-value",
    marketingConsent: true,
    communicationPreference: "all"
  },
  {
    id: "customer_4",
    firstName: "Emma",
    lastName: "Davis",
    email: "emma.davis@email.com",
    phone: "+12345678904",
    dateOfBirth: "1995-04-18T00:00:00.000Z",
    gender: "female",
    country: "Australia",
    city: "Sydney",
    registrationDate: "2023-09-05T00:00:00.000Z",
    lastLoginDate: "2023-11-20T00:00:00.000Z",
    lastActivity: "2023-11-20T00:00:00.000Z",
    isVip: false,
    vipLevel: null,
    status: "inactive",
    lifetimeValue: 850,
    totalDeposits: 1200,
    totalWithdrawals: 400,
    totalBets: 1500,
    totalWins: 650,
    totalLosses: 850,
    favoriteGame: "Slots",
    churnScore: 0.75,
    segment: "at-risk",
    marketingConsent: false,
    communicationPreference: "email"
  },
  {
    id: "customer_5",
    firstName: "David",
    lastName: "Miller",
    email: "david.miller@email.com",
    phone: "+12345678905",
    dateOfBirth: "1988-09-12T00:00:00.000Z",
    gender: "male",
    country: "Germany",
    city: "Berlin",
    registrationDate: "2023-03-25T00:00:00.000Z",
    lastLoginDate: "2024-01-08T00:00:00.000Z",
    lastActivity: "2024-01-08T00:00:00.000Z",
    isVip: false,
    vipLevel: null,
    status: "active",
    lifetimeValue: 5200,
    totalDeposits: 7500,
    totalWithdrawals: 3200,
    totalBets: 9800,
    totalWins: 4300,
    totalLosses: 5500,
    favoriteGame: "Poker",
    churnScore: 0.28,
    segment: "regular",
    marketingConsent: true,
    communicationPreference: "push"
  }
];

export const sampleTransactions: Transaction[] = [
  {
    id: "transaction_1",
    customerId: "customer_1",
    type: "deposit",
    amount: 1500,
    currency: "USD",
    date: "2024-01-10T10:30:00.000Z",
    status: "completed",
    gameType: "casino",
    description: "Deposit - Credit Card",
    paymentMethod: "Credit Card"
  },
  {
    id: "transaction_2",
    customerId: "customer_1",
    type: "bet",
    amount: 250,
    currency: "USD",
    date: "2024-01-10T11:15:00.000Z",
    status: "completed",
    gameType: "casino",
    gameId: "game_casino_1",
    gameName: "Blackjack",
    description: "Bet - Blackjack"
  },
  {
    id: "transaction_3",
    customerId: "customer_2",
    type: "bet",
    amount: 50,
    currency: "USD",
    date: "2024-01-09T14:20:00.000Z",
    status: "completed",
    gameType: "sports",
    gameId: "game_sports_1",
    gameName: "NBA",
    description: "Bet - NBA"
  },
  {
    id: "transaction_4",
    customerId: "customer_3",
    type: "win",
    amount: 2800,
    currency: "USD",
    date: "2024-01-09T20:45:00.000Z",
    status: "completed",
    gameType: "live-games",
    gameId: "game_live_1",
    gameName: "Live Roulette",
    description: "Win - Live Roulette"
  },
  {
    id: "transaction_5",
    customerId: "customer_4",
    type: "deposit",
    amount: 100,
    currency: "USD",
    date: "2023-11-20T09:00:00.000Z",
    status: "completed",
    gameType: "casino",
    description: "Deposit - PayPal",
    paymentMethod: "PayPal"
  }
];

export const sampleCampaigns: Campaign[] = [
  {
    id: "campaign_1",
    name: "Welcome Bonus Campaign",
    type: "email",
    status: "active",
    startDate: "2024-01-01T00:00:00.000Z",
    endDate: "2024-01-31T23:59:59.000Z",
    targetSegment: ["all"],
    subject: "Welcome to Predicta - Get Your 100% Bonus!",
    content: "Join us and get a 100% welcome bonus on your first deposit!",
    totalSent: 5000,
    totalOpened: 1500,
    totalClicked: 450,
    totalConverted: 180,
    revenue: 25000,
    cost: 2500,
    roi: 900,
    createdBy: "Marketing Team",
    createdDate: "2023-12-28T00:00:00.000Z"
  },
  {
    id: "campaign_2",
    name: "VIP Exclusive Offer",
    type: "sms",
    status: "completed",
    startDate: "2023-12-15T00:00:00.000Z",
    endDate: "2023-12-31T23:59:59.000Z",
    targetSegment: ["high-value"],
    subject: "VIP Exclusive: 50% Cashback Weekend",
    content: "Exclusive VIP offer: Get 50% cashback on all losses this weekend!",
    totalSent: 250,
    totalOpened: 200,
    totalClicked: 120,
    totalConverted: 85,
    revenue: 42000,
    cost: 1000,
    roi: 4100,
    createdBy: "VIP Team",
    createdDate: "2023-12-10T00:00:00.000Z"
  },
  {
    id: "campaign_3",
    name: "Sports Betting Special",
    type: "push",
    status: "active",
    startDate: "2024-01-05T00:00:00.000Z",
    endDate: "2024-01-20T23:59:59.000Z",
    targetSegment: ["regular"],
    subject: "Free Bet on Today's Big Game!",
    content: "Get a free $25 bet on today's biggest sporting event!",
    totalSent: 8000,
    totalOpened: 3200,
    totalClicked: 960,
    totalConverted: 320,
    revenue: 15000,
    cost: 1500,
    roi: 900,
    createdBy: "Sports Team",
    createdDate: "2024-01-02T00:00:00.000Z"
  }
];

export const sampleGameMetrics: GameMetrics[] = [
  {
    gameId: "game_sports_1",
    gameName: "NBA",
    gameType: "sports",
    totalPlayers: 2500,
    totalBets: 15000,
    totalRevenue: 185000,
    averageBet: 75,
    popularityScore: 95,
    profitMargin: 8.5,
    weeklyGrowth: 12.3
  },
  {
    gameId: "game_casino_1",
    gameName: "Blackjack",
    gameType: "casino",
    totalPlayers: 1800,
    totalBets: 12000,
    totalRevenue: 145000,
    averageBet: 85,
    popularityScore: 88,
    profitMargin: 12.2,
    weeklyGrowth: 8.7
  },
  {
    gameId: "game_live_1",
    gameName: "Live Roulette",
    gameType: "live-games",
    totalPlayers: 950,
    totalBets: 8500,
    totalRevenue: 125000,
    averageBet: 95,
    popularityScore: 82,
    profitMargin: 15.8,
    weeklyGrowth: 15.2
  },
  {
    gameId: "game_lottery_1",
    gameName: "Powerball",
    gameType: "lottery",
    totalPlayers: 3200,
    totalBets: 6500,
    totalRevenue: 95000,
    averageBet: 25,
    popularityScore: 76,
    profitMargin: 22.5,
    weeklyGrowth: 5.8
  }
];

// Generate dynamic metrics on each import
const generatedMetrics = generateDashboardMetrics();

export const sampleDashboardMetrics: DashboardMetrics = {
  totalCustomers: 25000,
  activeCustomers: generatedMetrics.activeCustomers,
  newCustomers: Math.floor(25000 * 0.05), // 5% are new
  totalRevenue: generatedMetrics.totalRevenue,
  monthlyRevenue: Math.floor(generatedMetrics.totalRevenue / 12),
  weeklyRevenue: Math.floor(generatedMetrics.totalRevenue / 52),
  dailyRevenue: generatedMetrics.dailyRevenue,
  totalDeposits: Math.floor(generatedMetrics.totalRevenue * 1.5),
  totalWithdrawals: Math.floor(generatedMetrics.totalRevenue * 0.79),
  totalBets: Math.floor(generatedMetrics.totalRevenue * 2.285),
  averageCustomerValue: Math.floor(generatedMetrics.totalRevenue / 25000),
  churnRate: 6.8,
  conversionRate: generatedMetrics.conversionRate,
  customerSatisfactionScore: 89.2
};

export const sampleAIInsights: AIInsights = {
  churnPrediction: [
    {
      customerId: "customer_4",
      riskScore: 0.75,
      factors: ["Decreased betting frequency", "No recent deposits"],
      recommendation: "Send personalized bonus offer"
    },
    {
      customerId: "customer_6",
      riskScore: 0.68,
      factors: ["Long time since last login", "Low engagement"],
      recommendation: "Trigger retention campaign"
    },
    {
      customerId: "customer_8",
      riskScore: 0.72,
      factors: ["Negative balance trend", "Reduced session duration"],
      recommendation: "Assign to VIP manager"
    }
  ],
  lifetimeValuePrediction: [
    {
      customerId: "customer_1",
      predictedValue: 85000,
      confidence: 92,
      timeframe: "12 months"
    },
    {
      customerId: "customer_3",
      predictedValue: 125000,
      confidence: 88,
      timeframe: "12 months"
    },
    {
      customerId: "customer_5",
      predictedValue: 12000,
      confidence: 78,
      timeframe: "6 months"
    }
  ],
  gameRecommendations: [
    {
      customerId: "customer_2",
      recommendedGames: ["Live Blackjack", "Poker"],
      reason: "Based on playing history",
      expectedEngagement: 85
    },
    {
      customerId: "customer_5",
      recommendedGames: ["Sports Betting", "Tennis Masters"],
      reason: "Similar players enjoyed",
      expectedEngagement: 78
    }
  ],
  marketingInsights: {
    bestTimeToSend: "7:00 PM",
    optimalFrequency: "Weekly",
    highPerformingSegments: ["high-value", "vip", "sports-bettors"],
    contentPreferences: {
      "bonuses": 85,
      "sports": 72,
      "casino": 68,
      "lottery": 45,
      "tournaments": 63
    }
  }
};