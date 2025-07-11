'use client';

import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'card' | 'table' | 'chart' | 'text' | 'avatar' | 'button';
  rows?: number;
  animate?: boolean;
}

export function LoadingSkeleton({ 
  className, 
  variant = 'card', 
  rows = 1, 
  animate = true 
}: LoadingSkeletonProps) {
  const baseClasses = cn(
    'bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:400%_100%] rounded-md',
    animate && 'animate-pulse',
    className
  );

  const variants = {
    card: 'h-32 w-full',
    table: 'h-8 w-full',
    chart: 'h-64 w-full',
    text: 'h-4 w-3/4',
    avatar: 'h-10 w-10 rounded-full',
    button: 'h-9 w-24'
  };

  if (variant === 'table' && rows > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className={cn(baseClasses, variants[variant])} />
        ))}
      </div>
    );
  }

  return <div className={cn(baseClasses, variants[variant])} />;
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <LoadingSkeleton key={i} variant="text" className="h-6" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, j) => (
            <LoadingSkeleton key={j} variant="text" className="h-4" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <LoadingSkeleton variant="avatar" />
        <div className="space-y-2 flex-1">
          <LoadingSkeleton variant="text" className="h-4 w-1/2" />
          <LoadingSkeleton variant="text" className="h-3 w-3/4" />
        </div>
      </div>
      <div className="space-y-2">
        <LoadingSkeleton variant="text" className="h-4 w-full" />
        <LoadingSkeleton variant="text" className="h-4 w-4/5" />
        <LoadingSkeleton variant="text" className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <LoadingSkeleton variant="text" className="h-6 w-32" />
        <LoadingSkeleton variant="button" />
      </div>
      <LoadingSkeleton variant="chart" />
      <div className="flex justify-center space-x-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="text-center space-y-1">
            <LoadingSkeleton variant="text" className="h-3 w-12" />
            <LoadingSkeleton variant="text" className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <LoadingSkeleton variant="text" className="h-8 w-64" />
          <LoadingSkeleton variant="text" className="h-4 w-96" />
        </div>
        <div className="flex space-x-2">
          <LoadingSkeleton variant="button" />
          <LoadingSkeleton variant="button" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-2">
            <LoadingSkeleton variant="text" className="h-4 w-24" />
            <LoadingSkeleton variant="text" className="h-8 w-16" />
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    </div>
  );
}