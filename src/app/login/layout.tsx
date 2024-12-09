import { ThemeProvider } from '@/providers';

import '../(layout)/globals.css';

export const metadata = {
  title: 'BookDam',
  description: 'BookDam',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
