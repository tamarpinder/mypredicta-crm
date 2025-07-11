'use client';

import { useEffect } from 'react';
import { toastSuccess, toastWarning, toastError, toastInfo } from '@/hooks/use-toast';
import { generateLotteryWinner } from '@/data/lottery-data';
import { formatCurrency } from '@/utils/format';

// Generate lottery winner notification
const generateLotteryNotification = () => {
  const winner = generateLotteryWinner();
  const prizeFormatted = formatCurrency(winner.prizeAmount);
  
  // Different messages based on prize amount
  if (winner.isJackpot) {
    return {
      title: '🎰 JACKPOT WINNER!',
      description: `${winner.winnerName} from ${winner.location} won ${prizeFormatted} on ${winner.gameType}!`
    };
  } else if (winner.prizeAmount >= 25000) {
    return {
      title: '💰 Big Winner Alert',
      description: `${winner.winnerName} from ${winner.location} won ${prizeFormatted} on ${winner.gameType}`
    };
  } else if (winner.prizeAmount >= 2500) {
    return {
      title: '🎉 Lucky Winner',
      description: `${winner.winnerName} from ${winner.location} won ${prizeFormatted} on ${winner.gameType}`
    };
  } else {
    return {
      title: '🎲 Island Luck Winner',
      description: `${winner.location} player won ${prizeFormatted} on ${winner.gameType}`
    };
  }
};

const NOTIFICATION_TYPES = [
  {
    type: 'success',
    notifications: [
      { title: 'New Customer Registered', description: 'Greg Williams from Bimini just signed up' },
      { title: 'New Customer Registered', description: 'Maria Ferguson from Nassau deposited $5,000' },
      { title: 'New Customer Registered', description: 'James Thompson from Paradise Island joined VIP' },
      { title: 'Payment Processed', description: 'Customer from Freeport deposited $3,500' },
      { title: 'VIP Status Upgraded', description: 'Michael Rolle from Nassau upgraded to Platinum' },
      { title: 'Big Win Alert', description: 'Player from Exuma won $12,500 on Blackjack' },
      { title: 'Revenue Milestone', description: 'Paradise Island location exceeded daily target' },
      { title: 'Campaign Success', description: 'Nassau weekend promo reached 89% engagement' },
    ]
  },
  {
    type: 'warning',
    notifications: [
      { title: 'High Churn Risk', description: '3 VIP players from Paradise Island showing low activity' },
      { title: 'Location Alert', description: 'Freeport revenue down 12% this week' },
      { title: 'Verification Pending', description: '8 accounts from Nassau awaiting documents' },
      { title: 'Low Activity Warning', description: 'Eleuthera players engagement dropped 18%' },
      { title: 'Deposit Trend Alert', description: 'Bimini average deposits decreased 15%' },
      { title: 'Game Performance', description: 'Abaco lottery sales below projections' },
    ]
  },
  {
    type: 'error',
    notifications: [
      { title: 'Payment Failed', description: 'Withdrawal for Nassau customer failed - $8,000' },
      { title: 'Account Issue', description: 'Suspicious activity detected - Freeport player' },
      { title: 'System Alert', description: 'Paradise Island terminal connection lost' },
      { title: 'Compliance Alert', description: 'Missing KYC documents for 5 Nassau accounts' },
    ]
  },
  {
    type: 'info',
    notifications: [
      { title: 'Island Report Ready', description: 'Nassau weekly performance report available' },
      { title: 'Maintenance Notice', description: 'Freeport systems update tonight 2-4 AM' },
      { title: 'Feature Update', description: 'New Bahamas-specific promotions launched' },
      { title: 'Tournament Starting', description: 'Paradise Island Poker Championship begins' },
      { title: 'Weather Advisory', description: 'Storm warning may affect Exuma operations' },
      { title: 'Holiday Schedule', description: 'Junkanoo festival hours now active' },
    ]
  }
];

export function useLiveNotifications() {
  useEffect(() => {
    const showRandomNotification = () => {
      // 30% chance to show a lottery winner notification
      if (Math.random() < 0.3) {
        const lotteryNotification = generateLotteryNotification();
        toastSuccess(lotteryNotification.title, lotteryNotification.description);
        return;
      }
      
      const typeData = NOTIFICATION_TYPES[Math.floor(Math.random() * NOTIFICATION_TYPES.length)];
      const notification = typeData.notifications[Math.floor(Math.random() * typeData.notifications.length)];
      
      switch (typeData.type) {
        case 'success':
          toastSuccess(notification.title, notification.description);
          break;
        case 'warning':
          toastWarning(notification.title, notification.description);
          break;
        case 'error':
          toastError(notification.title, notification.description);
          break;
        case 'info':
          toastInfo(notification.title, notification.description);
          break;
      }
    };

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(showRandomNotification, 3000);
    
    // Then show notifications every 15-30 seconds
    const interval = setInterval(() => {
      showRandomNotification();
    }, Math.random() * 15000 + 15000); // 15-30 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);
}

export function triggerTestNotification() {
  const notifications = [
    () => toastSuccess('Test Notification', 'This is a test success notification'),
    () => toastWarning('Test Warning', 'This is a test warning notification'),
    () => toastError('Test Error', 'This is a test error notification'),
    () => toastInfo('Test Info', 'This is a test info notification'),
  ];
  
  const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
  randomNotification();
}