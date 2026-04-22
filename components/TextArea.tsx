'use client'

import { TextareaHTMLAttributes } from 'react';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { ErrorValidation } from './ErrorValidation';

type TextAreaProps<T extends FieldValues> = {
    labelId: string,
    register: UseFormRegister<T>,
    registerId: Path<T>,
    errors: FieldErrors<T>,
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextArea<T extends FieldValues>({
    labelId,
    register,
    registerId,
    errors,
    ...rest
}: TextAreaProps<T>) {
    return (
        <>
            <textarea
                id={labelId}
                {...register(registerId)}
                {...rest}
                className="px-3 py-2 border border-gray-500 rounded-sm text-gray-700 dark:text-gray-300"
            >
            </textarea>
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