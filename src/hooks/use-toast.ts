'use client';

import { useToastContext } from '@/contexts/toast-context';

// Re-export types for backward compatibility
export type { ToastType, ToastData, ToastWithCallback } from '@/contexts/toast-context';

// Main hook that uses the new context
export function useToast() {
  return useToastContext();
}

// Global toast functions - these will only work within ToastProvider
// Import these from the context for better error handling
export { 
  toastSuccess, 
  toastError, 
  toastWarning, 
  toastInfo 
} from '@/contexts/toast-context';