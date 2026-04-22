'use client'

import React, { SetStateAction, useEffect, useEffectEvent, useState } from 'react';

type ThemeContextType = {
    theme: 'light' | 'dark',
    setTheme: React.Dispatch<SetStateAction<'light' | 'dark'>>,
}

const ThemeContext = React.createContext<ThemeContextType>({
    theme: 'light',
    setTheme: () => { },
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const isValidTheme = (val: string): val is 'light' | 'dark' => {
        return val === 'light' || val === 'dark';
    };

    const getDefaultSystem = () => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const getTheme = useEffectEvent(() => {
        const stored = localStorage.getItem('theme') || getDefaultSystem();
        const validStored = isValidTheme(stored) ? stored : getDefaultSystem();
        document.documentElement.setAttribute('data-theme', validStored);
        setTheme(validStored);
    });

    useEffect(() => {
        getTheme();
    }, [])

    useEffect(() => {
        if (theme === 'light' || theme === 'dark') {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

function useTheme() {
    return React.useContext(ThemeContext);
}

export {
    ThemeProvider,
    useTheme,
};