'use client';

import { useState } from 'react';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider, Register } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';

import { useToast } from '@/shared/hooks';
import { nextApi } from '@/shared/libs';

type QueryProviderProps = {
  children: React.ReactNode;
};

export default function QueryProvider({ children }: QueryProviderProps) {
  const { toast } = useToast();

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
              return;
            }

            toast({ title: '에러가 발생했습니다.', description: '잠시후에 시도해주세요.', variant: 'destructive' });
          },
        }),
        mutationCache: new MutationCache({
          onSuccess: (_, __, ___, mutation) => {
            if (mutation.meta?.isSuccess) return;

            toast({ title: '성공하였습니다.', description: '요청이 성공적으로 반영되었습니다.', variant: 'default' });
          },

          onError: async (err, _, __, mutation) => {
            if (!(err instanceof AxiosError)) return;
            if (mutation.meta?.isThrowError) return;

            if (err.status === 401) {
              await nextApi.delete('/cookie');
              client.setQueryData(['user'], null);
              return;
            }

            toast({ title: '에러가 발생했습니다.', description: '잠시후에 시도해주세요.', variant: 'destructive' });
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
