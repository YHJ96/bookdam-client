import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { getBookmarksApi } from '@/entities/bookmark/api';
import { getTagsApi } from '@/entities/tag/api';
import { QueryProvider } from '@/providers';
import { DialogProvider } from '@/shared/ui';
import { cookieWrapper, getSession } from '@/shared/utils/server';
import { Layout } from '@/views';

import './globals.css';

export const metadata: Metadata = {
  title: 'BookDam',
  description: 'BookDam',
};

type MainLayoutProps = {
  children: React.ReactNode;
};

/* https://github.com/pacocoursey/next-themes/blob/bf0c5a45eaf6fb2b336a6b93840e4ec572bc08c8/next-themes/README.md?plain=1#L95C1-L96C1 */
async function MainLayout({ children }: MainLayoutProps) {
  const queryClient = new QueryClient();
  const session = await getSession();

  if (session) {
    await queryClient.prefetchQuery({ queryKey: ['user'], queryFn: getSession });

    await queryClient.prefetchQuery({
      queryKey: ['bookmark'],
      queryFn: unstable_cache(
        cookieWrapper(session.accessToken, session.refreshToken, getBookmarksApi),
        ['bookmark', session.id],
        {
          revalidate: 3600,
          tags: ['bookmark'],
        },
      ),
    });

    await queryClient.prefetchQuery({
      queryKey: ['tag'],
      queryFn: unstable_cache(
        cookieWrapper(session.accessToken, session.refreshToken, getTagsApi),
        ['tag', session.id],
        { revalidate: 3600, tags: ['tag'] },
      ),
    });
  }

  return (
    <QueryProvider>
      <DialogProvider>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Layout>{children}</Layout>
        </HydrationBoundary>
      </DialogProvider>
    </QueryProvider>
  );
}

export default MainLayout;
