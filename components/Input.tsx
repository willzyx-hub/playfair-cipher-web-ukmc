'use client'

import { InputHTMLAttributes } from 'react';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { ErrorValidation } from './ErrorValidation';

type InputProps<T extends FieldValues> = {
    labelId: string,
    type: string,
    register: UseFormRegister<T>,
    registerId: Path<T>,
    errors: FieldErrors<T>,
} & InputHTMLAttributes<HTMLInputElement>;

export function Input<T extends FieldValues>({
    labelId,
    type,
    register,
    registerId,
    errors,
    ...rest
}: InputProps<T>) {
    return (
        <>
            <input
                id={labelId}
                type={type}
                {...register(registerId)}
                {...rest}
                className="px-3 py-2 border border-gray-500 rounded-sm text-gray-700 dark:text-gray-300" />
            {
                errors?.[registerId]?.types && (
                    Object.values(errors[registerId].types).map((message, i) => (
                        <ErrorValidation key={i} message={message} />
                    ))
                )
            }
        </>
    );
}