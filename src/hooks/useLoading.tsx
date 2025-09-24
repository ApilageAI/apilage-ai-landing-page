'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();

  // Handle initial page load - Skip for main page
  useEffect(() => {
    if (isInitialLoad) {
      // Don't show loading on main page
      if (pathname === '/') {
        setIsInitialLoad(false);
        return;
      }
      
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, 800); // Shorter duration

      return () => clearTimeout(timer);
    }
  }, [isInitialLoad, pathname]);

  // Handle route changes - Only for non-main pages
  useEffect(() => {
    if (!isInitialLoad && pathname !== '/') {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 400); // Much shorter for better performance

      return () => clearTimeout(timer);
    }
  }, [pathname, isInitialLoad]);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
