'use client'

import { LocaleProvider } from '@/context/LocaleContext';
import { ThemeProvider } from '@/context/ThemeContext';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <LocaleProvider>
                {children}
            </LocaleProvider>
        </ThemeProvider>
    );
}