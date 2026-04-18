export function Button(
    {
        type,
        variant,
        text,
        onClick = () => { },
        disabled = false,
    }: {
        type: 'button' | 'reset' | 'submit',
        variant: 'primary' | 'secondary',
        text: string,
        onClick?: () => void,
        disabled?: boolean,
    }
) {
    const base = 'px-4 py-3 font-semibold text-lg md:text-xl rounded-sm cursor-pointer transition duration-300';

    const variants = {
        primary: 'bg-slate-700 text-white hover:bg-slate-800',
        secondary: 'bg-white border border-slate-700 text-slate-700 hover:bg-slate-100'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-25`}
        >
            {text}
        </button>
    );
}