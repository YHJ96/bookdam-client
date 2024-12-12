import { unstable_cache, unstable_noStore } from 'next/cache';
import { cookies } from 'next/headers';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { api } from '@/shared/libs';
import { Home } from '@/views';

const getBookmark = (access: string, refresh: string) => async () => {
  const response = await api.get('/bookmark', {
    headers: {
      Cookie: `access=${access}; refresh=${refresh}`,
    },
  });

  return response.data;
};

export default async function Page() {
  const queryClient = new QueryClient();

  const cookie = await cookies();
  const access = cookie.get('access')?.value ?? '';
  const refresh = cookie.get('refresh')?.value ?? '';

  if (access !== '') {
    await queryClient.prefetchQuery({
      queryKey: ['bookmark'],
      queryFn: unstable_cache(getBookmark(access, refresh), [''], {
        revalidate: 3600,
        tags: ['bookmark'],
      }),
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Home />
    </HydrationBoundary>
  );
}
