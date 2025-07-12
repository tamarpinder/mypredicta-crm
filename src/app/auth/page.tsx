'use client';

import { Suspense } from 'react';
import { AuthPageContent } from './auth-content';
import { AuthSkeleton } from '@/components/ui/auth-skeleton';

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-predicta-navy)] via-[var(--color-predicta-navy-dark)] to-[var(--color-predicta-navy)] relative overflow-hidden flex items-center justify-center p-4">
        <AuthSkeleton />
      </div>
    }>
      <AuthPageContent />
    </Suspense>
  );
}