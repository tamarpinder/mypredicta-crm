import type { Customer, Transaction, Campaign, GameMetrics, DashboardMetrics, AIInsights } from '@/types';
import { generateCustomers, generateTransactions, generateCampaigns, generateGameMetrics, generateDashboardMetrics, generateAIInsights } from './mock-data-generator';

// Generate the large-scale mock data
export const enhancedCustomers = generateCustomers(25000);
export const enhancedTransactions = generateTransactions(enhancedCustomers, 500000);
export const enhancedCampaigns = generateCampaigns(100);
export const enhancedGameMetrics = generateGameMetrics();
export const enhancedDashboardMetrics = generateDashboardMetrics(enhancedCustomers, enhancedTransactions);
export const enhancedAIInsights = generateAIInsights(enhancedCustomers);

// Export summary stats
export const dataStats = {
  totalCustomers: enhancedCustomers.length,
  totalTransactions: enhancedTransactions.length,
  totalCampaigns: enhancedCampaigns.length,
  totalRevenue: enhancedDashboardMetrics.totalRevenue,
  activeCustomers: enhancedCustomers.filter(c => c.status === 'active').length,
  vipCustomers: enhancedCustomers.filter(c => c.isVip).length,
  highValueCustomers: enhancedCustomers.filter(c => c.segment === 'high-value').length,
  atRiskCustomers: enhancedCustomers.filter(c => c.segment === 'at-risk').length,
  churnedCustomers: enhancedCustomers.filter(c => c.segment === 'churned').length
};

// Data generation complete