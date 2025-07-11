'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { NotificationCenter } from '@/components/dashboard/notification-center';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, Download, Filter } from 'lucide-react';
import { mockNotificationStats } from '@/data/notification-mock-data';

export default function NotificationsPage() {
  const actions = (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className="gap-1 text-white border-white/30">
        <Bell className="h-3 w-3" />
        {mockNotificationStats.unread} Unread
      </Badge>
      <Button variant="outline" className="gap-2">
        <Download className="h-4 w-4" />
        Export
      </Button>
      <Button variant="outline" className="gap-2">
        <Filter className="h-4 w-4" />
        Advanced Filter
      </Button>
      <Button variant="outline" className="gap-2">
        <Settings className="h-4 w-4" />
        Settings
      </Button>
    </div>
  );

  return (
    <DashboardLayout 
      title="Notifications" 
      description="Manage your alerts, notifications, and system messages"
      actions={actions}
    >
      <NotificationCenter />
    </DashboardLayout>
  );
}