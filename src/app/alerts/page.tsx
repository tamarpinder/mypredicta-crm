'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { AlertRules } from '@/components/alerts/alert-rules';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Settings, Download, Plus } from 'lucide-react';

export default function AlertsPage() {
  const actions = (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className="gap-1">
        <AlertTriangle className="h-3 w-3" />
        5 Active Rules
      </Badge>
      <Button variant="outline" className="gap-2">
        <Download className="h-4 w-4" />
        Export Rules
      </Button>
      <Button variant="outline" className="gap-2">
        <Settings className="h-4 w-4" />
        Settings
      </Button>
      <Button className="gap-2">
        <Plus className="h-4 w-4" />
        Create Rule
      </Button>
    </div>
  );

  return (
    <DashboardLayout 
      title="Alert Rules" 
      description="Configure automated alerts and notification rules for your CRM"
      actions={actions}
    >
      <AlertRules />
    </DashboardLayout>
  );
}