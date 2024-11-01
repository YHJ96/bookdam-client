import type { Metadata } from 'next';

import { QueryProvider } from '@/providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'BookDam',
  description: 'BookDam',
};

type RooRootLayoutProps = {
  children: React.ReactNode;
};

function RootLayout({ children }: RooRootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

export default RootLayout;
