'use client'

import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
    type: 'button' | 'reset' | 'submit',
    variant: 'primary' | 'secondary',
    onClick?: () => void,
    children: React.ReactNode,
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(
    {
        type,
        variant,
        onClick = () => { },
        children,
        ...rest
    }: ButtonProps) {
    const base = 'px-4 py-3 font-semibold text-lg md:text-xl rounded-sm cursor-pointer transition duration-300';

    const variants = {
        primary: 'bg-slate-700 dark:bg-white text-white dark:text-slate-800 hover:bg-slate-800 dark:hover:bg-slate-300',
        secondary: 'bg-transparent hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-700 dark:border-white text-slate-700 dark:text-white'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-25`}
            {...rest}
        >
            {children}
        </button>
    );
}