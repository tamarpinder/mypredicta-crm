'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';
import { SignUpForm } from '@/components/auth/signup-form';
import { SplashScreen } from '@/components/ui/splash-screen';
import { useAuth } from '@/contexts/auth-context';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { AuthSkeleton } from '@/components/ui/auth-skeleton';
import { toastInfo } from '@/hooks/use-toast';
import { Lock, Loader2 } from 'lucide-react';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const isLogout = searchParams.get('action') === 'logout';
  const [currentView, setCurrentView] = useState<'splash' | 'login' | 'signup'>('splash');
  const [showSplash, setShowSplash] = useState(!isLogout);
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(isLogout);
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const router = useRouter();
  const { isAuthenticated, login, isLoading: authLoading } = useAuth();

  useEffect(() => {
    // Mark as hydrated after component mounts
    setIsHydrated(true);
    
    // Check if user is already authenticated via AuthContext
    if (isAuthenticated && !authLoading) {
      router.push('/');
    }
    
    // Handle logout flow
    if (isLogout && !authLoading) {
      // Show security-focused toast message
      toastInfo('Securing your session...', {
        duration: 2500,
        icon: <Lock className="h-4 w-4" />
      });
      
      // Show logout overlay briefly, then go to login
      setTimeout(() => {
        setShowLogoutOverlay(false);
        setCurrentView('login');
      }, 300);
      
      // Clean the URL to remove the query parameter
      window.history.replaceState({}, '', '/auth');
    }
  }, [isAuthenticated, authLoading, router, isLogout]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setTimeout(() => {
      setCurrentView('login');
    }, 100);
  };

  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call with potential failure for retry testing
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 20% failure rate for demonstration
          if (Math.random() < 0.2 && retryCount < 3) {
            reject(new Error('Network timeout'));
          } else {
            resolve(true);
          }
        }, 1000);
      });

      // For demo purposes, accept any login or auto-login with admin credentials
      const userData = {
        id: '1',
        email: email || 'admin@predicta.com',
        firstName: 'Admin',
        lastName: 'User',
        company: 'myPredicta',
        role: 'admin',
        loginTime: new Date().toISOString(),
        rememberMe
      };

      // Use AuthContext login method instead of direct localStorage
      login(userData);
      
      // Reset retry count on success
      setRetryCount(0);
      
      // Redirect to dashboard
      router.push('/');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      if (retryCount < 3) {
        setError(`${errorMessage}. Retrying... (${retryCount + 1}/3)`);
        setRetryCount(prev => prev + 1);
        // Auto-retry after 2 seconds
        setTimeout(() => {
          if (retryCount < 2) {
            handleLogin(email, password, rememberMe);
          }
        }, 2000);
      } else {
        setError('Login failed after multiple attempts. Please check your connection and try again.');
        setRetryCount(0);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    [key: string]: unknown;
  }) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call with potential failure
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 15% failure rate for demonstration
          if (Math.random() < 0.15 && retryCount < 3) {
            reject(new Error('Registration service unavailable'));
          } else {
            resolve(true);
          }
        }, 1500);
      });

      // For demo purposes, automatically create account and log in
      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        company: userData.company,
        role: 'user',
        loginTime: new Date().toISOString(),
        rememberMe: false
      };

      // Use AuthContext login method instead of direct localStorage
      login(newUser);
      
      // Reset retry count on success
      setRetryCount(0);
      
      // Redirect to dashboard
      router.push('/');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign up failed';
      if (retryCount < 3) {
        setError(`${errorMessage}. Retrying... (${retryCount + 1}/3)`);
        setRetryCount(prev => prev + 1);
        // Auto-retry after 2 seconds
        setTimeout(() => {
          if (retryCount < 2) {
            handleSignUp(userData);
          }
        }, 2000);
      } else {
        setError('Sign up failed after multiple attempts. Please check your connection and try again.');
        setRetryCount(0);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-predicta-navy)] via-[var(--color-predicta-navy-dark)] to-[var(--color-predicta-navy)] relative overflow-hidden">
      {/* Background Elements - Always present */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--color-predicta-gold)]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--color-predicta-cyan)]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Hexagonal Pattern - Always present */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="10" height="8.66" patternUnits="userSpaceOnUse">
              <polygon points="5,0 8.66,2.5 8.66,5 5,7.5 1.34,5 1.34,2.5" fill="none" stroke="currentColor" strokeWidth="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" className="text-[var(--color-predicta-gold)]"/>
        </svg>
      </div>

      {/* Floating Elements - Always present */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-[var(--color-predicta-gold)] rounded-full animate-ping"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-[var(--color-predicta-cyan)] rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-[var(--color-predicta-gold)] rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-20 w-1 h-1 bg-[var(--color-predicta-cyan)] rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>

      {/* Splash Screen - Smooth opacity transition */}
      <div className={`absolute inset-0 z-20 transition-opacity duration-500 ${showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <ErrorBoundary>
          <SplashScreen onComplete={handleSplashComplete} duration={3000} />
        </ErrorBoundary>
      </div>

      {/* Logout Overlay - Quick transition */}
      {showLogoutOverlay && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[var(--color-predicta-navy)]/80 backdrop-blur-sm">
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-[var(--color-predicta-gold)] animate-spin mx-auto mb-4" />
            <p className="text-white text-lg font-medium">Signing out...</p>
          </div>
        </div>
      )}

      {/* Auth Forms - Always mounted, opacity controlled */}
      <div className={`absolute inset-0 z-10 flex items-center justify-center p-4 transition-opacity duration-500 ${!showSplash && !showLogoutOverlay ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative z-10 w-full max-w-md">
          <ErrorBoundary>
            {!isHydrated ? (
              <AuthSkeleton />
            ) : currentView === 'login' ? (
              <LoginForm
                onLogin={handleLogin}
                onSignUpClick={() => setCurrentView('signup')}
                isLoading={isLoading}
                error={error}
              />
            ) : (
              <SignUpForm
                onSignUp={handleSignUp}
                onBackToLogin={() => setCurrentView('login')}
                isLoading={isLoading}
                error={error}
              />
            )}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}