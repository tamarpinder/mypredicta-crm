'use client';

import React from 'react';
import { Toast, ToastProps } from './toast';
import { useToast } from '@/hooks/use-toast';

// Memoized Toast component to prevent unnecessary re-renders
const MemoizedToast = React.memo(Toast);

export const Toaster = React.memo(function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((toast) => (
        <MemoizedToast key={toast.id} {...toast} />
      ))}
    </div>
  );
});