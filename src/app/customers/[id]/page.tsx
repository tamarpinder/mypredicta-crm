'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Activity, 
  Star, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Gamepad2,
  CreditCard,
  MessageSquare,
  Edit,
  Settings,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { sampleCustomers, sampleTransactions } from '@/data/sample-data';
import { useParams } from 'next/navigation';

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.id as string;
  
  // Find the customer (in real app, this would be from API)
  const customer = sampleCustomers.find(c => c.id === customerId);
  
  if (!customer) {
    return (
      <DashboardLayout title="Customer Not Found">
        <Card>
          <CardContent className="p-6">
            <p>Customer not found.</p>
            <Link href="/customers">
              <Button className="mt-4">Back to Customers</Button>
            </Link>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  const customerTransactions = sampleTransactions.filter(t => t.customerId === customerId);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      inactive: { variant: 'secondary' as const, color: 'bg-gray-100 text-gray-800' },
      suspended: { variant: 'destructive' as const, color: 'bg-yellow-100 text-yellow-800' },
      banned: { variant: 'destructive' as const, color: 'bg-red-100 text-red-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
    
    return (
      <Badge variant={config.variant} className={config.color}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getVipBadge = () => {
    if (!customer.isVip) return null;
    
    const vipConfig = {
      platinum: { color: 'bg-gray-100 text-gray-800', icon: '💎' },
      gold: { color: 'bg-yellow-100 text-yellow-800', icon: '🏆' },
      silver: { color: 'bg-gray-100 text-gray-600', icon: '🥈' },
      bronze: { color: 'bg-orange-100 text-orange-800', icon: '🥉' }
    };

    const config = vipConfig[customer.vipLevel as keyof typeof vipConfig];
    
    return (
      <Badge variant="outline" className={`${config?.color} gap-1`}>
        <span>{config?.icon}</span>
        {customer.vipLevel ? (customer.vipLevel.charAt(0).toUpperCase() + customer.vipLevel.slice(1)) : 'Standard'} VIP
      </Badge>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const actions = (
    <div className="flex items-center gap-3">
      <Link href="/customers">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Customers
        </Button>
      </Link>
      <Button variant="outline" className="gap-2">
        <Edit className="h-4 w-4" />
        Edit Customer
      </Button>
      <Button variant="outline" className="gap-2">
        <MessageSquare className="h-4 w-4" />
        Send Message
      </Button>
      <Button className="gap-2">
        <Settings className="h-4 w-4" />
        Manage Account
      </Button>
    </div>
  );

  return (
    <DashboardLayout 
      title={`${customer.firstName} ${customer.lastName}`}
      description={`Customer ID: ${customer.id} • ${customer.email}`}
      actions={actions}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Profile */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">
                  {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">
                  {customer.firstName} {customer.lastName}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusBadge(customer.status)}
                  {getVipBadge()}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{customer.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{customer.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{customer.city}, {customer.country}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Born {formatDate(customer.dateOfBirth)}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Registration</span>
                <span className="text-sm font-medium">{formatDate(customer.registrationDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Login</span>
                <span className="text-sm font-medium">{formatDate(customer.lastLoginDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Favorite Game</span>
                <span className="text-sm font-medium">{customer.favoriteGame}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary & Risk Assessment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Financial Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(customer.lifetimeValue)}
                  </div>
                  <div className="text-sm text-muted-foreground">Lifetime Value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(customer.totalDeposits)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Deposits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {formatCurrency(customer.totalWithdrawals)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Withdrawals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(customer.totalBets)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Bets</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {customer.churnScore >= 0.7 ? (
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                    ) : customer.churnScore >= 0.4 ? (
                      <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    ) : (
                      <TrendingUp className="h-6 w-6 text-green-500" />
                    )}
                    <span className="text-2xl font-bold">
                      {(customer.churnScore * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">Churn Risk</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="h-6 w-6 text-yellow-500" />
                    <span className="text-2xl font-bold capitalize">
                      {customer.segment}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">Customer Segment</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Activity className="h-6 w-6 text-blue-500" />
                    <span className="text-2xl font-bold">
                      {customer.marketingConsent ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">Marketing Consent</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Betting Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5" />
                Betting Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    <span className="text-2xl font-bold text-green-600">
                      {formatCurrency(customer.totalWins)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">Total Wins</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingDown className="h-6 w-6 text-red-500" />
                    <span className="text-2xl font-bold text-red-600">
                      {formatCurrency(customer.totalLosses)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">Total Losses</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customerTransactions.length > 0 ? (
                <div className="space-y-4">
                  {customerTransactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <CreditCard className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(transaction.date)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(transaction.amount)}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No recent transactions found
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}