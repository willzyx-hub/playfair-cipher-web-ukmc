'use client'

import { generateGrid } from "@/utils/playfair-cipher";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    cipherKey: string,
    plainText: string,
};

export default function EncryptPage() {
    const [gridLetters, setGridLetters] = useState<object | null>(() => generateGrid(''));

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setGridLetters(generateGrid(data.cipherKey.toUpperCase()));
    };

    const onReset = () => {
        reset();
    }

    return (
        <main className="p-4 md:p-8">
            <h1 className="mb-8 text-4xl text-center text-gray-700 font-bold">Playfair Cipher</h1>

            <div className="flex flex-col items-start md:flex-row gap-8">
                <section className="w-full md:w-2/5 p-4 border border-gray-500 rounded-lg shadow-2xl">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="cipher-key"
                                className="font-semibold text-lg md:text-xl">
                                Key
                            </label>
                            <input
                                type="text"
                                id="cipher-key"
                                placeholder="My secret key"
                                defaultValue={''}
                                {...register('cipherKey', { required: true })}
                                className="px-3 py-2 border border-gray-500 rounded-sm text-gray-700" />
                            {
                                errors.cipherKey && (
                                    <small className="flex items-center gap-1 text-red-500">
                                        <svg className="size-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <span>
                                            Key is required
                                        </span>
                                    </small>
                                )
                            }
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="plain-text"
                                className="font-semibold text-lg md:text-xl">
                                Plain text
                            </label>
                            <textarea
                                rows={5}
                                id="plain-text"
                                placeholder="My secret note"
                                defaultValue={''}
                                {...register('plainText', { required: true })}
                                className="px-3 py-2 border border-gray-500 rounded-sm text-gray-700">
                            </textarea>
                            {
                                errors.plainText && (
                                    <small className="flex items-center gap-1 text-red-500">
                                        <svg className="size-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <span>
                                            Plain text is required
                                        </span>
                                    </small>
                                )
                            }
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="plain-text"
                                className="font-semibold text-lg md:text-xl">
                                Cipher Text
                            </label>
                            <textarea
                                rows={5}
                                id="plain-text"
                                disabled
                                className="px-3 py-2 border border-gray-500 rounded-sm text-gray-700">
                            </textarea>
                        </div>

                        <button
                            type="submit"
                            className="px-4 py-3 font-semibold text-lg md:text-xl bg-gray-800 text-white rounded-sm cursor-pointer transition duration-300 hover:opacity-75"
                        >
                            Start Encrypt
                        </button>

                        <button
                            type="button"
                            onClick={onReset}
                            className="px-4 py-3 font-semibold text-lg md:text-xl border border-gray-800 text-gray-800 rounded-sm cursor-pointer transition duration-300 hover:opacity-75"
                        >
                            Reset
                        </button>
                    </form>
                </section>

                <section className="w-full md:w-3/5 p-4 border border-gray-500 rounded-lg shadow-2xl">
                    <div className="h-full grid grid-cols-5 grid-rows-5 gap-4">
                        {
                            gridLetters && (
                                Object.keys(gridLetters).map(letter => (
                                    <div
                                        key={letter}
                                        className="aspect-square flex justify-center items-center p-2 border border-gray-500 rounded-sm text-lg md:text-xl transition duration-300 hover:-translate-y-1">
                                        {letter}
                                    </div>
                                ))
                            )
                        }
                    </div>
                </section>
            </div>
        </main >
    );
}
