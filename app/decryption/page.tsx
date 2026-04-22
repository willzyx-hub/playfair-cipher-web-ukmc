'use client'

import { PlayfairCipher } from '@/utils/PlayfairCipher';
import { useEffect, useEffectEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/Button';
import { CopyButton } from '@/components/CopyButton';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';
import { TextArea } from '@/components/TextArea';
import { Modal } from '@/components/Modal';
import { StepsResult } from '@/components/StepsResult';
import { HeaderButton } from '@/components/HeaderButton';

import { schemaDecryptPage } from '@/utils/validation';

import RectangleDecryptionIlustration from '@/public/images/rectangle-decryption-ilustration.jpg';
import SameRowDecryptionIlustration from '@/public/images/same-row-decryption-ilustration.jpg';
import SameColumnDecryptionIlustration from '@/public/images/same-column-decryption-ilustration.jpg';

type Schema = z.infer<typeof schemaDecryptPage>;

export default function DecryptPage() {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaDecryptPage),
        criteriaMode: 'all',
    });
    const { t } = useTranslation();

    const [matrix, setMatrix] = useState<string[][]>(() => (new PlayfairCipher('')).matrix);
    const [steps, setSteps] = useState<{
        input: string;
        output: string;
        inputPosition: number[][];
        outputPosition: number[][];
        rule: string;
    }[]>([]);
    const [current, setCurrent] = useState(-1);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

    const setInitialCipherKey = useEffectEvent(() => {
        const cipherKey = localStorage.getItem('cipherKey') || '';
        setValue("cipherKey", cipherKey);
    });

    useEffect(() => {
        setInitialCipherKey();
    }, []);

    const onSubmit = (data: Schema) => {
        const cipher = new PlayfairCipher(data.cipherKey);
        localStorage.setItem('cipherKey', data.cipherKey);

        setMatrix(cipher.matrix);

        const { result, steps } = cipher.process(data.cipherText, 'decryption');

        setValue('plainText', result);
        setSteps(steps);
        setCurrent(0);
    }

    const isHighlighted = (r: number, c: number) => {
        if (current < 0) return 'bg-slate-100 dark:bg-slate-900';
        const step = steps[current];
        let color = '';

        if (step.inputPosition.some(([rr, cc]) => rr === r && cc === c)) {
            color = 'bg-green-100 dark:bg-green-800 border border-green-500 dark:border-green-100';
        } else if (step.outputPosition.some(([rr, cc]) => rr === r && cc === c)) {
            color = 'bg-orange-100 dark:bg-orange-800 border border-orange-500 dark:border-orange-100'
        } else {
            color = 'bg-slate-100 dark:bg-slate-900';
        }
        return color;
    }

    return (
        <div className="w-full p-4 md:p-8">
            <header className="mb-8 flex justify-between items-center">
                <h1 className="text-4xl text-slate-800 dark:text-white font-bold">{t('Decryption')}</h1>

                <div className="flex gap-4">
                    <HeaderButton
                        setIsHelpModalOpen={setIsHelpModalOpen}
                    />

                    <Modal
                        isModalOpen={isHelpModalOpen}
                        setIsModalOpen={setIsHelpModalOpen}
                    >
                        <h2 className="mb-4 text-2xl font-semibold">{`${t('Flow')} ${t('Decryption')}`}</h2>
                        <ul className="list-decimal ml-6 text-lg md:text-xl">
                            <li>{t('Step 1 Decrypt')}</li>
                            <li>
                                {t('Step 2 Decrypt')}
                                <ol className="list-disc ml-6">
                                    <li>
                                        <b>{t('Rectangle')}</b>
                                        <div>
                                            <p>{t('Rectangle Decrypt Description')}</p>
                                            <Image
                                                src={RectangleDecryptionIlustration}
                                                alt={`${t('Rectangle')} ${t('Decryption')} ${t('Ilustration')}`}
                                                width={838}
                                                height={838}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <b>{t('Same Row')}</b>
                                        <div>
                                            <p>{t('Same Row Decrypt Description')}</p>
                                            <Image
                                                src={SameRowDecryptionIlustration}
                                                alt={`${t('Same Row')} ${t('Decryption')} ${t('Ilustration')}`}
                                                width={838}
                                                height={838}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <b>{t('Same Column')}</b>
                                        <div>
                                            <p>{t('Same Column Decrypt Description')}</p>
                                            <Image
                                                src={SameColumnDecryptionIlustration}
                                                alt={`${t('Same Column')} ${t('Decryption')} ${t('Ilustration')}`}
                                                width={838}
                                                height={838}
                                            />
                                        </div>
                                    </li>
                                </ol>
                            </li>
                        </ul>
                    </Modal>
                </div>
            </header>

            <main className="flex flex-col items-start md:flex-row gap-8">
                <section className="w-full md:w-2/5 p-4 bg-transparent border border-gray-500 rounded-lg shadow-2xl">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-1">
                            <Label name="cipher-key">
                                {t('Cipher Key')}
                            </Label>

                            <Input<Schema>
                                labelId="cipher-key"
                                type="text"
                                register={register}
                                registerId="cipherKey"
                                errors={errors}
                                placeholder="KEYWORD"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label name="cipher-text">
                                {t('Cipher Text')}
                            </Label>

                            <TextArea<Schema>
                                labelId="cipher-text"
                                register={register}
                                registerId="cipherText"
                                errors={errors}
                                placeholder="SECRET"
                                rows={5}
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <div className='flex items-center gap-4'>
                                <Label name='plain-text'>
                                    {t('Plain Text')}
                                </Label>
                                <CopyButton text={getValues('plainText')} />
                            </div>

                            <TextArea<Schema>
                                labelId="plain-text"
                                register={register}
                                registerId="plainText"
                                errors={errors}
                                rows={5}
                                readOnly
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                        >
                            {`${t('Start')} ${t('Decryption')}`}
                        </Button>

                        <Button
                            type="reset"
                            variant="secondary"
                            onClick={() => {
                                reset();
                                setCurrent(-1);
                                setMatrix(() => (new PlayfairCipher('')).matrix);
                                setSteps([]);
                            }}
                        >
                            Reset
                        </Button>
                    </form>
                </section>

                <section className="w-full md:w-3/5 p-4 bg-transparent border border-gray-500 rounded-lg shadow-2xl">
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
                            <StepsResult
                                steps={steps}
                                current={current}
                                setCurrent={setCurrent}
                            />
                        )
                    }
                </section>
            </main>
        </div >
    );
}
