import { bahamianCustomers } from './bahamas-customers';
import { AIInsights } from '@/types';

// Generate realistic Bahamian customer names for AI insights
const generateBahamianCustomerName = () => {
  const firstNames = [
    'Marcus', 'Destiny', 'Demetrius', 'Shantel', 'Gregory', 'Tamika', 'Kevin', 'Keisha',
    'Andre', 'Latoya', 'Michael', 'Jasmine', 'Christopher', 'Monique', 'Anthony', 'Tiffany',
    'James', 'Maria', 'David', 'Nicole', 'Robert', 'Ashley', 'William', 'Crystal',
    'John', 'Michelle', 'Joseph', 'Kimberly', 'Thomas', 'Stephanie', 'Charles', 'Jennifer',
    'Richard', 'Lisa', 'Daniel', 'Angela', 'Matthew', 'Sandra', 'Mark', 'Deborah',
    'Steven', 'Rachel', 'Paul', 'Carolyn', 'Andrew', 'Janet', 'Joshua', 'Catherine',
    'Kenneth', 'Frances', 'Kevin', 'Maria', 'Brian', 'Heather', 'George', 'Diane',
    'Edward', 'Julie', 'Ronald', 'Joyce', 'Timothy', 'Victoria', 'Jason', 'Kelly'
  ];
  
  const lastNames = [
    'Williams', 'Johnson', 'Smith', 'Rolle', 'Ferguson', 'Thompson', 'Brown', 'Davis',
    'Miller', 'Wilson', 'Taylor', 'Jones', 'White', 'Robinson', 'Clarke', 'Gibson',
    'Russell', 'Major', 'Sands', 'Butler', 'Roberts', 'Moss', 'Stubbs', 'Bethel',
    'Adderley', 'Knowles', 'Pinder', 'Cooper', 'McKenzie', 'Munroe', 'Forbes', 'Dean',
    'Hall', 'Allen', 'Young', 'King', 'Wright', 'Lopez', 'Hill', 'Scott',
    'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez'
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return { firstName, lastName };
};

const generateLocation = () => {
  const locations = [
    'Nassau', 'Paradise Island', 'Freeport', 'Cable Beach', 'Lyford Cay', 'Old Fort Bay',
    'Marsh Harbour', 'George Town', 'Governor\'s Harbour', 'Harbour Island', 'Alice Town',
    'Andros Town', 'Fresh Creek', 'Cockburn Town', 'Matthew Town', 'Colonel Hill'
  ];
  return locations[Math.floor(Math.random() * locations.length)];
};

// Generate 5000+ high-risk customers
const generateHighRiskCustomers = (count: number = 5200) => {
  return Array.from({ length: count }, (_, i) => {
    const { firstName, lastName } = generateBahamianCustomerName();
    const location = generateLocation();
    const riskScore = 0.65 + Math.random() * 0.35; // High risk: 65-100%
    
    const riskFactors = [
      'Decreased betting frequency',
      'No recent deposits',
      'Long time since last login',
      'Low engagement with promotions',
      'Negative balance trend',
      'Reduced session duration',
      'Decreased game variety',
      'Lower average bet amounts',
      'Fewer transactions per week',
      'Reduced weekend activity',
      'Missing from recent campaigns',
      'Declining VIP tier points'
    ];
    
    const selectedFactors = riskFactors
      .sort(() => 0.5 - Math.random())
      .slice(0, 2 + Math.floor(Math.random() * 2));
    
    const recommendations = [
      'Send personalized bonus offer',
      'Trigger retention campaign',
      'Assign to VIP manager',
      'Offer deposit match bonus',
      'Invite to exclusive tournament',
      'Send loyalty reward',
      'Schedule personal call',
      'Provide game recommendations',
      'Offer cashback promotion',
      'Send win-back campaign'
    ];
    
    return {
      customerId: `risk_customer_${i + 1}`,
      customerName: `${firstName} ${lastName}`,
      location,
      riskScore: +riskScore.toFixed(2),
      factors: selectedFactors,
      recommendation: recommendations[Math.floor(Math.random() * recommendations.length)],
      estimatedLoss: Math.floor(1000 + Math.random() * 25000),
      daysSinceLastActivity: Math.floor(1 + Math.random() * 45)
    };
  });
};

// Generate advanced LTV predictions
const generateLTVPredictions = (count: number = 2500) => {
  return Array.from({ length: count }, (_, i) => {
    const { firstName, lastName } = generateBahamianCustomerName();
    const location = generateLocation();
    const predictedValue = Math.floor(5000 + Math.random() * 250000);
    const confidence = Math.floor(70 + Math.random() * 30);
    
    return {
      customerId: `ltv_customer_${i + 1}`,
      customerName: `${firstName} ${lastName}`,
      location,
      predictedValue,
      confidence,
      timeframe: ['6 months', '12 months', '18 months', '24 months'][Math.floor(Math.random() * 4)],
      currentValue: Math.floor(predictedValue * (0.3 + Math.random() * 0.4)),
      growthPotential: Math.floor(predictedValue * (0.2 + Math.random() * 0.6))
    };
  });
};

// Generate game recommendations
const generateGameRecommendations = (count: number = 1000) => {
  const games = [
    'Sports Betting', 'Blackjack', 'Roulette', 'Slots', 'Poker', 'Baccarat',
    'Island Luck Lottery', 'Live Casino', 'Virtual Sports', 'Dice Games'
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const { firstName, lastName } = generateBahamianCustomerName();
    const location = generateLocation();
    const game = games[Math.floor(Math.random() * games.length)];
    
    return {
      customerId: `game_rec_${i + 1}`,
      customerName: `${firstName} ${lastName}`,
      location,
      recommendedGame: game,
      confidence: Math.floor(75 + Math.random() * 25),
      reason: `Based on ${location} player preferences and betting history`,
      expectedEngagement: Math.floor(20 + Math.random() * 60) + '%',
      potentialRevenue: Math.floor(500 + Math.random() * 5000)
    };
  });
};

