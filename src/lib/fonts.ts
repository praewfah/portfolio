import { Prompt } from 'next/font/google';

export const siteFont = Prompt({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

export const siteFontClassName = siteFont.variable;
