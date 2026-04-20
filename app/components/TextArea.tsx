'use client'

import { TextareaHTMLAttributes } from 'react';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { ErrorValidation } from './ErrorValidation';

type TextAreaProps<T extends FieldValues> = {
    name: string,
    label: string,
    register: UseFormRegister<T>,
    registerId: Path<T>,
    errors: FieldErrors,
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextArea<T extends FieldValues>({
    name,
    label,
    register,
    registerId,
    errors,
    ...rest
}: TextAreaProps<T>) {
    console.log(errors);
    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={name}
                className="font-semibold text-lg md:text-xl">
                {label}
            </label>
            <textarea
                id={name}
                {...register(registerId)}
                {...rest}
                className="px-3 py-2 border border-gray-500 rounded-sm text-gray-700">
            </textarea>
            {
                errors?.[registerId]?.types && (
                    Object.values(errors[registerId].types).map((message, i) => (
                        <ErrorValidation key={i} message={message} />
                    ))
                )
            }
        </div>
    );
}