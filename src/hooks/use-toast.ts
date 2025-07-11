'use client';

import React, { useState, useCallback } from 'react';
import { ToastProps } from '@/components/ui/toast';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastData {
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

let toastId = 0;
let toastState: ToastData[] = [];
let listeners: Array<(toasts: ToastData[]) => void> = [];

function generateId() {
  return (++toastId).toString();
}

function emit() {
  listeners.forEach((listener) => listener(toastState));
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>(toastState);

  const removeToast = useCallback((id: string) => {
    toastState = toastState.filter((toast) => toast.id !== id);
    emit();
  }, []);

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = generateId();
    const newToast: ToastData = {
      ...toast,
      id,
    };
    
    toastState = [...toastState, newToast];
    emit();
    
    return id;
  }, []);

  const toast = useCallback((data: {
    title: string;
    description?: string;
    type?: ToastType;
    duration?: number;
    action?: {
      label: string;
      onClick: () => void;
    };
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

  // Subscribe to changes
  React.useEffect(() => {
    listeners.push(setToasts);
    return () => {
      listeners = listeners.filter((listener) => listener !== setToasts);
    };
  }, []);

  return {
    toasts: toasts.map((toast) => ({
      ...toast,
      onClose: removeToast,
    })) as (ToastData & { onClose: (id: string) => void })[],
    toast,
    success,
    error,
    warning,
    info,
    removeToast,
  };
}

// Global toast functions
export const toast = (data: {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}) => {
  const id = generateId();
  const newToast: ToastData = {
    ...data,
    id,
    type: data.type || 'info',
    duration: data.duration || 5000,
  };
  
  toastState = [...toastState, newToast];
  emit();
  
  return id;
};

export const toastSuccess = (title: string, description?: string) => {
  return toast({ title, description, type: 'success' });
};

export const toastError = (title: string, description?: string) => {
  return toast({ title, description, type: 'error', duration: 7000 });
};

export const toastWarning = (title: string, description?: string) => {
  return toast({ title, description, type: 'warning', duration: 6000 });
};

export const toastInfo = (title: string, description?: string) => {
  return toast({ title, description, type: 'info' });
};