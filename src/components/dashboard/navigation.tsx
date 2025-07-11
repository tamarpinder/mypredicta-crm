'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Brain, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Bell,
  Target,
  FlaskConical,
  Route,
  AlertTriangle
} from 'lucide-react';
import { COMPANY_INFO } from '@/utils/constants';
import Image from 'next/image';

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    badge: null
  },
  {
    id: 'customers',
    label: 'Customers',
    href: '/customers',
    icon: Users,
    badge: null
  },
  {
    id: 'segments',
    label: 'Segments',
    href: '/segments',
    icon: Target,
    badge: null
  },
  {
    id: 'journey',
    label: 'Customer Journey',
    href: '/customers/journey',
    icon: Route,
    badge: null
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: TrendingUp,
    badge: null
  },
  {
    id: 'marketing',
    label: 'Marketing',
    href: '/marketing',
    icon: MessageSquare,
    badge: 3
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    href: '/campaigns',
    icon: Target,
    badge: null
  },
  {
    id: 'ab-testing',
    label: 'A/B Testing',
    href: '/ab-testing',
    icon: FlaskConical,
    badge: 3
  },
  {
    id: 'ai-insights',
    label: 'AI Insights',
    href: '/ai-insights',
    icon: Brain,
    badge: null
  },
  {
    id: 'alerts',
    label: 'Alert Rules',
    href: '/alerts',
    icon: AlertTriangle,
    badge: null
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    badge: null
  }
];

interface NavigationProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Navigation({ collapsed = false, onToggle }: NavigationProps) {
  const pathname = usePathname();
  
  return (
    <div className={cn(
      "flex flex-col h-full bg-card border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className={cn(
          "flex items-center gap-3 transition-all duration-300",
          collapsed && "justify-center"
        )}>
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image
              src={COMPANY_INFO.logo}
              alt={COMPANY_INFO.name}
              fill
              className="object-contain"
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground">
                {COMPANY_INFO.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {COMPANY_INFO.tagline}
              </span>
            </div>
          )}
        </div>
        
        {onToggle && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.id} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                collapsed && "justify-center"
              )}>
                <Icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive && "text-primary-foreground"
                )} />
                
                {!collapsed && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border">
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-lg bg-muted/50",
          collapsed && "justify-center"
        )}>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground">
                Admin User
              </div>
              <div className="text-xs text-muted-foreground">
                admin@predicta.com
              </div>
            </div>
          )}
        </div>
        
        {!collapsed && (
          <div className="mt-3 space-y-1">
            <Link href="/notifications">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}