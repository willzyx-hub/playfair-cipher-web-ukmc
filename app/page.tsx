'use client'

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t } = useTranslation();

    return (
        <main className="h-screen flex flex-col justify-center items-center p-4 md:p-20">
            <svg className="fixed top-20 left-20 size-24 text-slate-700 dark:text-white animate-bounce opacity-50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
            </svg>

            <svg className="fixed bottom-20 right-20 size-24 text-slate-700 dark:text-white animate-bounce opacity-50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14v3m4-6V7a3 3 0 1 1 6 0v4M5 11h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
            </svg>

            <div className="mb-12 text-center">
                <h1 className="mb-8 text-4xl md:text-6xl text-slate-800 dark:text-white font-extrabold">Playfair Cipher</h1>
                <p className="text-slate-600 text-lg md:text-2xl dark:text-slate-400">
                    {t('Intro')}
                </p>
            </div>

            <div className="flex gap-4">
                <Link
                    href={'/encryption'}
                    className="px-4 py-2 bg-slate-800 dark:bg-white text-white dark:text-slate-800 rounded-sm text-lg md:text-xl transition duration-300 hover:-translate-y-1 hover:opacity-75">
                    {t('Encryption')}
                </Link>
                <Link
                    href={'/decryption'}
                    className="px-4 py-2 border border-slate-800 dark:border-white text-slate-800 dark:text-white rounded-sm text-lg md:text-xl transition duration-300 hover:-translate-y-1 hover:opacity-75">
                    {t('Decryption')}
                </Link>
            </div>
        </main>
    );
}