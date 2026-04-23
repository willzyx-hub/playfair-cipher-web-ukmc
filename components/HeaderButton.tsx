'use client'

import { redirect } from 'next/navigation';
import { Button } from './Button';
import Image from 'next/image';

import IndonesiaFlag from '@/public/images/Indonesia.jpg';
import USAFlag from '@/public/images/USA.jpg';
import { useTranslation } from 'react-i18next';
import React, { SetStateAction } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLocale } from '@/context/LocaleContext';

type HeaderButtonProps = {
    setIsHelpModalOpen: React.Dispatch<SetStateAction<boolean>>,
};

export function HeaderButton({
    setIsHelpModalOpen
}: HeaderButtonProps) {
    const { t } = useTranslation();
    const { locale, setLocale } = useLocale();
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex overflow-x-auto gap-4">
            <Button
                type="button"
                variant="secondary"
                onClick={() => redirect('/')}
            >
                <div className="flex gap-2 items-center">
                    <svg className="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                    </svg>
                    <span>{t('Home')}</span>
                </div>
            </Button>

            <Button
                type="button"
                variant="secondary"
                onClick={() => setIsHelpModalOpen(true)}
            >
                <div className="flex items-center gap-2">
                    <svg className="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span>{t('Help')}</span>
                </div>
            </Button>

            <Button
                type="button"
                variant="secondary"
                onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
            >
                {theme === 'light' ? '☀️' : '🌙'}
            </Button>

            <Button
                type="button"
                variant="secondary"
                onClick={() => setLocale(prev => prev === 'en' ? 'id' : 'en')}
            >
                {locale === 'en' ? (
                    <div className="relative w-12 h-auto aspect-[16/10]">
                        <Image
                            src={USAFlag}
                            alt="English (USA)"
                            fill={true}
                            className="w-full h-auto"
                        />
                    </div>
                ) : (
                    <div className="relative w-12 h-auto aspect-[16/10]">
                        <Image
                            src={IndonesiaFlag}
                            alt="Indonesia"
                            fill={true}
                            className="w-full h-auto"
                        />
                    </div>
                )}
            </Button>
        </div>
    );
}