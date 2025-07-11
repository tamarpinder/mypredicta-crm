import { Customer, Transaction, Campaign, GameMetrics, DashboardMetrics, AIInsights } from '@/types';
import { generateCustomers, generateTransactions, generateCampaigns, generateGameMetrics, generateDashboardMetrics, generateAIInsights } from './mock-data-generator';

// Generate the large-scale mock data
console.log('Generating 25,000 customers...');
export const enhancedCustomers = generateCustomers(25000);

console.log('Generating 500,000 transactions...');
export const enhancedTransactions = generateTransactions(enhancedCustomers, 500000);

console.log('Generating 100 campaigns...');
export const enhancedCampaigns = generateCampaigns(100);

console.log('Generating game metrics...');
export const enhancedGameMetrics = generateGameMetrics();

console.log('Calculating dashboard metrics...');
export const enhancedDashboardMetrics = generateDashboardMetrics(enhancedCustomers, enhancedTransactions);

console.log('Generating AI insights...');
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

console.log('Data generation complete!', dataStats);