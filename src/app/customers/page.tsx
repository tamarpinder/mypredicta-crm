'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { CustomersTable } from '@/components/customers/customers-table';
import { CustomerFilters } from '@/components/customers/customer-filters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { sampleCustomers } from '@/data/sample-data';
import { formatCurrency, formatNumberWithCommas } from '@/utils/format';

export default function CustomersPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    segment: 'all',
    status: 'all',
    vipLevel: 'all',
    country: 'all',
    search: ''
  });

  // Calculate customer statistics
  const totalCustomers = sampleCustomers.length;
  const activeCustomers = sampleCustomers.filter(c => c.status === 'active').length;
  const vipCustomers = sampleCustomers.filter(c => c.isVip).length;
  const highRiskCustomers = sampleCustomers.filter(c => c.churnScore > 0.7).length;
  const averageLifetimeValue = sampleCustomers.reduce((sum, c) => sum + c.lifetimeValue, 0) / totalCustomers;

  const handleExport = () => {
    console.log('Exporting customer data...');
  };

  const handleAddCustomer = () => {
    console.log('Adding new customer...');
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
      <Badge variant="outline" className="gap-1">
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
          <Card key={index} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Customer Filters
            </CardTitle>
            <Button variant="outline" size="sm">
              Reset Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <CustomerFilters 
            filters={selectedFilters}
            onFiltersChange={setSelectedFilters}
          />
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Customer Database
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Complete customer information with gambling history and risk assessment
          </p>
        </CardHeader>
        <CardContent>
          <CustomersTable 
            customers={sampleCustomers}
            filters={selectedFilters}
          />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}