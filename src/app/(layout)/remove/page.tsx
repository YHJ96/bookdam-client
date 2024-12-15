import { unstable_cache } from 'next/cache';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { getTrashBookmark } from '@/entities/trash-bookmark/api';
import { cookieWrapper, getSession } from '@/shared/utils/server';
import { Remove } from '@/views';

export default async function Page() {
  const queryClient = new QueryClient();
  const session = await getSession();

  if (session) {
    await queryClient.prefetchQuery({
      queryKey: ['trash'],
      queryFn: unstable_cache(
        cookieWrapper(session.accessToken, session.refreshToken, getTrashBookmark),
        ['trash', session.id],
        { revalidate: 3600, tags: ['trash'] },
      ),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Remove />
    </HydrationBoundary>
  );
}
