import type { Config } from 'tailwindcss';

const rem0_10: Record<number, string> = { ...Array.from(Array(11)).map((_, i) => `${i / 16}rem`) };
const rem0_100: Record<number, string> = { ...Array.from(Array(101)).map((_, i) => `${i / 16}rem`) };
const rem0_200: Record<number, string> = { ...Array.from(Array(201)).map((_, i) => `${i / 16}rem`) };
const rem0_500: Record<number, string> = { ...Array.from(Array(501)).map((_, i) => `${i / 16}rem`) };

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/templates/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderWidth: rem0_10,
      fontSize: rem0_100,
      lineHeight: rem0_100,
      spacing: rem0_200,
      gap: rem0_100,
      minHeight: rem0_200,
      minWidth: rem0_200,
      width: rem0_500,
      height: rem0_500,
      colors: {},
    },
  },
  plugins: [],
};

export default config;