// Generate behavioral insights
const generateBehavioralInsights = () => {
  return {
    peakPlayingHours: [
      { hour: '7PM-10PM', percentage: 32, location: 'Nassau' },
      { hour: '8PM-11PM', percentage: 28, location: 'Paradise Island' },
      { hour: '6PM-9PM', percentage: 24, location: 'Freeport' },
      { hour: '9PM-12AM', percentage: 16, location: 'Other Islands' }
    ],
    seasonalTrends: [
      { season: 'Tourism Peak (Dec-Apr)', impact: '+35%', description: 'Higher visitor spending' },
      { season: 'Hurricane Season (Jun-Nov)', impact: '-12%', description: 'Reduced activity' },
      { season: 'Junkanoo Festival', impact: '+45%', description: 'Cultural celebration boost' },
      { season: 'Summer Locals (May-Aug)', impact: '+8%', description: 'Local player focus' }
    ],
    preferredPayment: [
      { method: 'Credit Card', percentage: 45, trend: '+5%' },
      { method: 'Bank Transfer', percentage: 28, trend: '+12%' },
      { method: 'Digital Wallet', percentage: 18, trend: '+25%' },
      { method: 'Cash Deposit', percentage: 9, trend: '-8%' }
    ]
  };
};

// Generate retention predictions
const generateRetentionPredictions = (count: number = 1500) => {
  return Array.from({ length: count }, (_, i) => {
    const { firstName, lastName } = generateBahamianCustomerName();
    const location = generateLocation();
    const retentionProbability = Math.random();
    
    return {
      customerId: `retention_${i + 1}`,
      customerName: `${firstName} ${lastName}`,
      location,
      retentionProbability: +(retentionProbability * 100).toFixed(1),
      riskLevel: retentionProbability > 0.7 ? 'Low' : retentionProbability > 0.4 ? 'Medium' : 'High',
      actionRequired: retentionProbability < 0.4,
      suggestedAction: retentionProbability < 0.4 
        ? 'Immediate intervention required'
        : retentionProbability < 0.7 
        ? 'Monitor and engage' 
        : 'Maintain current strategy'
    };
  });
};

export const advancedAIInsights: AIInsights = {
  churnPrediction: generateHighRiskCustomers().slice(0, 50), // Show top 50 in UI
  lifetimeValuePrediction: generateLTVPredictions().slice(0, 25),
  gameRecommendations: generateGameRecommendations().slice(0, 20),
  
  // Extended insights
  highRiskCustomers: generateHighRiskCustomers(),
  behavioralInsights: generateBehavioralInsights(),
  retentionPredictions: generateRetentionPredictions(),
  
  // Summary statistics
  totalHighRiskCustomers: 5200,
  totalPredictiveModels: 8,
  aiAccuracy: 94.2,
  lastUpdated: new Date().toISOString(),
  
  // Advanced predictions
  crossSellOpportunities: Array.from({ length: 800 }, (_, i) => {
    const { firstName, lastName } = generateBahamianCustomerName();
    return {
      customerId: `cross_sell_${i + 1}`,
      customerName: `${firstName} ${lastName}`,
      location: generateLocation(),
      currentProducts: ['Sports Betting'],
      recommendedProducts: ['Island Luck Lottery', 'Live Casino'],
      conversionProbability: Math.floor(30 + Math.random() * 50),
      potentialRevenue: Math.floor(1000 + Math.random() * 8000)
    };
  }).slice(0, 15),
  
  // VIP upgrade candidates
  vipUpgradeCandidates: Array.from({ length: 300 }, (_, i) => {
    const { firstName, lastName } = generateBahamianCustomerName();
    return {
      customerId: `vip_candidate_${i + 1}`,
      customerName: `${firstName} ${lastName}`,
      location: generateLocation(),
      currentTier: 'Regular',
      targetTier: ['Silver', 'Gold'][Math.floor(Math.random() * 2)],
      upgradeScore: Math.floor(70 + Math.random() * 30),
      monthsToUpgrade: Math.floor(1 + Math.random() * 6)
    };
  }).slice(0, 12)
};