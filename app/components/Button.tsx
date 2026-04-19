import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
    type: 'button' | 'reset' | 'submit',
    variant: 'primary' | 'secondary',
    text: string,
    onClick?: () => void,
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(
    {
        type,
        variant,
        text,
        onClick = () => { },
        ...rest
    }: ButtonProps) {
    const base = 'px-4 py-3 font-semibold text-lg md:text-xl rounded-sm cursor-pointer transition duration-300';

    const variants = {
        primary: 'bg-slate-700 text-white hover:bg-slate-800',
        secondary: 'bg-white border border-slate-700 text-slate-700 hover:bg-slate-100'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-25`}
            {...rest}
        >
            {text}
        </button>
    );
}