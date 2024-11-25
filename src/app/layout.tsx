import type { Metadata } from 'next';

import { QueryProvider, ThemeProvider } from '@/providers';
import { font } from '@/shared/libs';
import { DialogProvider } from '@/shared/ui';
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
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider>
          <QueryProvider>
            <DialogProvider>
              <Layout>{children}</Layout>
            </DialogProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
