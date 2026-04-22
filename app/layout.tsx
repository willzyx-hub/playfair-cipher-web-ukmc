import type { Metadata } from 'next';
import { Ubuntu, Ubuntu_Mono } from 'next/font/google';
import './globals.css';
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
        <html
            lang="en"
            className={`${ubuntu.variable} ${ubuntuMono.variable} h-full antialiased`}
        >
            <body className="min-h-full max-w-7xl block mx-auto bg-slate-50 dark:bg-slate-800 dark:text-white transition duration-500">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}