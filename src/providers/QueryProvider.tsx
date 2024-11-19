'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/shared/libs';

type QueryProviderProps = {
  children: React.ReactNode;
};

export default function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <>{children}</>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}
