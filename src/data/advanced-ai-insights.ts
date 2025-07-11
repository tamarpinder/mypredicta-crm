import { bahamianCustomers } from './bahamas-customers';
import { AIInsights } from '@/types';


const generateLocation = () => {
  const locations = [
    'Nassau', 'Paradise Island', 'Freeport', 'Cable Beach', 'Lyford Cay', 'Old Fort Bay',
    'Marsh Harbour', 'George Town', 'Governor\'s Harbour', 'Harbour Island', 'Alice Town',
    'Andros Town', 'Fresh Creek', 'Cockburn Town', 'Matthew Town', 'Colonel Hill'
  ];
  return locations[Math.floor(Math.random() * locations.length)];
};

// Available customer IDs from sample data
const AVAILABLE_CUSTOMER_IDS = ['customer_1', 'customer_2', 'customer_3', 'customer_4', 'customer_5'];

// Generate randomized customer selection
const getRandomCustomerId = () => {
  return AVAILABLE_CUSTOMER_IDS[Math.floor(Math.random() * AVAILABLE_CUSTOMER_IDS.length)];
};

// Generate 5000+ high-risk customers
const generateHighRiskCustomers = (count: number = 5200) => {
  return Array.from({ length: count }, (_, i) => {
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
      customerId: getRandomCustomerId(), // Use actual customer IDs
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
    const location = generateLocation();
    const predictedValue = Math.floor(5000 + Math.random() * 250000);
    const confidence = Math.floor(70 + Math.random() * 30);
    
    return {
      customerId: getRandomCustomerId(), // Use actual customer IDs
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
  
  const reasons = [
    'Based on recent betting patterns and preferences',
    'Recommended for high engagement potential',
    'Popular choice among similar players',
    'Matches your gaming history profile',
    'Trending game in your region',
    'AI suggests based on win/loss patterns',
    'Optimal for your current VIP level',
    'High conversion rate for your segment'
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const location = generateLocation();
    const game = games[Math.floor(Math.random() * games.length)];
    
    return {
      customerId: getRandomCustomerId(), // Use actual customer IDs
      type: 'game',
      location,
      recommendedGame: game,
      recommendedGames: [game], // For compatibility
      confidence: (Math.floor(75 + Math.random() * 25) / 100), // Convert to decimal
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      expectedEngagement: Math.floor(20 + Math.random() * 60),
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
    const location = generateLocation();
    const retentionProbability = Math.random();
    
    return {
      customerId: getRandomCustomerId(), // Use actual customer IDs
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

// Shuffle array function for better randomization
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const advancedAIInsights: AIInsights = {
  churnPrediction: shuffleArray(generateHighRiskCustomers()).slice(0, 10), // Limit to 10 for better UX
  lifetimeValuePrediction: shuffleArray(generateLTVPredictions()).slice(0, 10), // Limit to 10 for better UX
  gameRecommendations: shuffleArray(generateGameRecommendations()).slice(0, 10), // Limit to 10 for better UX
  
  // Extended insights
  highRiskCustomers: shuffleArray(generateHighRiskCustomers()),
  behavioralInsights: generateBehavioralInsights(),
  retentionPredictions: shuffleArray(generateRetentionPredictions()),
  
  // Summary statistics
  totalHighRiskCustomers: 5200,
  totalPredictiveModels: 8,
  aiAccuracy: 94.2,
  lastUpdated: new Date().toISOString(),
  
  // Advanced predictions
  crossSellOpportunities: shuffleArray(Array.from({ length: 800 }, (_, i) => {
    const products = [
      ['Sports Betting'], ['Slots'], ['Live Casino'], ['Poker'], ['Roulette']
    ];
    const recommendedProducts = [
      ['Island Luck Lottery', 'Live Casino'], 
      ['Sports Betting', 'Baccarat'], 
      ['Slots', 'Poker'], 
      ['Virtual Sports', 'Dice Games'],
      ['Live Casino', 'Blackjack']
    ];
    
    return {
      customerId: getRandomCustomerId(),
      location: generateLocation(),
      currentProducts: products[Math.floor(Math.random() * products.length)],
      recommendedProducts: recommendedProducts[Math.floor(Math.random() * recommendedProducts.length)],
      conversionProbability: Math.floor(30 + Math.random() * 50),
      potentialRevenue: Math.floor(1000 + Math.random() * 8000)
    };
  })).slice(0, 10),
  
  // VIP upgrade candidates
  vipUpgradeCandidates: shuffleArray(Array.from({ length: 300 }, (_, i) => {
    const currentTiers = ['Regular', 'Bronze'];
    const targetTiers = ['Silver', 'Gold', 'Platinum'];
    
    return {
      customerId: getRandomCustomerId(),
      location: generateLocation(),
      currentTier: currentTiers[Math.floor(Math.random() * currentTiers.length)],
      targetTier: targetTiers[Math.floor(Math.random() * targetTiers.length)],
      upgradeScore: Math.floor(70 + Math.random() * 30),
      monthsToUpgrade: Math.floor(1 + Math.random() * 6)
    };
  })).slice(0, 10),

  // Promotional Offers
  promotionalOffers: shuffleArray(Array.from({ length: 500 }, (_, i) => {
    const offerTypes = [
      'Deposit Match Bonus', 'Free Spins', 'Cashback Offer', 'Reload Bonus', 
      'VIP Bonus', 'Welcome Package', 'Weekend Special', 'Loyalty Reward'
    ];
    
    const descriptions = [
      '100% match on your next deposit up to $500',
      '50 free spins on selected slots',
      '20% cashback on losses this week',
      '75% reload bonus for existing players',
      'Exclusive VIP bonus - 150% match',
      'Welcome package: 200% + 100 free spins',
      'Weekend special: Double your deposit',
      'Loyalty points converted to bonus cash'
    ];
    
    const gameCategories = [
      'All Games', 'Slots Only', 'Table Games', 'Live Casino', 
      'Sports Betting', 'Lottery Games', 'Video Poker'
    ];
    
    const offerType = offerTypes[Math.floor(Math.random() * offerTypes.length)];
    
    return {
      customerId: getRandomCustomerId(),
      location: generateLocation(),
      offerType,
      title: offerType,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      bonusAmount: Math.floor(50 + Math.random() * 950),
      bonusPercentage: Math.floor(25 + Math.random() * 175),
      gameCategory: gameCategories[Math.floor(Math.random() * gameCategories.length)],
      minDeposit: Math.floor(10 + Math.random() * 90),
      maxBonus: Math.floor(100 + Math.random() * 900),
      wagering: Math.floor(20 + Math.random() * 40) + 'x',
      validDays: Math.floor(7 + Math.random() * 23),
      conversionProbability: Math.floor(40 + Math.random() * 50),
      expectedRevenue: Math.floor(200 + Math.random() * 1800),
      urgency: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
      personalizedReason: [
        'Based on recent deposit pattern',
        'Matches your favorite game category',
        'Perfect for your VIP level',
        'Recommended for high engagement',
        'Tailored to your betting history'
      ][Math.floor(Math.random() * 5)]
    };
  })).slice(0, 10),

  // Experience Recommendations  
  experienceRecommendations: shuffleArray(Array.from({ length: 400 }, (_, i) => {
    const experienceTypes = [
      'VIP Program Upgrade', 'Personal Account Manager', 'Exclusive Tournaments',
      'Live Dealer Experience', 'Mobile App Features', 'Loyalty Program Benefits',
      'Custom Game Limits', 'Priority Support', 'Exclusive Events'
    ];
    
    const benefits = [
      'Faster withdrawals and higher limits',
      'Dedicated support and personalized service',
      'Access to high-stakes tournaments',
      'Premium live dealer tables',
      'Enhanced mobile gaming features',
      'Increased loyalty point earning rates',
      'Customizable betting limits',
      '24/7 priority customer support',
      'Invitation to exclusive casino events'
    ];
    
    const experienceType = experienceTypes[Math.floor(Math.random() * experienceTypes.length)];
    
    return {
      customerId: getRandomCustomerId(),
      location: generateLocation(),
      experienceType,
      title: experienceType,
      description: benefits[Math.floor(Math.random() * benefits.length)],
      implementation: [
        'Automatic enrollment', 'Contact support to activate', 
        'Available in account settings', 'Requires verification'
      ][Math.floor(Math.random() * 4)],
      timeToImplement: Math.floor(1 + Math.random() * 7) + ' days',
      expectedSatisfaction: Math.floor(75 + Math.random() * 25),
      retentionImpact: Math.floor(15 + Math.random() * 35) + '%',
      priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
      personalizedReason: [
        'Based on your gaming preferences',
        'Recommended for your activity level',
        'Perfect match for your VIP status',
        'Enhances your favorite games',
        'Improves your overall experience'
      ][Math.floor(Math.random() * 5)]
    };
  })).slice(0, 10)
};