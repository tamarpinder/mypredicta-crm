'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/auth-context';
import { mockNotificationStats } from '@/data/notification-mock-data';
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
  const { user, logout } = useAuth();
  
  return (
    <div className={cn(
      "flex flex-col h-full bg-gradient-to-b from-[var(--color-predicta-navy)] to-[var(--color-predicta-navy-dark)] border-r border-[var(--color-predicta-gold)] transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-predicta-gold)]/20">
        <div className={cn(
          "flex items-center gap-3 transition-all duration-300",
          collapsed && "justify-center"
        )}>
          <div className="relative w-[72px] h-[72px] flex-shrink-0">
            <Image
              src={COMPANY_INFO.logo}
              alt={COMPANY_INFO.name}
              fill
              className="object-contain"
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white">
                {COMPANY_INFO.name}
              </span>
              <span className="text-xs text-[var(--color-predicta-gold)]">
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
            className="h-8 w-8 p-0 text-white hover:text-[var(--color-predicta-gold)] hover:bg-white/10"
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
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-white/80 hover:bg-[var(--color-predicta-gold)]/20 hover:text-white",
                isActive && "bg-[var(--color-predicta-gold)] text-[var(--color-predicta-navy)] hover:bg-[var(--color-predicta-gold)] hover:text-[var(--color-predicta-navy)] shadow-lg",
                collapsed && "justify-center"
              )}>
                <Icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive ? "text-[var(--color-predicta-navy)]" : "text-white/80"
                )} />
                
                {!collapsed && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto bg-[var(--color-predicta-gold)] text-[var(--color-predicta-navy)]">
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
      <div className="p-4 border-t border-[var(--color-predicta-gold)]/20">
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-lg bg-[var(--color-predicta-gold)]/10 hover:bg-[var(--color-predicta-gold)]/20 transition-colors",
          collapsed && "justify-center"
        )}>
          <div className="w-8 h-8 bg-[var(--color-predicta-gold)] rounded-full flex items-center justify-center flex-shrink-0">
            <User className="h-4 w-4 text-[var(--color-predicta-navy)]" />
          </div>
          
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-xs text-white/60">
                {user?.email}
              </div>
            </div>
          )}
        </div>
        
        {!collapsed && (
          <div className="mt-3 space-y-1">
            <Link href="/notifications">
              <Button variant="ghost" size="sm" className="w-full justify-start text-white/80 hover:text-white hover:bg-[var(--color-predicta-gold)]/20">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                {mockNotificationStats.unread > 0 && (
                  <Badge variant="destructive" className="ml-auto text-xs">
                    {mockNotificationStats.unread}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-white/80 hover:text-white hover:bg-[var(--color-predicta-gold)]/20"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}