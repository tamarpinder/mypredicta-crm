'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { COMPANY_INFO } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';

interface LoginFormProps {
  onLogin: (email: string, password: string, rememberMe: boolean) => void;
  onSignUpClick: () => void;
  isLoading?: boolean;
  error?: string;
}

export function LoginForm({ onLogin, onSignUpClick, isLoading = false, error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{email?: string; password?: string}>({});

  const validateForm = () => {
    const errors: {email?: string; password?: string} = {};
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onLogin(email, password, rememberMe);
  };

  const handleDemoLogin = () => {
    setEmail('admin@predicta.com');
    setPassword('demo123');
    setRememberMe(true);
    // Auto-submit for demo without setTimeout to avoid timing conflicts
    onLogin('admin@predicta.com', 'demo123', true);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-[var(--color-predicta-gold)]/20 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative w-32 h-32 bg-gradient-to-br from-[var(--color-predicta-navy)] to-[var(--color-predicta-navy-dark)] rounded-xl flex items-center justify-center shadow-lg">
              <Image
                src={COMPANY_INFO.logo}
                alt={COMPANY_INFO.name}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[var(--color-predicta-navy)]">
            Welcome to {COMPANY_INFO.name}
          </CardTitle>
          <CardDescription className="text-[var(--color-predicta-neutral)]">
            Sign in to access your gambling CRM dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[var(--color-predicta-navy)] font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-[var(--color-predicta-neutral)]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 border-[var(--color-predicta-gold)]/30 focus:border-[var(--color-predicta-gold)] focus:ring-[var(--color-predicta-gold)]/20 ${
                    validationErrors.email ? 'border-red-300' : ''
                  }`}
                  disabled={isLoading}
                />
              </div>
              {validationErrors.email && (
                <p className="text-sm text-red-600">{validationErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[var(--color-predicta-navy)] font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-[var(--color-predicta-neutral)]" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 pr-10 border-[var(--color-predicta-gold)]/30 focus:border-[var(--color-predicta-gold)] focus:ring-[var(--color-predicta-gold)]/20 ${
                    validationErrors.password ? 'border-red-300' : ''
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[var(--color-predicta-neutral)] hover:text-[var(--color-predicta-navy)]"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {validationErrors.password && (
                <p className="text-sm text-red-600">{validationErrors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-[var(--color-predicta-gold)]/30 data-[state=checked]:bg-[var(--color-predicta-gold)] data-[state=checked]:border-[var(--color-predicta-gold)]"
                />
                <Label htmlFor="remember" className="text-sm text-[var(--color-predicta-neutral)]">
                  Remember me
                </Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-[var(--color-predicta-gold)] hover:text-[var(--color-predicta-gold-light)]">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[var(--color-predicta-navy)] hover:bg-[var(--color-predicta-navy-dark)] text-white font-medium py-2.5"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <div className="text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-predicta-gold)]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[var(--color-predicta-neutral)]">or</span>
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full border-[var(--color-predicta-gold)]/30 text-[var(--color-predicta-navy)] hover:bg-[var(--color-predicta-gold)]/10"
            onClick={handleDemoLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading Demo...
              </>
            ) : (
              'Try Demo Login'
            )}
          </Button>

          <div className="text-center text-sm text-[var(--color-predicta-neutral)]">
            Don&apos;t have an account?{' '}
            <button
              onClick={onSignUpClick}
              className="text-[var(--color-predicta-gold)] hover:text-[var(--color-predicta-gold-light)] font-medium"
              disabled={isLoading}
            >
              Sign up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}