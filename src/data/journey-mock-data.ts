import { 
  JourneyStage, 
  JourneyEvent, 
  JourneyFlow, 
  CustomerJourney, 
  JourneyAnalytics, 
  JourneyTemplate 
} from '@/types';

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

// Journey Stages
export const journeyStages: JourneyStage[] = [
  {
    id: 'awareness',
    name: 'Awareness',
    description: 'Customer becomes aware of our platform',
    type: 'awareness',
    order: 1,
    icon: 'Eye',
    color: 'bg-blue-100 text-blue-800',
    metrics: {
      totalCustomers: 45000,
      conversionRate: 8.5,
      averageTime: 2.5,
      dropoffRate: 91.5
    }
  },
  {
    id: 'acquisition',
    name: 'Acquisition',
    description: 'Customer registers and creates account',
    type: 'acquisition',
    order: 2,
    icon: 'UserPlus',
    color: 'bg-green-100 text-green-800',
    metrics: {
      totalCustomers: 3825,
      conversionRate: 65.2,
      averageTime: 1.2,
      dropoffRate: 34.8
    }
  },
  {
    id: 'activation',
    name: 'Activation',
    description: 'Customer makes first deposit and first bet',
    type: 'activation',
    order: 3,
    icon: 'Zap',
    color: 'bg-yellow-100 text-yellow-800',
    metrics: {
      totalCustomers: 2494,
      conversionRate: 78.3,
      averageTime: 0.8,
      dropoffRate: 21.7
    }
  },
  {
    id: 'retention',
    name: 'Retention',
    description: 'Customer remains active and engaged',
    type: 'retention',
    order: 4,
    icon: 'Heart',
    color: 'bg-purple-100 text-purple-800',
    metrics: {
      totalCustomers: 1953,
      conversionRate: 85.7,
      averageTime: 45.3,
      dropoffRate: 14.3
    }
  },
  {
    id: 'revenue',
    name: 'Revenue',
    description: 'Customer generates significant revenue',
    type: 'revenue',
    order: 5,
    icon: 'DollarSign',
    color: 'bg-orange-100 text-orange-800',
    metrics: {
      totalCustomers: 1674,
      conversionRate: 92.1,
      averageTime: 120.5,
      dropoffRate: 7.9
    }
  },
  {
    id: 'referral',
    name: 'Referral',
    description: 'Customer refers friends and becomes advocate',
    type: 'referral',
    order: 6,
    icon: 'Users',
    color: 'bg-pink-100 text-pink-800',
    metrics: {
      totalCustomers: 1542,
      conversionRate: 18.5,
      averageTime: 180.2,
      dropoffRate: 81.5
    }
  }
];

