import { Customer, Transaction, Campaign, GameMetrics, DashboardMetrics, AIInsights } from '@/types';
import { sampleCustomers, sampleTransactions, sampleCampaigns, sampleGameMetrics, sampleDashboardMetrics, sampleAIInsights } from './sample-data';

// Configuration for data size
const USE_LARGE_DATASET = process.env.NODE_ENV === 'production' || process.env.USE_LARGE_DATASET === 'true';
const LAZY_LOAD_LARGE_DATA = true;

// Lazy loading functions for large datasets
let enhancedDataCache: {
  customers?: Customer[];
  transactions?: Transaction[];
  campaigns?: Campaign[];
  gameMetrics?: GameMetrics[];
  dashboardMetrics?: DashboardMetrics;
  aiInsights?: AIInsights;
} = {};

async function loadEnhancedData() {
  if (Object.keys(enhancedDataCache).length === 0) {
    // Import the enhanced data lazily
    const enhancedData = await import('./enhanced-mock-data');
    enhancedDataCache = {
      customers: enhancedData.enhancedCustomers,
      transactions: enhancedData.enhancedTransactions,
      campaigns: enhancedData.enhancedCampaigns,
      gameMetrics: enhancedData.enhancedGameMetrics,
      dashboardMetrics: enhancedData.enhancedDashboardMetrics,
      aiInsights: enhancedData.enhancedAIInsights
    };
  }
  return enhancedDataCache;
}

// Data provider functions
export async function getCustomers(): Promise<Customer[]> {
  if (USE_LARGE_DATASET && LAZY_LOAD_LARGE_DATA) {
    const data = await loadEnhancedData();
    return data.customers || sampleCustomers;
  }
  return sampleCustomers;
}

export async function getTransactions(): Promise<Transaction[]> {
  if (USE_LARGE_DATASET && LAZY_LOAD_LARGE_DATA) {
    const data = await loadEnhancedData();
    return data.transactions || sampleTransactions;
  }
  return sampleTransactions;
}

export async function getCampaigns(): Promise<Campaign[]> {
  if (USE_LARGE_DATASET && LAZY_LOAD_LARGE_DATA) {
    const data = await loadEnhancedData();
    return data.campaigns || sampleCampaigns;
  }
  return sampleCampaigns;
}

export async function getGameMetrics(): Promise<GameMetrics[]> {
  if (USE_LARGE_DATASET && LAZY_LOAD_LARGE_DATA) {
    const data = await loadEnhancedData();
    return data.gameMetrics || sampleGameMetrics;
  }
  return sampleGameMetrics;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  if (USE_LARGE_DATASET && LAZY_LOAD_LARGE_DATA) {
    const data = await loadEnhancedData();
    return data.dashboardMetrics || sampleDashboardMetrics;
  }
  return sampleDashboardMetrics;
}

export async function getAIInsights(): Promise<AIInsights> {
  if (USE_LARGE_DATASET && LAZY_LOAD_LARGE_DATA) {
    const data = await loadEnhancedData();
    return data.aiInsights || sampleAIInsights;
  }
  return sampleAIInsights;
}

// Synchronous fallback functions for components that can't handle async
export function getCustomersSync(): Customer[] {
  return sampleCustomers;
}

export function getTransactionsSync(): Transaction[] {
  return sampleTransactions;
}

export function getCampaignsSync(): Campaign[] {
  return sampleCampaigns;
}

export function getGameMetricsSync(): GameMetrics[] {
  return sampleGameMetrics;
}

export function getDashboardMetricsSync(): DashboardMetrics {
  return sampleDashboardMetrics;
}

export function getAIInsightsSync(): AIInsights {
  return sampleAIInsights;
}

// Utility function to get data stats
export function getDataStats() {
  const customers = getCustomersSync();
  const transactions = getTransactionsSync();
  const campaigns = getCampaignsSync();
  
  return {
    totalCustomers: customers.length,
    totalTransactions: transactions.length,
    totalCampaigns: campaigns.length,
    activeCustomers: customers.filter(c => c.status === 'active').length,
    vipCustomers: customers.filter(c => c.isVip).length,
    highValueCustomers: customers.filter(c => c.segment === 'high-value').length,
    atRiskCustomers: customers.filter(c => c.segment === 'at-risk').length,
    churnedCustomers: customers.filter(c => c.segment === 'churned').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.lifetimeValue, 0),
    usingLargeDataset: USE_LARGE_DATASET && LAZY_LOAD_LARGE_DATA
  };
}