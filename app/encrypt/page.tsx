'use client'

import { PlayfairCipher } from "@/utils/PlayfairCipher";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { TextArea } from "../components/TextArea";
import { schemaEncryptPage } from "@/utils/validation";

type Schema = z.infer<typeof schemaEncryptPage>;

export default function EncryptPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaEncryptPage),
        criteriaMode: 'all',
    });

    const [matrix, setMatrix] = useState<string[][]>(() => (new PlayfairCipher('')).matrix);
    const [steps, setSteps] = useState<{
        input: string;
        output: string;
        inputPosition: number[][];
        outputPosition: number[][];
        rule: string;
    }[]>([]);
    const [current, setCurrent] = useState(-1);
    const [result, setResult] = useState('');

    const onSubmit = (data: Schema) => {
        const cipher = new PlayfairCipher(data.cipherKey);

        setMatrix(cipher.matrix);

        const { result, steps } = cipher.process(data.plainText, 'encrypt');
        setResult(result);
        setSteps(steps);
        setCurrent(0);
    }

    const isHighlighted = (r: number, c: number) => {
        if (current < 0) return 'bg-slate-100';
        let step = steps[current];
        let color = '';

        if (step.inputPosition.some(([rr, cc]) => rr === r && cc === c)) {
            color = 'bg-green-100 border border-green-500';
        } else if (step.outputPosition.some(([rr, cc]) => rr === r && cc === c)) {
            color = 'bg-orange-100 border border-orange-500'
        } else {
            color = 'bg-slate-100';
        }
        return color;
    }

    return (
        <main className="w-full p-4 md:p-8">
            <h1 className="mb-8 text-4xl text-gray-700 font-bold">Encrypt Playfair Cipher</h1>

            <div className="flex flex-col items-start md:flex-row gap-8">
                <section className="w-full md:w-2/5 p-4 bg-white border border-gray-500 rounded-lg shadow-2xl">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        className="flex flex-col gap-4"
                    >
                        <Input<Schema>
                            name="cipher-key"
                            type="text"
                            label="Cipher Key"
                            register={register}
                            registerId="cipherKey"
                            errors={errors}
                            placeholder="My secret key"
                            defaultValue={''}
                            required
                        />

                        <TextArea<Schema>
                            name="plain-text"
                            label="Plain Text"
                            register={register}
                            registerId="plainText"
                            errors={errors}
                            placeholder="Message want to be encrypt"
                            defaultValue={''}
                            rows={5}
                            required
                        />

                        <TextArea<Schema>
                            name="cipher-text"
                            label="Cipher Text"
                            register={register}
                            registerId="cipherText"
                            errors={errors}
                            value={result}
                            rows={5}
                            readOnly
                        />

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
                                reset();
                                setResult('');
                                setCurrent(-1);
                                setMatrix(() => (new PlayfairCipher('')).matrix);
                                setSteps([]);
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
                                        className={`aspect-square flex justify-center items-center p-2 ${isHighlighted(rowIndex, colIndex)} border border-gray-200 rounded-sm shadow-md text-lg md:text-xl transition duration-300 hover:-translate-y-1`}>
                                        {rowValue}
                                    </div>
                                ))
                            )
                        }
                    </div>
                    {
                        current !== -1 && (
                            <div className="flex flex-col items-center">
                                <p className="mb-4 text-2xl">
                                    <span className="font-mono font-semibold p-1 bg-green-100 border border-green-500 rounded-sm">{steps[current].input}</span>
                                    <span className="mx-4">➡️</span>
                                    <span className="font-mono font-semibold p-1 bg-orange-100 border border-orange-500 rounded-sm">{steps[current].output}</span>
                                </p>

                                <p className="mb-8 p-2 bg-slate-200 border border-slate-500 rounded-sm">"{steps[current].rule}"</p>

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
