'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { CustomersTable } from '@/components/customers/customers-table';
import { CustomerFilters } from '@/components/customers/customer-filters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PremiumCard, PremiumCardContent, PremiumCardHeader, PremiumCardTitle } from '@/components/ui/premium-card';
import { 
  Users, 
  UserPlus, 
  Download, 
  Filter,
  Star,
  AlertTriangle,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useState } from 'react';
import { enhancedCustomers } from '@/data/enhanced-mock-data';
import { formatCurrency, formatNumberWithCommas } from '@/utils/format';

export default function CustomersPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    segment: 'all',
    status: 'all',
    vipLevel: 'all',
    country: 'all',
    search: '',
    lastActivityDays: 'all'
  });

  // Calculate customer statistics
  const totalCustomers = enhancedCustomers.length;
  const activeCustomers = enhancedCustomers.filter(c => c.status === 'active').length;
  const vipCustomers = enhancedCustomers.filter(c => c.isVip).length;
  const highRiskCustomers = enhancedCustomers.filter(c => c.churnScore > 0.7).length;
  const averageLifetimeValue = enhancedCustomers.reduce((sum, c) => sum + c.lifetimeValue, 0) / totalCustomers;

  const handleExport = () => {
    
  };

  const handleAddCustomer = () => {
    
  };

  const statsCards = [
    {
      title: 'Total Customers',
      value: formatNumberWithCommas(totalCustomers),
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Active Customers',
      value: formatNumberWithCommas(activeCustomers),
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'VIP Customers',
      value: formatNumberWithCommas(vipCustomers),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'High Risk',
      value: formatNumberWithCommas(highRiskCustomers),
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  const actions = (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className="gap-1 text-white border-white/30">
        <TrendingUp className="h-3 w-3" />
        Avg LTV: {formatCurrency(averageLifetimeValue)}
      </Badge>
      <Button variant="outline" onClick={handleExport} className="gap-2">
        <Download className="h-4 w-4" />
        Export
      </Button>
      <Button onClick={handleAddCustomer} className="gap-2">
        <UserPlus className="h-4 w-4" />
        Add Customer
      </Button>
    </div>
  );

  return (
    <DashboardLayout 
      title="Customer Management" 
      description="Manage and analyze your customer base with advanced filtering and insights"
      actions={actions}
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <PremiumCard key={index} variant="stats" className="hover:scale-105 transition-transform duration-300">
            <PremiumCardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-[var(--color-predicta-navy)]">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-predicta-gold)]/10 to-transparent"></div>
                  <stat.icon className={`h-6 w-6 ${stat.color} relative z-10`} />
                </div>
              </div>
            </PremiumCardContent>
          </PremiumCard>
        ))}
      </div>

      {/* Filters */}
      <PremiumCard variant="gradient" className="mb-6">
        <PremiumCardHeader>
          <div className="flex items-center justify-between">
            <PremiumCardTitle className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5 text-[var(--color-predicta-gold)]" />
              Customer Filters
            </PremiumCardTitle>
            <Button variant="outline" size="sm" className="border-[var(--color-predicta-gold)]/30 text-[var(--color-predicta-navy)] hover:bg-[var(--color-predicta-gold)]/10">
              Reset Filters
            </Button>
          </div>
        </PremiumCardHeader>
        <PremiumCardContent>
          <CustomerFilters 
            filters={selectedFilters}
            onFiltersChange={setSelectedFilters}
          />
        </PremiumCardContent>
      </PremiumCard>

      {/* Customer Table */}
      <PremiumCard variant="default">
        <PremiumCardHeader>
          <PremiumCardTitle className="text-lg font-semibold">
            Customer Database
          </PremiumCardTitle>
          <p className="text-sm text-muted-foreground">
            Complete customer information with gambling history and risk assessment
          </p>
        </PremiumCardHeader>
        <PremiumCardContent>
          <CustomersTable 
            customers={enhancedCustomers}
            filters={selectedFilters}
          />
        </PremiumCardContent>
      </PremiumCard>
    </DashboardLayout>
  );
}