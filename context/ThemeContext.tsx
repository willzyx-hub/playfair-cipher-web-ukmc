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

    const getTheme = useEffectEvent(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'light' || theme === 'dark') {
            return theme;
        }

        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    });

    useEffect(() => {
        const theme = getTheme();
        document.documentElement.setAttribute('data-theme', theme);
        setTheme(theme);
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
}