// Journey Templates
export const journeyTemplates: JourneyTemplate[] = [
  {
    id: 'onboarding_flow',
    name: 'New Customer Onboarding',
    description: 'Complete onboarding journey for new customers',
    category: 'onboarding',
    stages: [
      {
        id: 'welcome',
        name: 'Welcome',
        description: 'Welcome message and account setup',
        type: 'acquisition',
        order: 1,
        icon: 'UserPlus',
        color: 'bg-green-100 text-green-800'
      },
      {
        id: 'verification',
        name: 'Account Verification',
        description: 'Email and identity verification',
        type: 'acquisition',
        order: 2,
        icon: 'Shield',
        color: 'bg-blue-100 text-blue-800'
      },
      {
        id: 'first_deposit',
        name: 'First Deposit',
        description: 'Encourage first deposit with bonus',
        type: 'activation',
        order: 3,
        icon: 'CreditCard',
        color: 'bg-yellow-100 text-yellow-800'
      },
      {
        id: 'first_bet',
        name: 'First Bet',
        description: 'Guide through first betting experience',
        type: 'activation',
        order: 4,
        icon: 'Zap',
        color: 'bg-orange-100 text-orange-800'
      }
    ],
    defaultEvents: [
      {
        stageId: 'welcome',
        type: 'email_sent',
        channel: 'email',
        metadata: { campaignId: 'welcome_email' }
      },
      {
        stageId: 'verification',
        type: 'email_sent',
        channel: 'email',
        metadata: { campaignId: 'verification_email' }
      },
      {
        stageId: 'first_deposit',
        type: 'push_sent',
        channel: 'push',
        metadata: { campaignId: 'first_deposit_bonus' }
      }
    ],
    estimatedDuration: 7,
    targetSegments: ['new-users'],
    expectedConversionRate: 65.2
  },
  {
    id: 'retention_flow',
    name: 'Customer Retention Campaign',
    description: 'Re-engage inactive customers',
    category: 'retention',
    stages: [
      {
        id: 'reminder',
        name: 'Activity Reminder',
        description: 'Remind customer of their account',
        type: 'retention',
        order: 1,
        icon: 'Bell',
        color: 'bg-blue-100 text-blue-800'
      },
      {
        id: 'incentive',
        name: 'Special Offer',
        description: 'Provide special offer to return',
        type: 'retention',
        order: 2,
        icon: 'Gift',
        color: 'bg-green-100 text-green-800'
      },
      {
        id: 'reactivation',
        name: 'Reactivation',
        description: 'Customer returns and plays',
        type: 'retention',
        order: 3,
        icon: 'RefreshCw',
        color: 'bg-purple-100 text-purple-800'
      }
    ],
    defaultEvents: [
      {
        stageId: 'reminder',
        type: 'email_sent',
        channel: 'email',
        metadata: { campaignId: 'retention_reminder' }
      },
      {
        stageId: 'incentive',
        type: 'sms_sent',
        channel: 'sms',
        metadata: { campaignId: 'comeback_bonus' }
      }
    ],
    estimatedDuration: 14,
    targetSegments: ['at-risk', 'inactive'],
    expectedConversionRate: 25.8
  },
  {
    id: 'vip_upgrade',
    name: 'VIP Upgrade Journey',
    description: 'Convert high-value customers to VIP',
    category: 'vip',
    stages: [
      {
        id: 'qualification',
        name: 'VIP Qualification',
        description: 'Customer qualifies for VIP program',
        type: 'revenue',
        order: 1,
        icon: 'Crown',
        color: 'bg-yellow-100 text-yellow-800'
      },
      {
        id: 'invitation',
        name: 'VIP Invitation',
        description: 'Send VIP program invitation',
        type: 'revenue',
        order: 2,
        icon: 'Mail',
        color: 'bg-purple-100 text-purple-800'
      },
      {
        id: 'enrollment',
        name: 'VIP Enrollment',
        description: 'Customer enrolls in VIP program',
        type: 'revenue',
        order: 3,
        icon: 'Star',
        color: 'bg-orange-100 text-orange-800'
      }
    ],
    defaultEvents: [
      {
        stageId: 'invitation',
        type: 'email_sent',
        channel: 'email',
        metadata: { campaignId: 'vip_invitation' }
      },
      {
        stageId: 'enrollment',
        type: 'push_sent',
        channel: 'push',
        metadata: { campaignId: 'vip_welcome' }
      }
    ],
    estimatedDuration: 5,
    targetSegments: ['high-value'],
    expectedConversionRate: 42.3
  }
];

