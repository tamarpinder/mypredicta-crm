import { bahamianCustomers } from './bahamas-customers';

// Island Luck lottery games
export const lotteryGames = [
  'Daily Draw',
  'Pick 3',
  'Pick 4',
  'Lucky 5',
  'Mega 7',
  'Super 6',
  'Island Jackpot',
  'Paradise Prize',
  'Bahamas Bonus',
  'Weekend Windfall'
];

// Prize tiers
export const prizeTiers = {
  small: { min: 400, max: 2500, frequency: 0.6 },
  medium: { min: 2500, max: 25000, frequency: 0.3 },
  large: { min: 25000, max: 100000, frequency: 0.08 },
  jackpot: { min: 100000, max: 250000, frequency: 0.02 }
};

// Generate Bahamian winner names
const generateWinnerName = () => {
  const firstNames = [
    'Marcus', 'Destiny', 'Demetrius', 'Shantel', 'Gregory', 'Tamika', 'Kevin', 'Keisha',
    'Andre', 'Latoya', 'Michael', 'Jasmine', 'Christopher', 'Monique', 'Anthony', 'Tiffany',
    'James', 'Maria', 'David', 'Nicole', 'Robert', 'Ashley', 'William', 'Crystal',
    'John', 'Michelle', 'Joseph', 'Kimberly', 'Thomas', 'Stephanie', 'Charles', 'Jennifer',
    'Richard', 'Lisa', 'Daniel', 'Angela', 'Matthew', 'Sandra', 'Mark', 'Deborah',
    'Steven', 'Rachel', 'Paul', 'Carolyn', 'Andrew', 'Janet', 'Joshua', 'Catherine',
    'Kenneth', 'Patricia', 'Brian', 'Dorothy', 'George', 'Diane', 'Edward', 'Julie'
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
  
  return { firstName, lastName, fullName: `${firstName} ${lastName}` };
};

// Generate location
const generateLocation = () => {
  const locations = [
    { name: 'Nassau', weight: 0.4 },
    { name: 'Paradise Island', weight: 0.2 },
    { name: 'Freeport', weight: 0.15 },
    { name: 'Cable Beach', weight: 0.08 },
    { name: 'Marsh Harbour', weight: 0.05 },
    { name: 'George Town', weight: 0.04 },
    { name: 'Governor\'s Harbour', weight: 0.03 },
    { name: 'Harbour Island', weight: 0.02 },
    { name: 'Alice Town', weight: 0.01 },
    { name: 'Andros Town', weight: 0.01 },
    { name: 'Fresh Creek', weight: 0.01 }
  ];
  
  const random = Math.random();
  let cumulative = 0;
  
  for (const location of locations) {
    cumulative += location.weight;
    if (random <= cumulative) {
      return location.name;
    }
  }
  
  return locations[0].name;
};

// Generate winning numbers based on game type
const generateWinningNumbers = (gameType: string): string => {
  switch (gameType) {
    case 'Pick 3':
      return Array.from({ length: 3 }, () => Math.floor(Math.random() * 10)).join('-');
    case 'Pick 4':
      return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('-');
    case 'Lucky 5':
      return Array.from({ length: 5 }, () => Math.floor(Math.random() * 36) + 1)
        .sort((a, b) => a - b)
        .join('-');
    case 'Mega 7':
      return Array.from({ length: 7 }, () => Math.floor(Math.random() * 40) + 1)
        .sort((a, b) => a - b)
        .join('-');
    case 'Super 6':
      return Array.from({ length: 6 }, () => Math.floor(Math.random() * 49) + 1)
        .sort((a, b) => a - b)
        .join('-');
    default:
      return Array.from({ length: 5 }, () => Math.floor(Math.random() * 50) + 1)
        .sort((a, b) => a - b)
        .join('-');
  }
};

// Generate prize amount based on tier
const generatePrizeAmount = (): number => {
  const random = Math.random();
  let tier: keyof typeof prizeTiers;
  
  if (random <= prizeTiers.small.frequency) {
    tier = 'small';
  } else if (random <= prizeTiers.small.frequency + prizeTiers.medium.frequency) {
    tier = 'medium';
  } else if (random <= prizeTiers.small.frequency + prizeTiers.medium.frequency + prizeTiers.large.frequency) {
    tier = 'large';
  } else {
    tier = 'jackpot';
  }
  
  const { min, max } = prizeTiers[tier];
  const amount = Math.floor(Math.random() * (max - min) + min);
  
  // Round to nice numbers for larger amounts
  if (amount > 10000) {
    return Math.round(amount / 1000) * 1000;
  } else if (amount > 1000) {
    return Math.round(amount / 100) * 100;
  } else {
    return Math.round(amount / 50) * 50;
  }
};

// Generate lottery winner
export interface LotteryWinner {
  id: string;
  winnerName: string;
  location: string;
  prizeAmount: number;
  gameType: string;
  winningNumbers: string;
  drawDate: string;
  claimStatus: 'pending' | 'claimed' | 'processing';
  claimDate?: string;
  ticketNumber: string;
  retailLocation?: string;
  isJackpot: boolean;
}

export const generateLotteryWinner = (date?: Date): LotteryWinner => {
  const winner = generateWinnerName();
  const location = generateLocation();
  const gameType = lotteryGames[Math.floor(Math.random() * lotteryGames.length)];
  const prizeAmount = generatePrizeAmount();
  const drawDate = date || new Date();
  
  // Determine claim status based on time
  let claimStatus: 'pending' | 'claimed' | 'processing' = 'pending';
  let claimDate: string | undefined;
  
  const random = Math.random();
  if (random > 0.7) {
    claimStatus = 'claimed';
    const claimDays = Math.floor(Math.random() * 7) + 1;
    const claimDateObj = new Date(drawDate);
    claimDateObj.setDate(claimDateObj.getDate() + claimDays);
    claimDate = claimDateObj.toISOString();
  } else if (random > 0.4) {
    claimStatus = 'processing';
  }
  
  return {
    id: `lottery_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    winnerName: winner.fullName,
    location,
    prizeAmount,
    gameType,
    winningNumbers: generateWinningNumbers(gameType),
    drawDate: drawDate.toISOString(),
    claimStatus,
    claimDate,
    ticketNumber: `ISL${Math.floor(Math.random() * 1000000000)}`,
    retailLocation: Math.random() > 0.5 ? `${location} Island Luck` : undefined,
    isJackpot: prizeAmount >= 100000
  };
};

// Generate historical lottery data
export const generateLotteryHistory = (days: number = 30): LotteryWinner[] => {
  const winners: LotteryWinner[] = [];
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate 5-20 winners per day
    const winnersPerDay = Math.floor(Math.random() * 15) + 5;
    
    for (let j = 0; j < winnersPerDay; j++) {
      winners.push(generateLotteryWinner(date));
    }
  }
  
  return winners.sort((a, b) => new Date(b.drawDate).getTime() - new Date(a.drawDate).getTime());
};

// Lottery statistics
export interface LotteryStats {
  totalWinners: number;
  totalPrizeAmount: number;
  averagePrizeAmount: number;
  largestPrize: number;
  jackpotWinners: number;
  winnersByLocation: Record<string, number>;
  winnersByGame: Record<string, number>;
  prizesByTier: {
    small: number;
    medium: number;
    large: number;
    jackpot: number;
  };
  recentWinners: LotteryWinner[];
}

export const calculateLotteryStats = (winners: LotteryWinner[]): LotteryStats => {
  const totalPrizeAmount = winners.reduce((sum, w) => sum + w.prizeAmount, 0);
  const jackpotWinners = winners.filter(w => w.isJackpot).length;
  
  const winnersByLocation: Record<string, number> = {};
  const winnersByGame: Record<string, number> = {};
  
  winners.forEach(winner => {
    winnersByLocation[winner.location] = (winnersByLocation[winner.location] || 0) + 1;
    winnersByGame[winner.gameType] = (winnersByGame[winner.gameType] || 0) + 1;
  });
  
  const prizesByTier = {
    small: winners.filter(w => w.prizeAmount >= prizeTiers.small.min && w.prizeAmount < prizeTiers.small.max).length,
    medium: winners.filter(w => w.prizeAmount >= prizeTiers.medium.min && w.prizeAmount < prizeTiers.medium.max).length,
    large: winners.filter(w => w.prizeAmount >= prizeTiers.large.min && w.prizeAmount < prizeTiers.large.max).length,
    jackpot: winners.filter(w => w.prizeAmount >= prizeTiers.jackpot.min).length
  };
  
  return {
    totalWinners: winners.length,
    totalPrizeAmount,
    averagePrizeAmount: Math.round(totalPrizeAmount / winners.length),
    largestPrize: Math.max(...winners.map(w => w.prizeAmount)),
    jackpotWinners,
    winnersByLocation,
    winnersByGame,
    prizesByTier,
    recentWinners: winners.slice(0, 10)
  };
};

// Export sample lottery data
export const sampleLotteryWinners = generateLotteryHistory(30);
export const lotteryStats = calculateLotteryStats(sampleLotteryWinners);