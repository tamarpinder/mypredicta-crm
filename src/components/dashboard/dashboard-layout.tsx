'use client';

import { useState } from 'react';
import { Navigation } from './navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export function DashboardLayout({ 
  children, 
  title, 
  description, 
  actions 
}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="flex-shrink-0 hidden md:flex">
          <Navigation 
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          {(title || description || actions) && (
            <header className="bg-card border-b border-border px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {title && (
                    <h1 className="text-2xl font-bold text-foreground">
                      {title}
                    </h1>
                  )}
                  {description && (
                    <p className="text-muted-foreground mt-1">
                      {description}
                    </p>
                  )}
                </div>
                
                {actions && (
                  <div className="flex items-center gap-3">
                    {actions}
                  </div>
                )}
              </div>
            </header>
          )}

          {/* Page Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}