'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { loadingService } from '../lib/LoadingService';

export default function LoadingOverlay() {
  const pathname = usePathname();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  // 👇 Handle API loading state from global loadingService
  useEffect(() => {
    const unsubscribe = loadingService.subscribe((loading) => {
      setIsApiLoading(loading);
    });

    return () => unsubscribe();
  }, []);

  // 👇 Handle route change "flash"
  useEffect(() => {
    setIsRouteChanging(true);

    const timer = setTimeout(() => {
      setIsRouteChanging(false);
    }, 800); // Route loading overlay visible for 800ms

    return () => clearTimeout(timer);
  }, [pathname]);

  // 👇 Show overlay if either API is loading or route is changing
  const showOverlay = isApiLoading || isRouteChanging;

  if (!showOverlay) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
    </div>
  );
}
