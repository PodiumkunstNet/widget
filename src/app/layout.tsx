'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/features/shared/providers/QueryProvider';
import localFont from 'next/font/local';
import { cn } from '@/features/shared/utils/cn';

const euclidTriangleMedium = localFont({
  src: '../fonts/EuclidTriangle-Medium-WebS.woff2',
  variable: '--font-euclid',
  display: 'swap',
});

const goodSansRegular = localFont({
  src: '../fonts/GoodSans-Regular.ttf',
  variable: '--font-goodsans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(euclidTriangleMedium.variable, goodSansRegular.variable)}
    >
      <body className={inter.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
