'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ABTestingFramework } from '@/components/marketing/ab-testing-framework';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FlaskConical, Download, Settings, HelpCircle } from 'lucide-react';

export default function ABTestingPage() {
  const actions = (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className="gap-1 text-white border-white/30">
        <FlaskConical className="h-3 w-3" />
        3 Active Tests
      </Badge>
      <Button variant="outline" className="gap-2">
        <Download className="h-4 w-4" />
        Export Results
      </Button>
      <Button variant="outline" className="gap-2">
        <Settings className="h-4 w-4" />
        Settings
      </Button>
      <Button variant="outline" className="gap-2">
        <HelpCircle className="h-4 w-4" />
        Help
      </Button>
    </div>
  );

  return (
    <DashboardLayout 
      title="A/B Testing" 
      description="Design, run, and analyze split tests to optimize your marketing campaigns and user experience"
      actions={actions}
    >
      <ABTestingFramework />
    </DashboardLayout>
  );
}