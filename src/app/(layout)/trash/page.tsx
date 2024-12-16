import { unstable_cache } from 'next/cache';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { getTrashBookmarksApi } from '@/entities/trash-bookmark/api';
import { cookieWrapper, getSession } from '@/shared/utils/server';
import { Trash } from '@/views';

export default async function Page() {
  const queryClient = new QueryClient();
  const session = await getSession();

  if (session) {
    await queryClient.prefetchQuery({
      queryKey: ['trash'],
      queryFn: unstable_cache(
        cookieWrapper(session.accessToken, session.refreshToken, getTrashBookmarksApi),
        ['trash', session.id],
        { revalidate: 3600, tags: ['trash'] },
      ),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Trash />
    </HydrationBoundary>
  );
}
