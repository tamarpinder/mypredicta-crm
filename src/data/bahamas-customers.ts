import { Customer } from '@/types';

// Bahamas-specific names and locations
const bahamianFirstNames = [
  'Marcus', 'Destiny', 'Demetrius', 'Shantel', 'Gregory', 'Tamika', 'Kevin', 'Keisha',
  'Andre', 'Latoya', 'Michael', 'Jasmine', 'Christopher', 'Monique', 'Anthony', 'Tiffany',
  'James', 'Maria', 'David', 'Nicole', 'Robert', 'Ashley', 'William', 'Crystal',
  'John', 'Michelle', 'Joseph', 'Kimberly', 'Thomas', 'Stephanie', 'Charles', 'Jennifer'
];

const bahamianLastNames = [
  'Williams', 'Johnson', 'Smith', 'Rolle', 'Ferguson', 'Thompson', 'Brown', 'Davis',
  'Miller', 'Wilson', 'Taylor', 'Jones', 'White', 'Robinson', 'Clarke', 'Gibson',
  'Russell', 'Major', 'Sands', 'Butler', 'Roberts', 'Moss', 'Stubbs', 'Bethel',
  'Adderley', 'Knowles', 'Pinder', 'Cooper', 'McKenzie', 'Munroe', 'Forbes', 'Dean'
];

const bahamianLocations = [
  { city: 'Nassau', island: 'New Providence' },
  { city: 'Freeport', island: 'Grand Bahama' },
  { city: 'Paradise Island', island: 'New Providence' },
  { city: 'Cable Beach', island: 'New Providence' },
  { city: 'Lyford Cay', island: 'New Providence' },
  { city: 'Old Fort Bay', island: 'New Providence' },
  { city: 'Marsh Harbour', island: 'Abaco' },
  { city: 'Hope Town', island: 'Abaco' },
  { city: 'George Town', island: 'Exuma' },
  { city: 'Governor\'s Harbour', island: 'Eleuthera' },
  { city: 'Harbour Island', island: 'Eleuthera' },
  { city: 'Alice Town', island: 'Bimini' },
  { city: 'Bailey Town', island: 'Bimini' },
  { city: 'Andros Town', island: 'Andros' },
  { city: 'Fresh Creek', island: 'Andros' },
  { city: 'Cockburn Town', island: 'San Salvador' },
  { city: 'Matthew Town', island: 'Inagua' },
  { city: 'Colonel Hill', island: 'Crooked Island' }
];

function generateBahamianCustomer(index: number): Customer {
  const firstName = bahamianFirstNames[Math.floor(Math.random() * bahamianFirstNames.length)];
  const lastName = bahamianLastNames[Math.floor(Math.random() * bahamianLastNames.length)];
  const location = bahamianLocations[Math.floor(Math.random() * bahamianLocations.length)];
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@bahamasmail.com`;
  const phone = `+1242${Math.floor(Math.random() * 900 + 100)}${Math.floor(Math.random() * 9000 + 1000)}`;
  
  const isVip = Math.random() < 0.15; // 15% VIP rate
  const lifetimeValue = isVip 
    ? Math.floor(Math.random() * 100000 + 50000) 
    : Math.floor(Math.random() * 30000 + 1000);
  
  const segments = ['high-value', 'regular', 'at-risk', 'new', 'churned'];
  const statuses = ['active', 'active', 'active', 'inactive', 'suspended']; // More active
  
  const birthYear = 1960 + Math.floor(Math.random() * 40);
  const registrationYear = 2020 + Math.floor(Math.random() * 4);
  
  return {
    id: `customer_${index + 1}`,
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth: `${birthYear}-${String(Math.floor(Math.random() * 12 + 1)).padStart(2, '0')}-${String(Math.floor(Math.random() * 28 + 1)).padStart(2, '0')}T00:00:00.000Z`,
    gender: Math.random() < 0.5 ? 'male' : 'female',
    country: 'Bahamas',
    city: location.city,
    registrationDate: `${registrationYear}-${String(Math.floor(Math.random() * 12 + 1)).padStart(2, '0')}-${String(Math.floor(Math.random() * 28 + 1)).padStart(2, '0')}T00:00:00.000Z`,
    lastLoginDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastActivity: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    isVip,
    vipLevel: isVip ? ['silver', 'gold', 'platinum'][Math.floor(Math.random() * 3)] : null,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lifetimeValue,
    totalDeposits: Math.floor(lifetimeValue * 1.5),
    totalWithdrawals: Math.floor(lifetimeValue * 0.8),
    totalBets: Math.floor(lifetimeValue * 2.5),
    totalWins: Math.floor(lifetimeValue * 1.1),
    totalLosses: Math.floor(lifetimeValue * 1.4),
    favoriteGame: ['Sports Betting', 'Blackjack', 'Slots', 'Roulette', 'Poker', 'Lottery'][Math.floor(Math.random() * 6)],
    churnScore: Math.random() * 0.9,
    segment: segments[Math.floor(Math.random() * segments.length)],
    marketingConsent: Math.random() < 0.7,
    communicationPreference: ['email', 'sms', 'push'][Math.floor(Math.random() * 3)]
  };
}

export const bahamianCustomers: Customer[] = Array.from({ length: 50 }, (_, i) => generateBahamianCustomer(i));