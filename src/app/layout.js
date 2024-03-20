import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import 'flowbite';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ad widget generator',
  description: 'Generators to simplify ad widget creation',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SpeedInsights />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
