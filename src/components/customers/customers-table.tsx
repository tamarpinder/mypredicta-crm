'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  ChevronDown, 
  ChevronUp, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Mail, 
  Phone, 
  MessageSquare,
  AlertTriangle,
  Star,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign
} from 'lucide-react';
import { Customer } from '@/types';
import Link from 'next/link';
import { formatCurrency } from '@/utils/format';

interface CustomersTableProps {
  customers: Customer[];
  filters: {
    segment: string;
    status: string;
    vipLevel: string;
    country: string;
    search: string;
  };
}

type SortField = 'name' | 'email' | 'lifetimeValue' | 'registrationDate' | 'lastLoginDate' | 'churnScore';
type SortDirection = 'asc' | 'desc';

export function CustomersTable({ customers, filters }: CustomersTableProps) {
  const [sortField, setSortField] = useState<SortField>('lifetimeValue');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and sort customers
  const filteredAndSortedCustomers = useMemo(() => {
    const filtered = customers.filter(customer => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          customer.firstName.toLowerCase().includes(searchLower) ||
          customer.lastName.toLowerCase().includes(searchLower) ||
          customer.email.toLowerCase().includes(searchLower) ||
          customer.phone.includes(filters.search) ||
          customer.id.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Segment filter
      if (filters.segment && filters.segment !== 'all' && customer.segment !== filters.segment) return false;

      // Status filter
      if (filters.status && filters.status !== 'all' && customer.status !== filters.status) return false;

      // VIP Level filter
      if (filters.vipLevel && filters.vipLevel !== 'all') {
        if (filters.vipLevel === 'none' && customer.isVip) return false;
        if (filters.vipLevel !== 'none' && customer.vipLevel !== filters.vipLevel) return false;
      }

      // Country filter
      if (filters.country && filters.country !== 'all' && customer.country !== filters.country) return false;

      return true;
    });

    // Sort customers
    filtered.sort((a, b) => {
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      switch (sortField) {
        case 'name':
          aValue = `${a.firstName} ${a.lastName}`;
          bValue = `${b.firstName} ${b.lastName}`;
          break;
        case 'email':
          aValue = a.email;
          bValue = b.email;
          break;
        case 'lifetimeValue':
          aValue = a.lifetimeValue;
          bValue = b.lifetimeValue;
          break;
        case 'registrationDate':
          aValue = new Date(a.registrationDate);
          bValue = new Date(b.registrationDate);
          break;
        case 'lastLoginDate':
          aValue = new Date(a.lastLoginDate);
          bValue = new Date(b.lastLoginDate);
          break;
        case 'churnScore':
          aValue = a.churnScore;
          bValue = b.churnScore;
          break;
        default:
          aValue = a.lifetimeValue;
          bValue = b.lifetimeValue;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [customers, filters, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredAndSortedCustomers.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const toggleCustomerSelection = (customerId: string) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const toggleAllCustomers = () => {
    if (selectedCustomers.length === paginatedCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(paginatedCustomers.map(c => c.id));
    }
  };

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

  const getSegmentBadge = (segment: string) => {
    const segmentConfig = {
      'high-value': { color: 'bg-purple-100 text-purple-800', icon: Star },
      'regular': { color: 'bg-blue-100 text-blue-800', icon: Activity },
      'at-risk': { color: 'bg-orange-100 text-orange-800', icon: AlertTriangle },
      'churned': { color: 'bg-red-100 text-red-800', icon: TrendingDown }
    };

    const config = segmentConfig[segment as keyof typeof segmentConfig];
    const Icon = config?.icon || Activity;
    
    return (
      <Badge variant="outline" className={`${config?.color} gap-1`}>
        <Icon className="h-3 w-3" />
        {segment.charAt(0).toUpperCase() + segment.slice(1)}
      </Badge>
    );
  };

  const getVipBadge = (customer: Customer) => {
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
        {customer.vipLevel?.charAt(0).toUpperCase() + customer.vipLevel?.slice(1)}
      </Badge>
    );
  };

  const getRiskIndicator = (churnScore: number) => {
    if (churnScore >= 0.7) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    } else if (churnScore >= 0.4) {
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    } else {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    }
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(field)}
      className="h-auto p-0 font-semibold text-left justify-start hover:bg-transparent"
    >
      {children}
      {sortField === field && (
        sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
      )}
    </Button>
  );

  return (
    <div className="space-y-4">
      {/* Table Actions */}
      {selectedCustomers.length > 0 && (
        <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
          <span className="text-sm text-muted-foreground">
            {selectedCustomers.length} customer{selectedCustomers.length === 1 ? '' : 's'} selected
          </span>
          <Button variant="outline" size="sm" className="gap-1">
            <Mail className="h-4 w-4" />
            Send Email
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <MessageSquare className="h-4 w-4" />
            Send SMS
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Star className="h-4 w-4" />
            Update Segment
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedCustomers.length === paginatedCustomers.length}
                  onCheckedChange={toggleAllCustomers}
                />
              </TableHead>
              <TableHead>
                <SortHeader field="name">Customer</SortHeader>
              </TableHead>
              <TableHead>
                <SortHeader field="email">Contact</SortHeader>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Segment</TableHead>
              <TableHead>
                <SortHeader field="lifetimeValue">Lifetime Value</SortHeader>
              </TableHead>
              <TableHead>
                <SortHeader field="lastLoginDate">Last Activity</SortHeader>
              </TableHead>
              <TableHead>
                <SortHeader field="churnScore">Risk</SortHeader>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={() => toggleCustomerSelection(customer.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {customer.firstName} {customer.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ID: {customer.id}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">{customer.email}</div>
                    <div className="text-sm text-muted-foreground">{customer.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {getStatusBadge(customer.status)}
                    {getVipBadge(customer)}
                  </div>
                </TableCell>
                <TableCell>
                  {getSegmentBadge(customer.segment)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium">
                      {formatCurrency(customer.lifetimeValue)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {formatDate(customer.lastLoginDate)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getRiskIndicator(customer.churnScore)}
                    <span className="text-sm">
                      {(customer.churnScore * 100).toFixed(0)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/customers/${customer.id}`} className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          View Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Customer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Call Customer
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Send SMS
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedCustomers.length)} of {filteredAndSortedCustomers.length} customers
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}