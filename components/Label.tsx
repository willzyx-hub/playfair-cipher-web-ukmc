import React from 'react';

export function Label({ name, children }: { name: string, children: React.ReactNode }) {
    return (
        <label
            htmlFor={name}
            className="font-semibold text-lg md:text-xl text-slate-700 dark:text-white">
            {children}
        </label>
    );
}