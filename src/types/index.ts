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

export interface JourneyStage {
  id: string;
  name: string;
  description: string;
  type: 'awareness' | 'acquisition' | 'activation' | 'retention' | 'revenue' | 'referral';
  order: number;
  icon: string;
  color: string;
  metrics: {
    totalCustomers: number;
    conversionRate: number;
    averageTime: number;
    dropoffRate: number;
  };
}

export interface JourneyEvent {
  id: string;
  customerId: string;
  stageId: string;
  type: 'email_sent' | 'email_opened' | 'email_clicked' | 'sms_sent' | 'sms_clicked' | 'push_sent' | 'push_opened' | 'registration' | 'first_deposit' | 'first_bet' | 'game_played' | 'withdrawal' | 'support_contact' | 'churn' | 'reactivation';
  channel: 'email' | 'sms' | 'push' | 'web' | 'app' | 'phone' | 'chat';
  timestamp: string;
  metadata: {
    campaignId?: string;
    gameId?: string;
    amount?: number;
    duration?: number;
    source?: string;
    medium?: string;
  };
}

export interface JourneyFlow {
  id: string;
  name: string;
  description: string;
  stages: JourneyStage[];
  events: JourneyEvent[];
  targetSegment: string[];
  isActive: boolean;
  createdDate: string;
  lastModified: string;
  metrics: {
    totalCustomers: number;
    completionRate: number;
    averageJourneyTime: number;
    totalRevenue: number;
    conversionsByStage: Record<string, number>;
  };
}

export interface CustomerJourney {
  customerId: string;
  flowId: string;
  currentStage: string;
  startDate: string;
  completedStages: string[];
  events: JourneyEvent[];
  status: 'active' | 'completed' | 'abandoned' | 'paused';
  progressPercentage: number;
  timeInCurrentStage: number;
  predictedNextAction: string;
  riskScore: number;
}

export interface JourneyAnalytics {
  flowId: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  overview: {
    totalCustomers: number;
    activeJourneys: number;
    completedJourneys: number;
    abandonedJourneys: number;
    averageCompletionTime: number;
    conversionRate: number;
  };
  stageAnalytics: {
    stageId: string;
    stageName: string;
    entrances: number;
    exits: number;
    completions: number;
    averageTime: number;
    conversionRate: number;
    dropoffRate: number;
  }[];
  channelPerformance: {
    channel: string;
    interactions: number;
    conversionRate: number;
    engagementRate: number;
    revenue: number;
  }[];
  cohortAnalysis: {
    cohort: string;
    customers: number;
    completionRate: number;
    averageTime: number;
    revenue: number;
  }[];
}

export interface JourneyTemplate {
  id: string;
  name: string;
  description: string;
  category: 'onboarding' | 'retention' | 'winback' | 'vip' | 'cross-sell' | 'upsell';
  stages: Omit<JourneyStage, 'metrics'>[];
  defaultEvents: Omit<JourneyEvent, 'id' | 'customerId' | 'timestamp'>[];
  estimatedDuration: number;
  targetSegments: string[];
  expectedConversionRate: number;
}

export interface Notification {
  id: string;
  type: 'system' | 'customer' | 'campaign' | 'journey' | 'revenue' | 'alert';
  category: 'info' | 'warning' | 'error' | 'success';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
  actionUrl?: string;
  actionText?: string;
  metadata: {
    customerId?: string;
    campaignId?: string;
    journeyId?: string;
    amount?: number;
    threshold?: number;
    source?: string;
  };
  expiresAt?: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
}

export interface AlertRule {
  id: string;
  name: string;
  description: string;
  type: 'threshold' | 'anomaly' | 'event' | 'schedule';
  isActive: boolean;
  conditions: AlertCondition[];
  actions: AlertAction[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  cooldownPeriod: number;
  targetAudience: string[];
  createdBy: string;
  createdDate: string;
  lastTriggered?: string;
  triggerCount: number;
}

export interface AlertCondition {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'greater_equal' | 'less_equal' | 'contains' | 'not_contains' | 'in' | 'not_in';
  value: string | number | boolean | string[];
  logicalOperator?: 'AND' | 'OR';
}

export interface AlertAction {
  id: string;
  type: 'notification' | 'email' | 'sms' | 'webhook' | 'task';
  target: string;
  template?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  delay?: number;
}

export interface NotificationPreferences {
  userId: string;
  inApp: boolean;
  email: boolean;
  sms: boolean;
  push: boolean;
  categories: {
    system: boolean;
    customer: boolean;
    campaign: boolean;
    journey: boolean;
    revenue: boolean;
    alert: boolean;
  };
  priorities: {
    low: boolean;
    medium: boolean;
    high: boolean;
    critical: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
}

export interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<string, number>;
  byCategory: Record<string, number>;
  byPriority: Record<string, number>;
  recentActivity: {
    timestamp: string;
    count: number;
  }[];
}