'use client';

export function AuthSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="border border-[var(--color-predicta-gold)]/20 shadow-2xl bg-white/95 backdrop-blur-sm rounded-lg">
        {/* Header */}
        <div className="text-center p-6 pb-4">
          {/* Logo skeleton */}
          <div className="flex justify-center mb-4">
            <div className="relative w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
          </div>
          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded-md w-3/4 mx-auto mb-3 animate-pulse"></div>
          {/* Description skeleton */}
          <div className="h-5 bg-gray-200 rounded-md w-5/6 mx-auto animate-pulse"></div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Form fields skeleton */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-10 bg-gray-100 rounded-md animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-10 bg-gray-100 rounded-md animate-pulse"></div>
            </div>
          </div>

          {/* Checkbox and link row skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>

          {/* Button skeleton */}
          <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>

          {/* Divider skeleton */}
          <div className="text-center">
            <div className="h-px bg-gray-200 w-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white px-2">
                  <div className="h-4 bg-gray-200 rounded w-6 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Demo button skeleton */}
          <div className="h-10 bg-gray-100 rounded-md animate-pulse"></div>

          {/* Bottom text skeleton */}
          <div className="text-center">
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}