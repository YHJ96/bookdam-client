import { Noto_Sans_KR } from 'next/font/google';

export const font = Noto_Sans_KR({
  subsets: ['latin'],
  style: ['normal'],
  weight: ['400', '500', '600', '700'],
  preload: true,
  adjustFontFallback: true,
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});
