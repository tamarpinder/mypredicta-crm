'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNotificationStore } from '@/stores/notification-store';
import { 
  Bell, 
  Settings, 
  Filter, 
  MoreHorizontal,
  Check,
  X,
  AlertCircle,
  Info,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Archive,
  Trash2,
  CheckSquare,
  User,
  TrendingUp,
  MessageSquare,
  Route,
  DollarSign,
  Shield,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Notification, NotificationStats } from '@/types';
import { mockNotifications, mockNotificationStats } from '@/data/notification-mock-data';
import { formatDate } from '@/utils/format';

interface NotificationCenterProps {
  onNotificationClick?: (notification: Notification) => void;
  onMarkAsRead?: (notificationId: string) => void;
  onMarkAllAsRead?: () => void;
  onDeleteNotification?: (notificationId: string) => void;
  className?: string;
}

const notificationTypeIcons = {
  system: Shield,
  customer: User,
  campaign: MessageSquare,
  journey: Route,
  revenue: DollarSign,
  alert: AlertCircle
};

const categoryIcons = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle2
};

const categoryColors = {
  info: 'text-blue-600 bg-blue-100',
  warning: 'text-yellow-600 bg-yellow-100',
  error: 'text-red-600 bg-red-100',
  success: 'text-green-600 bg-green-100'
};

const priorityColors = {
  low: 'text-gray-600 bg-gray-100',
  medium: 'text-blue-600 bg-blue-100',
  high: 'text-orange-600 bg-orange-100',
  critical: 'text-red-600 bg-red-100'
};

export function NotificationCenter({ 
  onNotificationClick, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onDeleteNotification,
  className = ''
}: NotificationCenterProps) {
  const { 
    notifications: storeNotifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearNotifications 
  } = useNotificationStore();
  
  const [mockNotificationsList] = useState<Notification[]>(mockNotifications);
  const [stats, setStats] = useState<NotificationStats>(mockNotificationStats);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [isOpen, setIsOpen] = useState(false);
  const [expandedNotifications, setExpandedNotifications] = useState<Set<string>>(new Set());

  // Combine store notifications with mock notifications
  const allNotifications = [
    ...storeNotifications.map(n => ({
      id: n.id,
      title: n.title,
      description: n.description,
      type: n.type === 'success' ? 'customer' : 
            n.type === 'warning' ? 'system' :
            n.type === 'error' ? 'system' : 'campaign',
      priority: n.type === 'error' ? 'critical' as const :
               n.type === 'warning' ? 'high' as const : 'medium' as const,
      category: n.type,
      timestamp: n.timestamp.toISOString(),
      isRead: n.read,
      actionUrl: undefined,
      metadata: {}
    })),
    ...mockNotificationsList
  ];

  // Calculate dynamic stats
  const dynamicStats = {
    ...stats,
    total: allNotifications.length,
    unread: allNotifications.filter(n => !n.isRead).length,
    priority: {
      ...stats.priority,
      critical: allNotifications.filter(n => n.priority === 'critical').length,
      high: allNotifications.filter(n => n.priority === 'high').length,
      medium: allNotifications.filter(n => n.priority === 'medium').length,
      low: allNotifications.filter(n => n.priority === 'low').length,
    }
  };

  // Filter notifications based on selected filters
  const filteredNotifications = allNotifications.filter(notification => {
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'unread' && !notification.isRead) ||
      (selectedFilter === 'read' && notification.isRead) ||
      notification.type === selectedFilter;
    
    const matchesPriority = selectedPriority === 'all' || notification.priority === selectedPriority;
    
    return matchesFilter && matchesPriority;
  });

  const handleNotificationClick = (notification: Notification) => {
    // Toggle expansion
    const newExpanded = new Set(expandedNotifications);
    if (newExpanded.has(notification.id)) {
      newExpanded.delete(notification.id);
    } else {
      newExpanded.add(notification.id);
    }
    setExpandedNotifications(newExpanded);

    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
    onNotificationClick?.(notification);
  };

  const handleMarkAsRead = (notificationId: string) => {
    // Check if it's a store notification
    const storeNotification = storeNotifications.find(n => n.id === notificationId);
    if (storeNotification) {
      markAsRead(notificationId);
    }
    onMarkAsRead?.(notificationId);
  };

  const handleMarkAllAsRead = () => {
    // Mark all store notifications as read
    markAllAsRead();
    onMarkAllAsRead?.();
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    onDeleteNotification?.(notificationId);
  };

  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return formatDate(timestamp);
  };

  const renderNotificationIcon = (notification: Notification) => {
    const TypeIcon = notificationTypeIcons[notification.type];
    const CategoryIcon = categoryIcons[notification.category];
    
    return (
      <div className="relative">
        <div className={`p-2 rounded-full ${categoryColors[notification.category]}`}>
          <TypeIcon className="h-4 w-4" />
        </div>
        <div className="absolute -top-1 -right-1">
          <CategoryIcon className="h-3 w-3" />
        </div>
      </div>
    );
  };

  const renderNotificationItem = (notification: Notification) => (
    <div 
      key={notification.id}
      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:bg-muted/50 ${
        !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-background'
      }`}
      onClick={() => handleNotificationClick(notification)}
    >
      {renderNotificationIcon(notification)}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
            {notification.title}
          </h4>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className={`text-xs ${priorityColors[notification.priority]}`}>
              {notification.priority}
            </Badge>
            {expandedNotifications.has(notification.id) ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
            {!notification.isRead && (
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
            )}
          </div>
        </div>
        
        <p className={`text-sm text-muted-foreground mb-2 ${!expandedNotifications.has(notification.id) ? 'line-clamp-2' : ''}`}>
          {notification.message || notification.description}
        </p>
        
        {expandedNotifications.has(notification.id) && notification.metadata && Object.keys(notification.metadata).length > 0 && (
          <div className="bg-muted/50 p-3 rounded-md mb-2">
            <h5 className="text-xs font-medium text-muted-foreground mb-2">Additional Details:</h5>
            <div className="space-y-1">
              {Object.entries(notification.metadata).map(([key, value]) => (
                <div key={key} className="flex justify-between text-xs">
                  <span className="font-medium">{key}:</span>
                  <span className="text-muted-foreground">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {getRelativeTime(notification.timestamp)}
          </div>
          
          <div className="flex items-center gap-1">
            {notification.actionRequired && (
              <Badge variant="outline" className="text-xs text-orange-600 bg-orange-100">
                Action Required
              </Badge>
            )}
            
            {notification.actionUrl && (
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleMarkAsRead(notification.id);
          }}
          className="h-8 w-8 p-0"
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteNotification(notification.id);
          }}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Notification Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Notifications</h2>
          {dynamicStats.unread > 0 && (
            <Badge variant="destructive" className="text-xs">
              {dynamicStats.unread}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            <CheckSquare className="h-4 w-4 mr-1" />
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{dynamicStats.unread}</div>
                <div className="text-sm text-muted-foreground">Unread</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{stats.byPriority.high + stats.byPriority.critical}</div>
                <div className="text-sm text-muted-foreground">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{stats.byCategory.success}</div>
                <div className="text-sm text-muted-foreground">Success</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="campaign">Campaign</SelectItem>
              <SelectItem value="journey">Journey</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="alert">Alert</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedFilter === 'all' ? 'All Notifications' : 
             selectedFilter === 'unread' ? 'Unread Notifications' :
             selectedFilter === 'read' ? 'Read Notifications' :
             `${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)} Notifications`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-2">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map(renderNotificationItem)
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No notifications match your current filters.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}