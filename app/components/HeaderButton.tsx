"use client"

import { redirect } from "next/navigation";
import { Button } from "./Button";
import Image from "next/image";

import IndonesiaFlag from "@/public/images/Indonesia.jpg";
import USAFlag from "@/public/images/USA.jpg";
import { useTranslation } from "react-i18next";
import React, { SetStateAction } from "react";

type HeaderButtonProps = {
    locale: 'en' | 'id',
    setLocale: React.Dispatch<SetStateAction<'en' | 'id'>>,
    setIsHelpModalOpen: React.Dispatch<SetStateAction<boolean>>,
};

export function HeaderButton({ locale, setLocale, setIsHelpModalOpen }: HeaderButtonProps) {
    const { t } = useTranslation();

    return (
        <>
            <Button
                type="button"
                variant="secondary"
                onClick={() => redirect('/')}
            >
                <div className="flex gap-2 items-center">
                    <svg className="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                    </svg>
                    <span>Beranda</span>
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
                onClick={() => setLocale(locale === 'en' ? 'id' : 'en')}
            >
                {locale === 'en' ? (
                    <Image
                        src={USAFlag}
                        alt="English (USA)"
                        width={45}
                        height={30}
                    />
                ) : (
                    <Image
                        src={IndonesiaFlag}
                        alt="English (USA)"
                        width={45}
                        height={30}
                    />
                )}
            </Button>
        </>
    );
}