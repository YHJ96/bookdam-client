'use client';

import { useState } from 'react';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';

import { nextApi } from '@/shared/libs';

type QueryProviderProps = {
  children: React.ReactNode;
};

export default function QueryProvider({ children }: QueryProviderProps) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: false } },
        queryCache: new QueryCache({
          onError: async (err) => {
            if (!(err instanceof AxiosError)) return;

            if (err.status === 401) {
              await nextApi.delete('/cookie');
              client.setQueryData(['user'], null);
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: async (err) => {
            if (!(err instanceof AxiosError)) return;

            if (err.status === 401) {
              await nextApi.delete('/cookie');
              client.setQueryData(['user'], null);
            }
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={client}>
      <>{children}</>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
