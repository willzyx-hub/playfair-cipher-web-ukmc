'use client'

import React, { createContext, SetStateAction, useContext, useEffect, useEffectEvent, useState } from 'react';
import i18next from '@/utils/i18next';

type LocaleContextType = {
    locale: 'en' | 'id',
    setLocale: React.Dispatch<SetStateAction<'en' | 'id'>>,
}

const LocaleContext = createContext<LocaleContextType>({
    locale: 'en',
    setLocale: () => { },
});

function LocaleProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<'en' | 'id'>('en');

    const isValidLocale = (val: string): val is 'en' | 'id' => {
        return val === 'en' || val === 'id';
    };

    const getLocaleDefault = () => {
        return navigator.language.split('-')[0];
    };

    const getLocale = useEffectEvent(() => {
        const stored = localStorage.getItem('locale') || getLocaleDefault();
        const validStored = isValidLocale(stored) ? stored : 'en';
        setLocale(validStored);
    });

    useEffect(() => {
        getLocale();
    }, []);

    useEffect(() => {
        if (locale === 'id' || locale === 'en') {
            localStorage.setItem('locale', locale);
            i18next.changeLanguage(locale);
        }
    }, [locale])

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    );
}

function useLocale() {
    return useContext(LocaleContext);
}

export {
    LocaleProvider,
    useLocale,
};