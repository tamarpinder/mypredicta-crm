export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  city: string;
  registrationDate: string;
  lastLoginDate: string;
  lastActivity?: string;
  isVip: boolean;
  vipLevel: 'bronze' | 'silver' | 'gold' | 'platinum' | null;
  status: 'active' | 'inactive' | 'suspended' | 'banned';
  lifetimeValue: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalBets: number;
  totalWins: number;
  totalLosses: number;
  favoriteGame: string;
  churnScore: number;
  segment: 'high-value' | 'regular' | 'at-risk' | 'churned';
  marketingConsent: boolean;
  communicationPreference: 'email' | 'sms' | 'push' | 'all';
}

export interface Transaction {
  id: string;
  customerId: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win' | 'bonus';
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed' | 'cancelled';
  gameType: 'sports' | 'casino' | 'lottery' | 'live-games';
  gameId?: string;
  gameName?: string;
  description: string;
  paymentMethod?: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push' | 'social';
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  targetSegment: string[];
  subject: string;
  content: string;
  totalSent: number;
  totalOpened: number;
  totalClicked: number;
  totalConverted: number;
  revenue: number;
  cost: number;
  roi: number;
  createdBy: string;
  createdDate: string;
}

export interface GameMetrics {
  gameId: string;
  gameName: string;
  gameType: 'sports' | 'casino' | 'lottery' | 'live-games';
  totalPlayers: number;
  totalBets: number;
  totalRevenue: number;
  averageBet: number;
  popularityScore: number;
  profitMargin: number;
  weeklyGrowth: number;
}

export interface DashboardMetrics {
  totalCustomers: number;
  activeCustomers: number;
  newCustomers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  weeklyRevenue: number;
  dailyRevenue: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalBets: number;
  averageCustomerValue: number;
  churnRate: number;
  conversionRate: number;
  customerSatisfactionScore: number;
}

export interface AIInsights {
  churnPrediction: {
    customerId: string;
    riskScore: number;
    factors: string[];
    recommendation: string;
  }[];
  lifetimeValuePrediction: {
    customerId: string;
    predictedValue: number;
    confidence: number;
    timeframe: string;
  }[];
  gameRecommendations: {
    customerId: string;
    recommendedGames: string[];
    reason: string;
    expectedEngagement: number;
  }[];
  marketingInsights: {
    bestTimeToSend: string;
    optimalFrequency: string;
    highPerformingSegments: string[];
    contentPreferences: Record<string, number>;
  };
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
  children?: NavigationItem[];
}