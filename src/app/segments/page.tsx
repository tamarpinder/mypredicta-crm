'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { SegmentationBuilder } from '@/components/customers/segmentation-builder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Target, 
  Users, 
  TrendingUp, 
  Edit,
  Trash2,
  Play,
  Eye,
  Copy,
  Mail,
  MessageSquare,
  Calendar,
  BarChart3
} from 'lucide-react';
import { sampleCustomers } from '@/data/sample-data';

export default function SegmentsPage() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [segments, setSegments] = useState([
    {
      id: '1',
      name: 'High Value Players',
      description: 'Customers with LTV > $10,000',
      conditions: [
        { field: 'lifetimeValue', operator: 'greater_than', value: 10000 }
      ],
      matchedCustomers: 234,
      createdAt: '2024-01-15T00:00:00Z',
      lastUpdated: '2024-01-15T00:00:00Z',
      isActive: true
    },
    {
      id: '2',
      name: 'Churn Risk',
      description: 'Players at risk of churning',
      conditions: [
        { field: 'churnScore', operator: 'greater_than', value: 0.7 },
        { field: 'lastLoginDate', operator: 'less_than', value: '2024-01-01' }
      ],
      matchedCustomers: 89,
      createdAt: '2024-01-10T00:00:00Z',
      lastUpdated: '2024-01-18T00:00:00Z',
      isActive: true
    },
    {
      id: '3',
      name: 'VIP Candidates',
      description: 'Regular customers ready for VIP upgrade',
      conditions: [
        { field: 'isVip', operator: 'equals', value: false },
        { field: 'lifetimeValue', operator: 'greater_than', value: 5000 },
        { field: 'status', operator: 'equals', value: 'active' }
      ],
      matchedCustomers: 156,
      createdAt: '2024-01-12T00:00:00Z',
      lastUpdated: '2024-01-16T00:00:00Z',
      isActive: true
    },
    {
      id: '4',
      name: 'New Player Welcome',
      description: 'Recently registered players',
      conditions: [
        { field: 'registrationDate', operator: 'greater_than', value: '2024-01-01' }
      ],
      matchedCustomers: 312,
      createdAt: '2024-01-08T00:00:00Z',
      lastUpdated: '2024-01-20T00:00:00Z',
      isActive: false
    }
  ]);

  const handleCreateSegment = (segmentData: {
    name: string;
    description: string;
    criteria: Record<string, unknown>;
    customerCount: number;
  }) => {
    const newSegment = {
      id: Date.now().toString(),
      ...segmentData,
      lastUpdated: new Date().toISOString(),
      isActive: true
    };
    setSegments(prev => [newSegment, ...prev]);
    setShowBuilder(false);
  };

  const handleDeleteSegment = (segmentId: string) => {
    setSegments(prev => prev.filter(s => s.id !== segmentId));
  };

  const handleToggleActive = (segmentId: string) => {
    setSegments(prev => prev.map(s => 
      s.id === segmentId ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTotalCustomers = () => sampleCustomers.length;
  const getActiveSegments = () => segments.filter(s => s.isActive).length;
  const getTotalCoverage = () => {
    const uniqueCustomers = new Set();
    segments.forEach(segment => {
      if (segment.isActive) {
        for (let i = 0; i < segment.matchedCustomers; i++) {
          uniqueCustomers.add(`${segment.id}-${i}`);
        }
      }
    });
    return Math.min(uniqueCustomers.size, getTotalCustomers());
  };

  const getCoveragePercentage = () => {
    const total = getTotalCustomers();
    if (total === 0) return 0;
    return (getTotalCoverage() / total) * 100;
  };

  if (showBuilder) {
    return (
      <SegmentationBuilder
        customers={sampleCustomers}
        onSave={handleCreateSegment}
        onCancel={() => setShowBuilder(false)}
      />
    );
  }

  const actions = (
    <div className="flex items-center gap-3">
      <Button onClick={() => setShowBuilder(true)} className="gap-2">
        <Plus className="h-4 w-4" />
        Create Segment
      </Button>
    </div>
  );

  return (
    <DashboardLayout 
      title="Customer Segments" 
      description="Create and manage customer segments for targeted marketing"
      actions={actions}
    >
      {/* Segment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Segments
                </p>
                <p className="text-2xl font-bold">
                  {segments.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Active Segments
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {getActiveSegments()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <Play className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Coverage
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {getTotalCoverage().toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Coverage %
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {getCoveragePercentage().toFixed(1)}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Segments List */}
      <Card>
        <CardHeader>
          <CardTitle>All Segments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {segments.map((segment) => (
              <div key={segment.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{segment.name}</h3>
                        <Badge variant={segment.isActive ? "default" : "secondary"}>
                          {segment.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {segment.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Copy className="h-3 w-3" />
                      Clone
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1"
                      onClick={() => handleToggleActive(segment.id)}
                    >
                      <Play className="h-3 w-3" />
                      {segment.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1 text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteSegment(segment.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">{segment.matchedCustomers.toLocaleString()}</span> customers
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Created {formatDate(segment.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Updated {formatDate(segment.lastUpdated)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Segment Coverage</span>
                    <span>{segment.matchedCustomers} / {getTotalCustomers()}</span>
                  </div>
                  <Progress 
                    value={(segment.matchedCustomers / getTotalCustomers()) * 100} 
                    className="h-2" 
                  />
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Mail className="h-3 w-3" />
                    Email Campaign
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <MessageSquare className="h-3 w-3" />
                    SMS Campaign
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <BarChart3 className="h-3 w-3" />
                    Analytics
                  </Button>
                </div>
              </div>
            ))}

            {segments.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Target className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No segments created yet</h3>
                <p className="text-sm">Create your first customer segment to start targeted marketing</p>
                <Button onClick={() => setShowBuilder(true)} className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Create First Segment
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}