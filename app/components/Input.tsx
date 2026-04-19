import { InputHTMLAttributes } from "react";
import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { ErrorValidation } from "./ErrorValidation";

type InputProps<T extends FieldValues> = {
    name: string,
    type: string,
    label: string,
    register: UseFormRegister<T>,
    registerId: Path<T>,
    errors: FieldErrors<T>,
} & InputHTMLAttributes<HTMLInputElement>;

export function Input<T extends FieldValues>({
    name,
    type,
    label,
    register,
    registerId,
    errors,
    ...rest
}: InputProps<T>) {
    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={name}
                className="font-semibold text-lg md:text-xl">
                {label}
            </label>
            <input
                id={name}
                type={type}
                {...register(registerId)}
                {...rest}
                className="px-3 py-2 border border-gray-500 rounded-sm text-gray-700" />
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