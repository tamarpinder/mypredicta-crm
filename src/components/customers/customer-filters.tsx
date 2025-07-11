'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface CustomerFiltersProps {
  filters: {
    segment: string;
    status: string;
    vipLevel: string;
    country: string;
    search: string;
  };
  onFiltersChange: (filters: {
    segment: string;
    status: string;
    vipLevel: string;
    country: string;
    search: string;
  }) => void;
}

export function CustomerFilters({ filters, onFiltersChange }: CustomerFiltersProps) {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilter = (key: string) => {
    const value = key === 'search' ? '' : 'all';
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      segment: 'all',
      status: 'all',
      vipLevel: 'all',
      country: 'all',
      search: ''
    });
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => 
    key === 'search' ? value !== '' : value !== 'all' && value !== ''
  ).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search customers by name, email, or phone..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="segment">Customer Segment</Label>
          <Select value={filters.segment} onValueChange={(value) => updateFilter('segment', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Segments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              <SelectItem value="high-value">High Value</SelectItem>
              <SelectItem value="regular">Regular</SelectItem>
              <SelectItem value="at-risk">At Risk</SelectItem>
              <SelectItem value="churned">Churned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Account Status</Label>
          <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="banned">Banned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vipLevel">VIP Level</Label>
          <Select value={filters.vipLevel} onValueChange={(value) => updateFilter('vipLevel', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="platinum">Platinum</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="silver">Silver</SelectItem>
              <SelectItem value="bronze">Bronze</SelectItem>
              <SelectItem value="none">Non-VIP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Location</Label>
          <Select value={filters.country} onValueChange={(value) => updateFilter('country', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Nassau">Nassau</SelectItem>
              <SelectItem value="Freeport">Freeport</SelectItem>
              <SelectItem value="Marsh Harbour">Marsh Harbour</SelectItem>
              <SelectItem value="Exuma">Exuma</SelectItem>
              <SelectItem value="Andros Town">Andros Town</SelectItem>
              <SelectItem value="Governor's Harbour">Governor&apos;s Harbour</SelectItem>
              <SelectItem value="Cable Beach">Cable Beach</SelectItem>
              <SelectItem value="Paradise Island">Paradise Island</SelectItem>
              <SelectItem value="Lyford Cay">Lyford Cay</SelectItem>
              <SelectItem value="Old Fort Bay">Old Fort Bay</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: {filters.search}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => clearFilter('search')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {filters.segment && (
            <Badge variant="secondary" className="gap-1">
              Segment: {filters.segment}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => clearFilter('segment')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {filters.status && (
            <Badge variant="secondary" className="gap-1">
              Status: {filters.status}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => clearFilter('status')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {filters.vipLevel && (
            <Badge variant="secondary" className="gap-1">
              VIP: {filters.vipLevel}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => clearFilter('vipLevel')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {filters.country && (
            <Badge variant="secondary" className="gap-1">
              Location: {filters.country}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => clearFilter('country')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}