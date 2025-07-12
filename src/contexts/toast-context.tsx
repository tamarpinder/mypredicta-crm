'use client';

import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastWithCallback extends ToastData {
  onClose: (id: string) => void;
}

interface ToastState {
  toasts: ToastData[];
}

type ToastAction = 
  | { type: 'ADD_TOAST'; payload: ToastData }
  | { type: 'REMOVE_TOAST'; payload: { id: string } }
  | { type: 'CLEAR_ALL_TOASTS' };

interface ToastContextType {
  toasts: ToastWithCallback[];
  addToast: (toast: Omit<ToastData, 'id'>) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
  toast: (data: {
    title: string;
    description?: string;
    type?: ToastType;
    duration?: number;
    action?: { label: string; onClick: () => void; };
  }) => string;
  success: (title: string, description?: string) => string;
  error: (title: string, description?: string) => string;
  warning: (title: string, description?: string) => string;
  info: (title: string, description?: string) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastIdCounter = 0;

function generateToastId(): string {
  return `toast-${++toastIdCounter}-${Date.now()}`;
}

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.payload, ...state.toasts].slice(0, 10), // Keep max 10 toasts
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload.id),
      };
    case 'CLEAR_ALL_TOASTS':
      return {
        ...state,
        toasts: [],
      };
    default:
      return state;
  }
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const removeToast = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TOAST', payload: { id } });
  }, []);

  const clearAllToasts = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_TOASTS' });
  }, []);

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = generateToastId();
    const newToast: ToastData = {
      ...toast,
      id,
      type: toast.type || 'info',
      duration: toast.duration || 5000,
    };

    dispatch({ type: 'ADD_TOAST', payload: newToast });

    // Auto-remove toast after duration
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, [removeToast]);

  const toast = useCallback((data: {
    title: string;
    description?: string;
    type?: ToastType;
    duration?: number;
    action?: { label: string; onClick: () => void; };
  }) => {
    return addToast({
      type: 'info',
      duration: 5000,
      ...data,
    });
  }, [addToast]);

  const success = useCallback((title: string, description?: string) => {
    return addToast({
      title,
      description,
      type: 'success',
      duration: 5000,
    });
  }, [addToast]);

  const error = useCallback((title: string, description?: string) => {
    return addToast({
      title,
      description,
      type: 'error',
      duration: 7000,
    });
  }, [addToast]);

  const warning = useCallback((title: string, description?: string) => {
    return addToast({
      title,
      description,
      type: 'warning',
      duration: 6000,
    });
  }, [addToast]);

  const info = useCallback((title: string, description?: string) => {
    return addToast({
      title,
      description,
      type: 'info',
      duration: 5000,
    });
  }, [addToast]);

  // Memoize toasts with callback to prevent unnecessary re-renders
  const toastsWithCallback = useMemo(
    () => state.toasts.map(toast => ({
      ...toast,
      onClose: removeToast,
    })),
    [state.toasts, removeToast]
  );

  const contextValue = useMemo(
    () => ({
      toasts: toastsWithCallback,
      addToast,
      removeToast,
      clearAllToasts,
      toast,
      success,
      error,
      warning,
      info,
    }),
    [
      toastsWithCallback,
      addToast,
      removeToast,
      clearAllToasts,
      toast,
      success,
      error,
      warning,
      info,
    ]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
}

// Global toast functions for backward compatibility
export const toastSuccess = (title: string, description?: string) => {
  // These will only work if called from within a ToastProvider
  try {
    const context = useToastContext();
    return context.success(title, description);
  } catch {
    console.warn('toastSuccess called outside ToastProvider context');
    return '';
  }
};

export const toastError = (title: string, description?: string) => {
  try {
    const context = useToastContext();
    return context.error(title, description);
  } catch {
    console.warn('toastError called outside ToastProvider context');
    return '';
  }
};

export const toastWarning = (title: string, description?: string) => {
  try {
    const context = useToastContext();
    return context.warning(title, description);
  } catch {
    console.warn('toastWarning called outside ToastProvider context');
    return '';
  }
};

export const toastInfo = (title: string, description?: string) => {
  try {
    const context = useToastContext();
    return context.info(title, description);
  } catch {
    console.warn('toastInfo called outside ToastProvider context');
    return '';
  }
};