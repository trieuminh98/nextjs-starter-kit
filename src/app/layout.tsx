import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Provider from '@/providers/provider';
import { rootMetadata } from '../../config/root-metadata';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

export const metadata: Metadata = { ...rootMetadata };
