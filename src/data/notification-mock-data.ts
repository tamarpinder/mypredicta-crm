import { Notification, AlertRule, NotificationPreferences, NotificationStats, AlertCondition, AlertAction } from '@/types';

// Helper functions for generating realistic notification data
const getRandomDate = (hoursAgo: number): string => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

const getRandomChoice = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif_001',
    type: 'customer',
    category: 'warning',
    priority: 'high',
    title: 'High Churn Risk Alert',
    message: 'Customer Sarah Johnson (customer_1234) has a churn risk score of 87%. Last activity: 7 days ago.',
    timestamp: getRandomDate(2),
    isRead: false,
    actionRequired: true,
    actionUrl: '/customers/customer_1234',
    actionText: 'View Customer',
    metadata: {
      customerId: 'customer_1234',
      threshold: 80,
      source: 'churn_prediction'
    }
  },
  {
    id: 'notif_002',
    type: 'campaign',
    category: 'success',
    priority: 'medium',
    title: 'Campaign Performance Alert',
    message: 'Welcome Email Campaign has achieved 95% open rate, exceeding target by 25%.',
    timestamp: getRandomDate(4),
    isRead: false,
    actionRequired: false,
    actionUrl: '/campaigns/campaign_001',
    actionText: 'View Campaign',
    metadata: {
      campaignId: 'campaign_001',
      source: 'performance_monitor'
    }
  },
  {
    id: 'notif_003',
    type: 'revenue',
    category: 'success',
    priority: 'high',
    title: 'Large Transaction Alert',
    message: 'High-value customer Michael Chen deposited $15,000. Consider VIP upgrade.',
    timestamp: getRandomDate(1),
    isRead: false,
    actionRequired: true,
    actionUrl: '/customers/customer_5678',
    actionText: 'Review Customer',
    metadata: {
      customerId: 'customer_5678',
      amount: 15000,
      threshold: 10000,
      source: 'transaction_monitor'
    }
  },
  {
    id: 'notif_004',
    type: 'journey',
    category: 'warning',
    priority: 'medium',
    title: 'Journey Abandonment Alert',
    message: '23 customers have been stuck in the "First Deposit" stage for over 48 hours.',
    timestamp: getRandomDate(6),
    isRead: true,
    actionRequired: true,
    actionUrl: '/customers/journey',
    actionText: 'View Journey',
    metadata: {
      journeyId: 'main_onboarding',
      source: 'journey_monitor'
    }
  },
  {
    id: 'notif_005',
    type: 'system',
    category: 'info',
    priority: 'low',
    title: 'Weekly Report Available',
    message: 'Your weekly performance report is ready for review. Revenue up 12% this week.',
    timestamp: getRandomDate(12),
    isRead: true,
    actionRequired: false,
    actionUrl: '/analytics',
    actionText: 'View Report',
    metadata: {
      source: 'report_generator'
    }
  },
  {
    id: 'notif_006',
    type: 'customer',
    category: 'error',
    priority: 'critical',
    title: 'VIP Customer Issue',
    message: 'VIP customer David Wilson has failed 3 withdrawal attempts. Immediate attention required.',
    timestamp: getRandomDate(0.5),
    isRead: false,
    actionRequired: true,
    actionUrl: '/customers/customer_9999',
    actionText: 'Resolve Issue',
    metadata: {
      customerId: 'customer_9999',
      source: 'transaction_monitor'
    }
  },
  {
    id: 'notif_007',
    type: 'campaign',
    category: 'warning',
    priority: 'high',
    title: 'Campaign Budget Alert',
    message: 'Facebook Ads Campaign has spent 90% of allocated budget with 5 days remaining.',
    timestamp: getRandomDate(3),
    isRead: false,
    actionRequired: true,
    actionUrl: '/campaigns/campaign_002',
    actionText: 'Manage Budget',
    metadata: {
      campaignId: 'campaign_002',
      threshold: 90,
      source: 'budget_monitor'
    }
  },
  {
    id: 'notif_008',
    type: 'revenue',
    category: 'success',
    priority: 'medium',
    title: 'Daily Revenue Target Met',
    message: 'Congratulations! Daily revenue target of $150,000 achieved at 3:47 PM.',
    timestamp: getRandomDate(8),
    isRead: true,
    actionRequired: false,
    actionUrl: '/analytics',
    actionText: 'View Details',
    metadata: {
      amount: 150000,
      threshold: 150000,
      source: 'revenue_tracker'
    }
  },
  {
    id: 'notif_009',
    type: 'customer',
    category: 'info',
    priority: 'low',
    title: 'New Customer Milestone',
    message: 'Welcome! You have reached 25,000 registered customers. Well done!',
    timestamp: getRandomDate(24),
    isRead: true,
    actionRequired: false,
    actionUrl: '/customers',
    actionText: 'View Customers',
    metadata: {
      source: 'milestone_tracker'
    }
  },
  {
    id: 'notif_010',
    type: 'alert',
    category: 'warning',
    priority: 'medium',
    title: 'Unusual Activity Detected',
    message: 'Spike in login attempts from unusual IP ranges. Security review recommended.',
    timestamp: getRandomDate(5),
    isRead: false,
    actionRequired: true,
    actionUrl: '/security',
    actionText: 'Review Security',
    metadata: {
      source: 'security_monitor'
    }
  }
];