// Generate mock journey events
export const generateJourneyEvents = (customerId: string, flowId: string, count: number): JourneyEvent[] => {
  const events: JourneyEvent[] = [];
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const eventTypes = [
    'email_sent', 'email_opened', 'email_clicked', 'sms_sent', 'sms_clicked',
    'push_sent', 'push_opened', 'registration', 'first_deposit', 'first_bet',
    'game_played', 'withdrawal', 'support_contact'
  ];
  
  const channels = ['email', 'sms', 'push', 'web', 'app', 'phone', 'chat'];
  
  for (let i = 0; i < count; i++) {
    const stageId = getRandomChoice(journeyStages).id;
    const eventType = getRandomChoice(eventTypes);
    const channel = getRandomChoice(channels);
    
    const event: JourneyEvent = {
      id: `event_${customerId}_${i}`,
      customerId,
      stageId,
      type: eventType as JourneyEvent['type'],
      channel: channel as JourneyEvent['channel'],
      timestamp: getRandomDate(thirtyDaysAgo, now),
      metadata: {
        campaignId: Math.random() < 0.7 ? `campaign_${getRandomBetween(1, 10)}` : undefined,
        gameId: eventType === 'game_played' ? `game_${getRandomBetween(1, 50)}` : undefined,
        amount: ['first_deposit', 'withdrawal'].includes(eventType) ? getRandomFloat(50, 1000) : undefined,
        duration: eventType === 'game_played' ? getRandomBetween(5, 120) : undefined,
        source: getRandomChoice(['google', 'facebook', 'direct', 'affiliate']),
        medium: getRandomChoice(['cpc', 'organic', 'social', 'email', 'referral'])
      }
    };
    
    events.push(event);
  }
  
  return events.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

// Journey Flows
export const journeyFlows: JourneyFlow[] = [
  {
    id: 'main_onboarding',
    name: 'Main Onboarding Flow',
    description: 'Primary customer onboarding journey',
    stages: journeyStages.slice(0, 4),
    events: [],
    targetSegment: ['new-users'],
    isActive: true,
    createdDate: '2024-01-01T00:00:00.000Z',
    lastModified: '2024-01-15T10:30:00.000Z',
    metrics: {
      totalCustomers: 25000,
      completionRate: 72.5,
      averageJourneyTime: 14.2,
      totalRevenue: 2850000,
      conversionsByStage: {
        'awareness': 3825,
        'acquisition': 2494,
        'activation': 1953,
        'retention': 1674
      }
    }
  },
  {
    id: 'vip_journey',
    name: 'VIP Customer Journey',
    description: 'Journey for high-value VIP customers',
    stages: journeyStages.slice(3, 6),
    events: [],
    targetSegment: ['high-value', 'vip'],
    isActive: true,
    createdDate: '2024-01-01T00:00:00.000Z',
    lastModified: '2024-01-20T14:45:00.000Z',
    metrics: {
      totalCustomers: 2500,
      completionRate: 85.3,
      averageJourneyTime: 45.8,
      totalRevenue: 8750000,
      conversionsByStage: {
        'retention': 2500,
        'revenue': 2133,
        'referral': 1819
      }
    }
  },
  {
    id: 'winback_campaign',
    name: 'Win-Back Campaign',
    description: 'Re-engage churned customers',
    stages: journeyStages.slice(2, 4),
    events: [],
    targetSegment: ['at-risk', 'churned'],
    isActive: true,
    createdDate: '2024-01-10T00:00:00.000Z',
    lastModified: '2024-01-25T16:20:00.000Z',
    metrics: {
      totalCustomers: 5000,
      completionRate: 28.7,
      averageJourneyTime: 21.3,
      totalRevenue: 425000,
      conversionsByStage: {
        'activation': 1435,
        'retention': 1124
      }
    }
  }
];

// Generate customer journeys
export const generateCustomerJourneys = (customerIds: string[], count: number): CustomerJourney[] => {
  const journeys: CustomerJourney[] = [];
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
  
  for (let i = 0; i < count; i++) {
    const customerId = getRandomChoice(customerIds);
    const flow = getRandomChoice(journeyFlows);
    const startDate = getRandomDate(sixMonthsAgo, now);
    const currentStageIndex = getRandomBetween(0, flow.stages.length - 1);
    const currentStage = flow.stages[currentStageIndex];
    const completedStages = flow.stages.slice(0, currentStageIndex).map(s => s.id);
    
    const journey: CustomerJourney = {
      customerId,
      flowId: flow.id,
      currentStage: currentStage.id,
      startDate,
      completedStages,
      events: generateJourneyEvents(customerId, flow.id, getRandomBetween(3, 15)),
      status: getRandomChoice(['active', 'completed', 'abandoned', 'paused']),
      progressPercentage: (currentStageIndex / flow.stages.length) * 100,
      timeInCurrentStage: getRandomFloat(0.5, 30),
      predictedNextAction: getRandomChoice([
        'Email engagement campaign',
        'SMS reminder',
        'Push notification',
        'Personal call',
        'Special offer',
        'Product recommendation'
      ]),
      riskScore: getRandomFloat(0.1, 0.9)
    };
    
    journeys.push(journey);
  }
  
  return journeys;
};

// Journey Analytics
export const journeyAnalytics: JourneyAnalytics = {
  flowId: 'main_onboarding',
  dateRange: {
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: '2024-01-31T23:59:59.000Z'
  },
  overview: {
    totalCustomers: 25000,
    activeJourneys: 8750,
    completedJourneys: 12500,
    abandonedJourneys: 3750,
    averageCompletionTime: 14.2,
    conversionRate: 72.5
  },
  stageAnalytics: [
    {
      stageId: 'awareness',
      stageName: 'Awareness',
      entrances: 25000,
      exits: 21175,
      completions: 3825,
      averageTime: 2.5,
      conversionRate: 15.3,
      dropoffRate: 84.7
    },
    {
      stageId: 'acquisition',
      stageName: 'Acquisition',
      entrances: 3825,
      exits: 1331,
      completions: 2494,
      averageTime: 1.2,
      conversionRate: 65.2,
      dropoffRate: 34.8
    },
    {
      stageId: 'activation',
      stageName: 'Activation',
      entrances: 2494,
      exits: 541,
      completions: 1953,
      averageTime: 0.8,
      conversionRate: 78.3,
      dropoffRate: 21.7
    },
    {
      stageId: 'retention',
      stageName: 'Retention',
      entrances: 1953,
      exits: 279,
      completions: 1674,
      averageTime: 45.3,
      conversionRate: 85.7,
      dropoffRate: 14.3
    }
  ],
  channelPerformance: [
    {
      channel: 'email',
      interactions: 125000,
      conversionRate: 3.2,
      engagementRate: 24.5,
      revenue: 1250000
    },
    {
      channel: 'sms',
      interactions: 75000,
      conversionRate: 5.8,
      engagementRate: 18.2,
      revenue: 950000
    },
    {
      channel: 'push',
      interactions: 95000,
      conversionRate: 2.9,
      engagementRate: 15.7,
      revenue: 650000
    },
    {
      channel: 'web',
      interactions: 200000,
      conversionRate: 1.8,
      engagementRate: 32.1,
      revenue: 1850000
    },
    {
      channel: 'app',
      interactions: 180000,
      conversionRate: 4.2,
      engagementRate: 28.9,
      revenue: 2200000
    }
  ],
  cohortAnalysis: [
    {
      cohort: 'January 2024',
      customers: 5000,
      completionRate: 75.2,
      averageTime: 13.8,
      revenue: 650000
    },
    {
      cohort: 'February 2024',
      customers: 4800,
      completionRate: 72.1,
      averageTime: 14.5,
      revenue: 580000
    },
    {
      cohort: 'March 2024',
      customers: 5200,
      completionRate: 68.9,
      averageTime: 15.2,
      revenue: 720000
    },
    {
      cohort: 'April 2024',
      customers: 4900,
      completionRate: 71.3,
      averageTime: 14.1,
      revenue: 680000
    }
  ]
};

// Export all mock data
export const mockJourneyData = {
  stages: journeyStages,
  flows: journeyFlows,
  templates: journeyTemplates,
  analytics: journeyAnalytics,
  generateCustomerJourneys,
  generateJourneyEvents
};