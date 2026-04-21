import type { Metadata } from 'next';
import { Ubuntu, Ubuntu_Mono } from 'next/font/google';
import './globals.css';
import { LocaleProvider } from '@/context/LocaleContext';
import { Providers } from '@/context/Providers';

const ubuntu = Ubuntu({
  variable: '--font-sans',
  weight: '400',
  subsets: ['latin'],
});

const ubuntuMono = Ubuntu_Mono({
  variable: '--font-mono',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Playfair Cipher',
  description: 'Interactive encryption and decription for algorithm Playfair Cipher',
  icons: '/icons/logo.svg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LocaleProvider>
      <html
        lang="en"
        className={`${ubuntu.variable} ${ubuntuMono.variable} h-full antialiased`}
      >
        <body className="min-h-full max-w-7xl block mx-auto bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </LocaleProvider>
  );
}