import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { getBookmark } from '@/entities/bookmark/api';
import { QueryProvider, ThemeProvider } from '@/providers';
import { font } from '@/shared/libs';
import { DialogProvider } from '@/shared/ui';
import { cookieWrapper, getSession } from '@/shared/utils/server';
import { Layout } from '@/views';

import './globals.css';

export const metadata: Metadata = {
  title: 'BookDam',
  description: 'BookDam',
};

type RooRootLayoutProps = {
  children: React.ReactNode;
};

/* https://github.com/pacocoursey/next-themes/blob/bf0c5a45eaf6fb2b336a6b93840e4ec572bc08c8/next-themes/README.md?plain=1#L95C1-L96C1 */
async function RootLayout({ children }: RooRootLayoutProps) {
  const queryClient = new QueryClient();
  const session = await getSession();

  if (session) {
    await queryClient.prefetchQuery({ queryKey: ['user'], queryFn: getSession });

    await queryClient.prefetchQuery({
      queryKey: ['bookmark'],
      queryFn: unstable_cache(cookieWrapper(session.accessToken, session.refreshToken, getBookmark), [session.id], {
        revalidate: 3600,
        tags: ['bookmark'],
      }),
    });
  }

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider>
          <QueryProvider>
            <DialogProvider>
              <HydrationBoundary state={dehydrate(queryClient)}>
                <Layout>{children}</Layout>
              </HydrationBoundary>
            </DialogProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
