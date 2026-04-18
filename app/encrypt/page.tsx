'use client'

import { PlayfairCipher } from "@/utils/PlayfairCipher";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ErrorInput } from "../components/ErrorInput";
import { Button } from "../components/Button";

const schema = z.object({
    cipherKey: z.string().min(1, { error: 'Cannot be empty' }).regex(/^[A-za-z]+$/, { error: 'Alphabet only' }),
    plainText: z.string().min(1, { error: 'Cannot be empty' }).regex(/^[A-za-z]+$/, { error: 'Alphabet only' }),
})

type Schema = z.infer<typeof schema>;

export default function EncryptPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        criteriaMode: 'all',
    });

    const [matrix, setMatrix] = useState<string[][]>(() => (new PlayfairCipher('')).matrix);
    const [steps, setSteps] = useState<{
        input: string;
        output: string;
        rule: string;
        position: number[][];
    }[]>([]);
    const [current, setCurrent] = useState(-1);
    const [result, setResult] = useState('');

    const onSubmit = (data: Schema) => {
        const cipher = new PlayfairCipher(data.cipherKey);

        setMatrix(cipher.matrix);

        const { result, steps } = cipher.process(data.plainText);
        setResult(result);
        setSteps(steps);
        setCurrent(0);
    }

    const isHighlighted = (r: number, c: number) => {
        if (current < 0) return false;
        let step = steps[current];
        return step.position.some(([rr, cc]) => rr === r && cc === c);
    }

    return (
        <main className="p-4 md:p-8">
            <h1 className="mb-8 text-4xl text-gray-700 font-bold">Encrypt Playfair Cipher</h1>

            <div className="flex flex-col items-start md:flex-row gap-8">
                <section className="w-full md:w-2/5 p-4 bg-white border border-gray-500 rounded-lg shadow-2xl">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
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
                                required
                                defaultValue={''}
                                {...register('cipherKey', { required: true })}
                                className="px-3 py-2 border border-gray-500 rounded-sm text-gray-700" />
                            {
                                errors.cipherKey?.types && (
                                    Object.values(errors.cipherKey.types).map((msg, i) => (
                                        <small
                                            key={i}
                                            className="flex items-center gap-1 text-red-500">
                                            <svg className="size-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <span>
                                                {msg}
                                            </span>
                                        </small>
                                    ))
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
                                required
                                defaultValue={''}
                                {...register('plainText', { required: true })}
                                className="px-3 py-2 border border-gray-500 rounded-sm text-gray-700">
                            </textarea>
                            {
                                errors.plainText?.types && (
                                    Object.values(errors.plainText.types).map((message, i) => (
                                        <ErrorInput key={i} message={message} />
                                    ))
                                )
                            }
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="cipher-text"
                                className="font-semibold text-lg md:text-xl">
                                Cipher Text
                            </label>
                            <textarea
                                rows={5}
                                id="cipher-text"
                                readOnly
                                value={result}
                                className="px-3 py-2 border border-gray-500 rounded-sm text-gray-700">
                            </textarea>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            text="Start Encrypt"
                        />

                        <Button
                            type="reset"
                            variant="secondary"
                            text="Reset"
                            onClick={() => {
                                setResult('');
                                setCurrent(-1);
                                setMatrix(() => (new PlayfairCipher('')).matrix);
                                setSteps([])
                            }}
                        />
                    </form>
                </section>

                <section className="w-full md:w-3/5 p-4 bg-white border border-gray-500 rounded-lg shadow-2xl">
                    <div className="h-full grid grid-cols-5 grid-rows-5 gap-4 mb-8">
                        {
                            matrix.map((rowList, rowIndex) =>
                                rowList.map((rowValue, colIndex) => (
                                    <div
                                        key={rowIndex + '-' + colIndex}
                                        className={`aspect-square flex justify-center items-center p-2 ${isHighlighted(rowIndex, colIndex) ? 'bg-green-500' : 'bg-slate-100'} border border-gray-200 rounded-sm shadow-md text-lg md:text-xl transition duration-300 hover:-translate-y-1`}>
                                        {rowValue}
                                    </div>
                                ))
                            )
                        }
                    </div>
                    {
                        current !== -1 && (
                            <div className="flex flex-col items-center">
                                <p className="mb-2 text-2xl">
                                    <span className="font-mono font-semibold">{steps[current].input}</span>
                                    <span className="mx-4">➡️</span>
                                    <span className="font-mono font-semibold">{steps[current].output}</span>
                                </p>

                                <p className="mb-4 p-2 text-xl bg-green-500 text-white rounded-sm">"{steps[current].rule}"</p>

                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => setCurrent(prev => prev - 1)}
                                        text="Before"
                                        disabled={current === 0}
                                    />

                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => setCurrent(prev => prev + 1)}
                                        text="Next"
                                        disabled={current === steps.length - 1}
                                    />
                                </div>
                            </div>
                        )
                    }
                </section>
            </div>
        </main >
    );
}
