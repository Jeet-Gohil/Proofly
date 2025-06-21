'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { loadingService } from '../lib/LoadingService';

export default function LoadingOverlay() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Show overlay briefly on route change
    setIsLoading(true);
    timer = setTimeout(() => setIsLoading(false), 500); // at least 500ms

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // Listen to global API loading state
    const unsubscribe = loadingService.subscribe((apiLoading) => {
      setIsLoading(apiLoading);
    });

    return () => unsubscribe();
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
    </div>
  );
}
