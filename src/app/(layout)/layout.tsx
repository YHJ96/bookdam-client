import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { QueryProvider, ThemeProvider } from '@/providers';
import { font } from '@/shared/libs';
import { DialogProvider } from '@/shared/ui';
import { decrypt, jwtDecode } from '@/shared/utils';
import { Layout } from '@/views';

import './globals.css';

export const metadata: Metadata = {
  title: 'BookDam',
  description: 'BookDam',
};

type RooRootLayoutProps = {
  children: React.ReactNode;
};

function getSession() {
  try {
    const cookie = cookies();
    const accessToken = cookie.get('access')?.value ?? '';
    const jwt = jwtDecode(accessToken);
    const user = decrypt(jwt.ec);

    return user;
  } catch {
    return undefined;
  }
}

/* https://github.com/pacocoursey/next-themes/blob/bf0c5a45eaf6fb2b336a6b93840e4ec572bc08c8/next-themes/README.md?plain=1#L95C1-L96C1 */
async function RootLayout({ children }: RooRootLayoutProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ['user'], queryFn: getSession });

  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider>
          <QueryProvider>
            <DialogProvider>
              <HydrationBoundary state={dehydratedState}>
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
