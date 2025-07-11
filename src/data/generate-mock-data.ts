import { 
  generateCustomers, 
  generateTransactions, 
  generateCampaigns, 
  generateGameMetrics, 
  generateDashboardMetrics, 
  generateAIInsights 
} from './mock-data-generator';
import { MOCK_DATA_CONFIG } from '@/utils/constants';

export const generateAllMockData = () => {
  // Generate customers (25,000 records)
  const customers = generateCustomers(MOCK_DATA_CONFIG.TOTAL_CUSTOMERS);
  
  // Generate transactions (approximately 500,000 records for realistic volume)
  const transactions = generateTransactions(customers, 500000);
  
  // Generate campaigns (50 campaigns)
  const campaigns = generateCampaigns(50);
  
  // Generate game metrics
  const gameMetrics = generateGameMetrics();
  
  // Generate dashboard metrics
  const dashboardMetrics = generateDashboardMetrics(customers, transactions);
  
  // Generate AI insights
  const aiInsights = generateAIInsights(customers);
  
  return {
    customers,
    transactions,
    campaigns,
    gameMetrics,
    dashboardMetrics,
    aiInsights
  };
};

// For development, we'll use a smaller subset
export const generateDevMockData = () => {
  // Generate a smaller subset for development
  const customers = generateCustomers(1000);
  const transactions = generateTransactions(customers, 10000);
  const campaigns = generateCampaigns(25);
  const gameMetrics = generateGameMetrics();
  const dashboardMetrics = generateDashboardMetrics(customers, transactions);
  const aiInsights = generateAIInsights(customers);
  
  return {
    customers,
    transactions,
    campaigns,
    gameMetrics,
    dashboardMetrics,
    aiInsights
  };
};