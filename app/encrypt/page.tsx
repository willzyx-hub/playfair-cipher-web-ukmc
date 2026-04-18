'use client'

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    keyCipher: string,
    plainText: string,
};

export default function EncryptPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <main className="p-4 md:p-8">
            <h1 className="mb-8 text-4xl text-center text-gray-700 font-bold">Playfair Cipher</h1>

            <div className="flex flex-col md:flex-row gap-16">
                <section className="w-full md:w-2/5 p-4 border border-gray-500 rounded-lg shadow-2xl">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="key-cipher"
                                className="font-semibold text-lg md:text-xl">
                                Key
                            </label>
                            <input
                                type="text"
                                id="key-cipher"
                                placeholder="My secret key"
                                defaultValue={''}
                                {...register('keyCipher')}
                                className="px-3 py-2 border border-gray-500 rounded-sm text-gray-700" />
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
                                {...register('plainText')}
                                className="px-3 py-2 border border-gray-500 rounded-sm text-gray-700">
                            </textarea>
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
                            className="px-4 py-3 font-bold text-lg md:text-xl bg-gray-800 text-white rounded-sm cursor-pointer transition duration-300 hover:opacity-75"
                        >
                            Start Encrypt
                        </button>
                    </form>
                </section>

                <section className="w-full md:w-3/5 p-4 border border-gray-500 rounded-lg shadow-2xl">
                    <div className="h-full grid grid-cols-5 grid-rows-5 gap-4">
                        <div className="aspect-square flex justify-center items-center p-2 border border-gray-500 rounded-sm text-lg md:text-xl">
                            A
                        </div>
                    </div>
                </section>
            </div>
        </main >
    );
}
