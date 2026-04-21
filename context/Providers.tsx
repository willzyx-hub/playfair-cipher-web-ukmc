'use client'

import { LocaleProvider } from '@/context/LocaleContext';
import React from 'react';
import '@/utils/i18next';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <LocaleProvider>
            {children}
        </LocaleProvider>
    );
}