// Mock Alert Rules
export const mockAlertRules: AlertRule[] = [
  {
    id: 'rule_001',
    name: 'High Churn Risk Alert',
    description: 'Alert when customer churn score exceeds 80%',
    type: 'threshold',
    isActive: true,
    conditions: [
      {
        id: 'cond_001',
        field: 'churnScore',
        operator: 'greater_than',
        value: 0.8
      }
    ],
    actions: [
      {
        id: 'action_001',
        type: 'notification',
        target: 'customer_success_team',
        priority: 'high'
      },
      {
        id: 'action_002',
        type: 'email',
        target: 'manager@predicta.com',
        priority: 'high',
        template: 'churn_risk_alert'
      }
    ],
    priority: 'high',
    cooldownPeriod: 24,
    targetAudience: ['customer_success', 'management'],
    createdBy: 'admin',
    createdDate: '2024-01-01T00:00:00.000Z',
    lastTriggered: getRandomDate(2),
    triggerCount: 45
  },
  {
    id: 'rule_002',
    name: 'Large Transaction Alert',
    description: 'Alert for transactions over $10,000',
    type: 'threshold',
    isActive: true,
    conditions: [
      {
        id: 'cond_002',
        field: 'transactionAmount',
        operator: 'greater_than',
        value: 10000
      }
    ],
    actions: [
      {
        id: 'action_003',
        type: 'notification',
        target: 'vip_team',
        priority: 'high'
      },
      {
        id: 'action_004',
        type: 'sms',
        target: '+1234567890',
        priority: 'high'
      }
    ],
    priority: 'high',
    cooldownPeriod: 1,
    targetAudience: ['vip_team', 'finance'],
    createdBy: 'admin',
    createdDate: '2024-01-01T00:00:00.000Z',
    lastTriggered: getRandomDate(1),
    triggerCount: 127
  },
  {
    id: 'rule_003',
    name: 'Campaign Performance Drop',
    description: 'Alert when campaign conversion rate drops below 5%',
    type: 'threshold',
    isActive: true,
    conditions: [
      {
        id: 'cond_003',
        field: 'conversionRate',
        operator: 'less_than',
        value: 0.05
      }
    ],
    actions: [
      {
        id: 'action_005',
        type: 'notification',
        target: 'marketing_team',
        priority: 'medium'
      }
    ],
    priority: 'medium',
    cooldownPeriod: 6,
    targetAudience: ['marketing'],
    createdBy: 'marketing_manager',
    createdDate: '2024-01-01T00:00:00.000Z',
    lastTriggered: getRandomDate(18),
    triggerCount: 23
  },
  {
    id: 'rule_004',
    name: 'Journey Stage Abandonment',
    description: 'Alert when customers are stuck in journey stage for more than 48 hours',
    type: 'event',
    isActive: true,
    conditions: [
      {
        id: 'cond_004',
        field: 'timeInStage',
        operator: 'greater_than',
        value: 48
      }
    ],
    actions: [
      {
        id: 'action_006',
        type: 'notification',
        target: 'customer_success_team',
        priority: 'medium'
      }
    ],
    priority: 'medium',
    cooldownPeriod: 12,
    targetAudience: ['customer_success'],
    createdBy: 'admin',
    createdDate: '2024-01-01T00:00:00.000Z',
    lastTriggered: getRandomDate(6),
    triggerCount: 67
  },
  {
    id: 'rule_005',
    name: 'Daily Revenue Target',
    description: 'Alert when daily revenue target is achieved',
    type: 'threshold',
    isActive: true,
    conditions: [
      {
        id: 'cond_005',
        field: 'dailyRevenue',
        operator: 'greater_equal',
        value: 150000
      }
    ],
    actions: [
      {
        id: 'action_007',
        type: 'notification',
        target: 'all_teams',
        priority: 'low'
      }
    ],
    priority: 'low',
    cooldownPeriod: 24,
    targetAudience: ['all'],
    createdBy: 'admin',
    createdDate: '2024-01-01T00:00:00.000Z',
    lastTriggered: getRandomDate(8),
    triggerCount: 89
  }
];

