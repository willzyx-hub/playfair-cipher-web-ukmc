'use client'

import { ValidateResult } from 'react-hook-form';

export function ErrorValidation({ message }: { message: ValidateResult }) {
    return (
        <small
            className="flex items-center gap-1 text-red-500">
            <svg className="size-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>
                {message}
            </span>
        </small>
    );
}