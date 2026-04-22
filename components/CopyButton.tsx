import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export function CopyButton({ text }: { text: string }) {
    const [isCopied, setIsCopied] = useState(false);
    const { t } = useTranslation();

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <button
            type="button"
            title={t('Copy')}
            disabled={!text}
            onClick={() => handleCopy(String(text))}
            className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
            {
                isCopied ? (
                    <svg className="size-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                ) : (
                    <svg className="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z" />
                    </svg>
                )
            }
        </button>
    );
}