'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { COMPANY_INFO } from '@/utils/constants';

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let timer: NodeJS.Timeout;
    let fadeTimer: NodeJS.Timeout;

    try {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, duration / 50);

      timer = setTimeout(() => {
        setIsVisible(false);
        fadeTimer = setTimeout(() => {
          try {
            onComplete?.();
          } catch (error) {
            console.error('Error in splash screen completion:', error);
            // Fallback: still call onComplete after a short delay
            setTimeout(() => onComplete?.(), 100);
          }
        }, 500);
      }, duration);
    } catch (error) {
      console.error('Error setting up splash screen:', error);
      // Fallback: immediately call onComplete
      setTimeout(() => onComplete?.(), 100);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
      clearInterval(progressInterval);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[var(--color-predicta-navy)] via-[var(--color-predicta-navy-dark)] to-[var(--color-predicta-navy)] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-predicta-cyan)]/20 via-transparent to-[var(--color-predicta-gold)]/20"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--color-predicta-gold)]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--color-predicta-cyan)]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Hexagonal Pattern */}
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

      {/* Main Content */}
      <div className="relative z-10 text-center px-8 animate-fadeIn">
        {/* Logo */}
        <div className="relative w-32 h-32 mx-auto mb-8 animate-scaleIn">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-predicta-gold)] to-[var(--color-predicta-gold-light)] rounded-2xl opacity-20 blur-lg scale-110"></div>
          <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-[var(--color-predicta-gold)]/20 flex items-center justify-center">
            <Image
              src={COMPANY_INFO.logo}
              alt={COMPANY_INFO.name}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div>

        {/* Company Name */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 animate-slideUp">
          {COMPANY_INFO.name}
        </h1>

        {/* Tagline */}
        <p className="text-lg text-[var(--color-predicta-gold)] mb-8 animate-slideUp" style={{ animationDelay: '0.3s' }}>
          {COMPANY_INFO.tagline}
        </p>

        {/* Subtitle */}
        <p className="text-white/60 text-sm mb-12 animate-slideUp" style={{ animationDelay: '0.6s' }}>
          AI-Powered Customer Intelligence for Gaming
        </p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto animate-slideUp" style={{ animationDelay: '0.9s' }}>
          <div className="w-full bg-white/10 rounded-full h-1 mb-2">
            <div 
              className="bg-gradient-to-r from-[var(--color-predicta-gold)] to-[var(--color-predicta-gold-light)] h-1 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-white/40 text-xs">Loading...</p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-[var(--color-predicta-gold)] rounded-full animate-ping"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-[var(--color-predicta-cyan)] rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-[var(--color-predicta-gold)] rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-20 w-1 h-1 bg-[var(--color-predicta-cyan)] rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
}