// Mock Notification Preferences
export const mockNotificationPreferences: NotificationPreferences = {
  userId: 'admin',
  inApp: true,
  email: true,
  sms: false,
  push: true,
  categories: {
    system: true,
    customer: true,
    campaign: true,
    journey: true,
    revenue: true,
    alert: true
  },
  priorities: {
    low: true,
    medium: true,
    high: true,
    critical: true
  },
  quietHours: {
    enabled: true,
    start: '22:00',
    end: '08:00'
  },
  frequency: 'immediate'
};

// Mock Notification Stats
export const mockNotificationStats: NotificationStats = {
  total: mockNotifications.length,
  unread: mockNotifications.filter(n => !n.isRead).length,
  byType: {
    system: mockNotifications.filter(n => n.type === 'system').length,
    customer: mockNotifications.filter(n => n.type === 'customer').length,
    campaign: mockNotifications.filter(n => n.type === 'campaign').length,
    journey: mockNotifications.filter(n => n.type === 'journey').length,
    revenue: mockNotifications.filter(n => n.type === 'revenue').length,
    alert: mockNotifications.filter(n => n.type === 'alert').length
  },
  byCategory: {
    info: mockNotifications.filter(n => n.category === 'info').length,
    warning: mockNotifications.filter(n => n.category === 'warning').length,
    error: mockNotifications.filter(n => n.category === 'error').length,
    success: mockNotifications.filter(n => n.category === 'success').length
  },
  byPriority: {
    low: mockNotifications.filter(n => n.priority === 'low').length,
    medium: mockNotifications.filter(n => n.priority === 'medium').length,
    high: mockNotifications.filter(n => n.priority === 'high').length,
    critical: mockNotifications.filter(n => n.priority === 'critical').length
  },
  recentActivity: [
    { timestamp: getRandomDate(0), count: 3 },
    { timestamp: getRandomDate(1), count: 5 },
    { timestamp: getRandomDate(2), count: 2 },
    { timestamp: getRandomDate(3), count: 4 },
    { timestamp: getRandomDate(4), count: 1 },
    { timestamp: getRandomDate(5), count: 3 },
    { timestamp: getRandomDate(6), count: 2 }
  ]
};

// Function to generate new notifications
export const generateNotification = (
  type: Notification['type'],
  category: Notification['category'],
  priority: Notification['priority'],
  title: string,
  message: string,
  metadata?: Notification['metadata']
): Notification => {
  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    category,
    priority,
    title,
    message,
    timestamp: new Date().toISOString(),
    isRead: false,
    actionRequired: priority === 'high' || priority === 'critical',
    metadata: metadata || {},
  };
};

// Export all mock data
export const mockNotificationData = {
  notifications: mockNotifications,
  alertRules: mockAlertRules,
  preferences: mockNotificationPreferences,
  stats: mockNotificationStats,
  generateNotification
};