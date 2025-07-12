'use client';

import { Customer, Transaction, Campaign, GameMetrics, DashboardMetrics, AIInsights } from '@/types';
import { generateCustomers, generateTransactions, generateCampaigns, generateGameMetrics, generateDashboardMetrics, generateAIInsights } from './mock-data-generator';

// Lazy data provider with caching
class LazyDataProvider {
  private cache = new Map<string, unknown>();
  private generating = new Map<string, Promise<unknown>>();

  async getCustomers(count: number = 1000): Promise<Customer[]> {
    const key = `customers_${count}`;
    
    if (this.cache.has(key)) {
      return this.cache.get(key) as any;
    }

    if (this.generating.has(key)) {
      return this.generating.get(key) as any;
    }

    const promise = new Promise<Customer[]>((resolve) => {
      // Use requestIdleCallback for better performance
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        requestIdleCallback(() => {
          const customers = generateCustomers(count);
          this.cache.set(key, customers);
          this.generating.delete(key);
          resolve(customers);
        });
      } else {
        // Fallback for environments without requestIdleCallback
        setTimeout(() => {
          const customers = generateCustomers(count);
          this.cache.set(key, customers);
          this.generating.delete(key);
          resolve(customers);
        }, 0);
      }
    });

    this.generating.set(key, promise);
    return promise;
  }

  async getTransactions(customers: Customer[], count: number = 10000): Promise<Transaction[]> {
    const key = `transactions_${customers.length}_${count}`;
    
    if (this.cache.has(key)) {
      return this.cache.get(key) as any;
    }

    if (this.generating.has(key)) {
      return this.generating.get(key) as any;
    }

    const promise = new Promise<Transaction[]>((resolve) => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        requestIdleCallback(() => {
          const transactions = generateTransactions(customers, count);
          this.cache.set(key, transactions);
          this.generating.delete(key);
          resolve(transactions);
        });
      } else {
        setTimeout(() => {
          const transactions = generateTransactions(customers, count);
          this.cache.set(key, transactions);
          this.generating.delete(key);
          resolve(transactions);
        }, 0);
      }
    });

    this.generating.set(key, promise);
    return promise;
  }

  async getCampaigns(count: number = 25): Promise<Campaign[]> {
    const key = `campaigns_${count}`;
    
    if (this.cache.has(key)) {
      return this.cache.get(key) as any;
    }

    if (this.generating.has(key)) {
      return this.generating.get(key) as any;
    }

    const promise = new Promise<Campaign[]>((resolve) => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        requestIdleCallback(() => {
          const campaigns = generateCampaigns(count);
          this.cache.set(key, campaigns);
          this.generating.delete(key);
          resolve(campaigns);
        });
      } else {
        setTimeout(() => {
          const campaigns = generateCampaigns(count);
          this.cache.set(key, campaigns);
          this.generating.delete(key);
          resolve(campaigns);
        }, 0);
      }
    });

    this.generating.set(key, promise);
    return promise;
  }

  async getGameMetrics(): Promise<GameMetrics[]> {
    const key = 'game_metrics';
    
    if (this.cache.has(key)) {
      return this.cache.get(key) as any;
    }

    if (this.generating.has(key)) {
      return this.generating.get(key) as any;
    }

    const promise = new Promise<GameMetrics[]>((resolve) => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        requestIdleCallback(() => {
          const gameMetrics = generateGameMetrics();
          this.cache.set(key, gameMetrics);
          this.generating.delete(key);
          resolve(gameMetrics);
        });
      } else {
        setTimeout(() => {
          const gameMetrics = generateGameMetrics();
          this.cache.set(key, gameMetrics);
          this.generating.delete(key);
          resolve(gameMetrics);
        }, 0);
      }
    });

    this.generating.set(key, promise);
    return promise;
  }

  async getDashboardMetrics(customers: Customer[], transactions: Transaction[]): Promise<DashboardMetrics> {
    const key = `dashboard_metrics_${customers.length}_${transactions.length}`;
    
    if (this.cache.has(key)) {
      return this.cache.get(key) as any;
    }

    if (this.generating.has(key)) {
      return this.generating.get(key) as any;
    }

    const promise = new Promise<DashboardMetrics>((resolve) => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        requestIdleCallback(() => {
          const dashboardMetrics = generateDashboardMetrics(customers, transactions);
          this.cache.set(key, dashboardMetrics);
          this.generating.delete(key);
          resolve(dashboardMetrics);
        });
      } else {
        setTimeout(() => {
          const dashboardMetrics = generateDashboardMetrics(customers, transactions);
          this.cache.set(key, dashboardMetrics);
          this.generating.delete(key);
          resolve(dashboardMetrics);
        }, 0);
      }
    });

    this.generating.set(key, promise);
    return promise;
  }

  async getAIInsights(customers: Customer[]): Promise<AIInsights> {
    const key = `ai_insights_${customers.length}`;
    
    if (this.cache.has(key)) {
      return this.cache.get(key) as any;
    }

    if (this.generating.has(key)) {
      return this.generating.get(key) as any;
    }

    const promise = new Promise<AIInsights>((resolve) => {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        requestIdleCallback(() => {
          const aiInsights = generateAIInsights(customers);
          this.cache.set(key, aiInsights);
          this.generating.delete(key);
          resolve(aiInsights);
        });
      } else {
        setTimeout(() => {
          const aiInsights = generateAIInsights(customers);
          this.cache.set(key, aiInsights);
          this.generating.delete(key);
          resolve(aiInsights);
        }, 0);
      }
    });

    this.generating.set(key, promise);
    return promise;
  }

  // Chunk data for better performance
  getCustomerChunk(customers: Customer[], page: number, pageSize: number = 50): Customer[] {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return customers.slice(startIndex, endIndex);
  }

  // Clear cache when needed
  clearCache(key?: string) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  // Get cache size for debugging
  getCacheSize(): number {
    return this.cache.size;
  }
}

export const lazyDataProvider = new LazyDataProvider();