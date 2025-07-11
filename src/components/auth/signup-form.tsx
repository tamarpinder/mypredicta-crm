'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Lock, Mail, AlertCircle, User, Building, Phone, Loader2 } from 'lucide-react';
import { COMPANY_INFO } from '@/utils/constants';
import Image from 'next/image';

interface SignUpFormProps {
  onSignUp: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    [key: string]: unknown;
  }) => void;
  onBackToLogin: () => void;
  isLoading?: boolean;
  error?: string;
}

export function SignUpForm({ onSignUp, onBackToLogin, isLoading = false, error }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    country: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    marketingConsent: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    }
    
    if (!formData.company.trim()) {
      errors.company = 'Company name is required';
    }
    
    if (!formData.country) {
      errors.country = 'Country is required';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'Please agree to the terms and conditions';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSignUp(formData);
  };

  const countries = [
    'Bahamas', 'United States', 'Canada', 'United Kingdom', 'Australia', 
    'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Other'
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-[var(--color-predicta-gold)]/20 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative w-16 h-16 bg-gradient-to-br from-[var(--color-predicta-navy)] to-[var(--color-predicta-navy-dark)] rounded-xl flex items-center justify-center shadow-lg">
              <Image
                src={COMPANY_INFO.logo}
                alt={COMPANY_INFO.name}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[var(--color-predicta-navy)]">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-[var(--color-predicta-neutral)]">
            Join {COMPANY_INFO.name} and start managing your gambling business
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
            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-[var(--color-predicta-navy)] font-medium">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-[var(--color-predicta-neutral)]" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`pl-10 border-[var(--color-predicta-gold)]/30 focus:border-[var(--color-predicta-gold)] focus:ring-[var(--color-predicta-gold)]/20 ${
                      validationErrors.firstName ? 'border-red-300' : ''
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {validationErrors.firstName && (
                  <p className="text-sm text-red-600">{validationErrors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-[var(--color-predicta-navy)] font-medium">
                  Last Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-[var(--color-predicta-neutral)]" />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`pl-10 border-[var(--color-predicta-gold)]/30 focus:border-[var(--color-predicta-gold)] focus:ring-[var(--color-predicta-gold)]/20 ${
                      validationErrors.lastName ? 'border-red-300' : ''
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {validationErrors.lastName && (
                  <p className="text-sm text-red-600">{validationErrors.lastName}</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[var(--color-predicta-navy)] font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-[var(--color-predicta-neutral)]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
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
              <Label htmlFor="phone" className="text-[var(--color-predicta-navy)] font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-[var(--color-predicta-neutral)]" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`pl-10 border-[var(--color-predicta-gold)]/30 focus:border-[var(--color-predicta-gold)] focus:ring-[var(--color-predicta-gold)]/20 ${
                    validationErrors.phone ? 'border-red-300' : ''
                  }`}
                  disabled={isLoading}
                />
              </div>
              {validationErrors.phone && (
                <p className="text-sm text-red-600">{validationErrors.phone}</p>
              )}
            </div>

            {/* Company Information */}
            <div className="space-y-2">
              <Label htmlFor="company" className="text-[var(--color-predicta-navy)] font-medium">
                Company Name
              </Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-[var(--color-predicta-neutral)]" />
                <Input
                  id="company"
                  type="text"
                  placeholder="Your Company Name"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className={`pl-10 border-[var(--color-predicta-gold)]/30 focus:border-[var(--color-predicta-gold)] focus:ring-[var(--color-predicta-gold)]/20 ${
                    validationErrors.company ? 'border-red-300' : ''
                  }`}
                  disabled={isLoading}
                />
              </div>
              {validationErrors.company && (
                <p className="text-sm text-red-600">{validationErrors.company}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-[var(--color-predicta-navy)] font-medium">
                Job Title <span className="text-[var(--color-predicta-neutral)]">(optional)</span>
              </Label>
              <Input
                id="jobTitle"
                type="text"
                placeholder="e.g., CRM Manager"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                className="border-[var(--color-predicta-gold)]/30 focus:border-[var(--color-predicta-gold)] focus:ring-[var(--color-predicta-gold)]/20"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-[var(--color-predicta-navy)] font-medium">
                Country
              </Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger className={`border-[var(--color-predicta-gold)]/30 focus:border-[var(--color-predicta-gold)] focus:ring-[var(--color-predicta-gold)]/20 ${
                  validationErrors.country ? 'border-red-300' : ''
                }`}>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.country && (
                <p className="text-sm text-red-600">{validationErrors.country}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[var(--color-predicta-navy)] font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-[var(--color-predicta-neutral)]" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[var(--color-predicta-navy)] font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-[var(--color-predicta-neutral)]" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`pl-10 pr-10 border-[var(--color-predicta-gold)]/30 focus:border-[var(--color-predicta-gold)] focus:ring-[var(--color-predicta-gold)]/20 ${
                    validationErrors.confirmPassword ? 'border-red-300' : ''
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-[var(--color-predicta-neutral)] hover:text-[var(--color-predicta-navy)]"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p className="text-sm text-red-600">{validationErrors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                  className="border-[var(--color-predicta-gold)]/30 data-[state=checked]:bg-[var(--color-predicta-gold)] data-[state=checked]:border-[var(--color-predicta-gold)] mt-1"
                />
                <Label htmlFor="agreeToTerms" className="text-sm text-[var(--color-predicta-neutral)] leading-relaxed">
                  I agree to the <span className="text-[var(--color-predicta-gold)]">Terms of Service</span> and <span className="text-[var(--color-predicta-gold)]">Privacy Policy</span>
                </Label>
              </div>
              {validationErrors.agreeToTerms && (
                <p className="text-sm text-red-600">{validationErrors.agreeToTerms}</p>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="marketingConsent"
                  checked={formData.marketingConsent}
                  onCheckedChange={(checked) => handleInputChange('marketingConsent', checked as boolean)}
                  className="border-[var(--color-predicta-gold)]/30 data-[state=checked]:bg-[var(--color-predicta-gold)] data-[state=checked]:border-[var(--color-predicta-gold)] mt-1"
                />
                <Label htmlFor="marketingConsent" className="text-sm text-[var(--color-predicta-neutral)] leading-relaxed">
                  I&apos;d like to receive marketing emails about new features and updates
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[var(--color-predicta-navy)] hover:bg-[var(--color-predicta-navy-dark)] text-white font-medium py-2.5"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-[var(--color-predicta-neutral)]">
            Already have an account?{' '}
            <button
              onClick={onBackToLogin}
              className="text-[var(--color-predicta-gold)] hover:text-[var(--color-predicta-gold-light)] font-medium"
              disabled={isLoading}
            >
              Sign in
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}