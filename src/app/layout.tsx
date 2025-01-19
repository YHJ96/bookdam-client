import type { Metadata } from 'next';

import { ThemeProvider } from '@/providers';
import { font } from '@/shared/libs';

import './(layout)/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_CLIENT_URL),
  title: '북담',
  description: '북마크를 쉽게 관리하세요.',
  icons: '/favicon.ico',
  manifest: '/manifest.json',
  keywords: ['북마크', '북담', '북마크 관리', '웹 북마크', 'bookmark'],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_CLIENT_URL,
  },
  openGraph: {
    title: '북담',
    description: '북마크를 쉽게 관리하세요.',
    url: process.env.NEXT_PUBLIC_CLIENT_URL,
    siteName: '북담',
    images: {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: '북담',
    },
  },

  twitter: {
    card: 'summary_large_image',
    title: '북담 - 북마크 관리 서비스',
    description: '북마크를 쉽게 관리하세요.',
    images: '/og-image.png',
  },
};

type RooRootLayoutProps = {
  children: React.ReactNode;
};

/* https://github.com/pacocoursey/next-themes/blob/bf0c5a45eaf6fb2b336a6b93840e4ec572bc08c8/next-themes/README.md?plain=1#L95C1-L96C1 */
async function RootLayout({ children }: RooRootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
