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
  console.log('Generating mock data...');
  
  // Generate customers (25,000 records)
  const customers = generateCustomers(MOCK_DATA_CONFIG.TOTAL_CUSTOMERS);
  console.log(`Generated ${customers.length} customers`);
  
  // Generate transactions (approximately 500,000 records for realistic volume)
  const transactions = generateTransactions(customers, 500000);
  console.log(`Generated ${transactions.length} transactions`);
  
  // Generate campaigns (50 campaigns)
  const campaigns = generateCampaigns(50);
  console.log(`Generated ${campaigns.length} campaigns`);
  
  // Generate game metrics
  const gameMetrics = generateGameMetrics();
  console.log(`Generated ${gameMetrics.length} game metrics`);
  
  // Generate dashboard metrics
  const dashboardMetrics = generateDashboardMetrics(customers, transactions);
  console.log('Generated dashboard metrics');
  
  // Generate AI insights
  const aiInsights = generateAIInsights(customers);
  console.log('Generated AI insights');
  
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
  console.log('Generating development mock data...');
  
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