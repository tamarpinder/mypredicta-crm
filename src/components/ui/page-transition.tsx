'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsLoading(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          isLoading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
        )}
      >
        {displayChildren}
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse [animation-delay:0.2s]" />
            <div className="w-4 h-4 bg-primary rounded-full animate-pulse [animation-delay:0.4s]" />
          </div>
        </div>
      )}
    </div>
  );
}

export function TabTransition({ 
  children, 
  isActive, 
  className 
}: { 
  children: React.ReactNode; 
  isActive: boolean; 
  className?: string; 
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'transition-all duration-200 ease-in-out',
          isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        )}
      >
        {children}
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}