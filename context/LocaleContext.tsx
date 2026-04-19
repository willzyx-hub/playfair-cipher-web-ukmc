"use client"

import React, { createContext, SetStateAction, useContext, useEffect, useState } from "react";
import i18next from "@/utils/i18next";

function getLocale(): 'en' | 'id' {
    const locale = localStorage.getItem('locale');
    if (locale === 'en' || locale === 'id') {
        return locale;
    }
    return 'en';
}

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

    useEffect(() => {
        setLocale(() => getLocale());
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