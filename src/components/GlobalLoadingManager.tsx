'use client';

import { useLoading } from '@/hooks/useLoading';
import LoadingSpinner from './LoadingSpinner';

export function GlobalLoadingManager() {
  const { isLoading } = useLoading();
  
  return <LoadingSpinner isLoading={isLoading} />;
}
