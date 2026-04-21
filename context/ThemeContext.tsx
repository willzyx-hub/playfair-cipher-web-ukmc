'use client'

import React, { SetStateAction, useEffect, useState } from 'react';

export type ThemeContextType = {
    theme: 'light' | 'dark',
    setTheme: React.Dispatch<SetStateAction<'light' | 'dark'>>,
}

export const ThemeContext = React.createContext<ThemeContextType>({
    theme: 'light',
    setTheme: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window === 'undefined') return 'light';
        const saved = localStorage.getItem('theme');
        if (saved === 'light' || saved === 'dark') return saved;
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return React.useContext(ThemeContext);
}