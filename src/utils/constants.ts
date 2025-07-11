export const BRAND_COLORS = {
  primary: '#1E40AF', // Blue
  secondary: '#059669', // Green
  accent: '#DC2626', // Red
  warning: '#F59E0B', // Amber
  info: '#0EA5E9', // Sky blue
  success: '#10B981', // Emerald
  neutral: '#6B7280', // Gray
} as const;

export const COMPANY_INFO = {
  name: 'Predicta CRM',
  tagline: 'AI-Powered Customer Intelligence for iGaming',
  description: 'Advanced CRM platform designed specifically for gambling companies',
  logo: '/assets/1024x1024 - Transparent.png',
  logoColor: '/assets/1024x1024 - Color.png',
} as const;

export const GAME_TYPES = {
  SPORTS: 'sports',
  CASINO: 'casino',
  LOTTERY: 'lottery',
  LIVE_GAMES: 'live-games',
} as const;

export const CUSTOMER_SEGMENTS = {
  HIGH_VALUE: 'high-value',
  REGULAR: 'regular',
  AT_RISK: 'at-risk',
  CHURNED: 'churned',
} as const;

export const VIP_LEVELS = {
  BRONZE: 'bronze',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum',
} as const;

export const CAMPAIGN_TYPES = {
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  SOCIAL: 'social',
} as const;

export const TRANSACTION_TYPES = {
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
  BET: 'bet',
  WIN: 'win',
  BONUS: 'bonus',
} as const;

export const ROUTES = {
  DASHBOARD: '/',
  CUSTOMERS: '/customers',
  ANALYTICS: '/analytics',
  MARKETING: '/marketing',
  AI_INSIGHTS: '/ai-insights',
  SETTINGS: '/settings',
} as const;

export const REVENUE_TARGET = {
  ANNUAL: 53_000_000, // $53M
  MONTHLY: 4_416_667, // $4.42M
  WEEKLY: 1_019_231, // $1.02M
  DAILY: 145_205, // $145K
} as const;

export const MOCK_DATA_CONFIG = {
  TOTAL_CUSTOMERS: 25_000,
  ACTIVE_CUSTOMERS_PERCENTAGE: 0.75,
  VIP_CUSTOMERS_PERCENTAGE: 0.02,
  HIGH_VALUE_PERCENTAGE: 0.08,
  REGULAR_PERCENTAGE: 0.70,
  AT_RISK_PERCENTAGE: 0.15,
  CHURNED_PERCENTAGE: 0.05,
} as const;