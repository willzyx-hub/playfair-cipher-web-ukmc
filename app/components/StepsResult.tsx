"use client"

import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import React, { SetStateAction } from "react";

type StepsResultProps = {
    steps: {
        input: string;
        output: string;
        inputPosition: number[][];
        outputPosition: number[][];
        rule: string;
    }[],
    current: number,
    setCurrent: React.Dispatch<SetStateAction<number>>,
};

export function StepsResult({ steps, current, setCurrent }: StepsResultProps) {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center">
            <p className="mb-4 text-2xl">
                <span className="font-mono font-semibold p-1 bg-green-100 border border-green-500 rounded-sm">{steps[current].input}</span>
                <span className="mx-4">➡️</span>
                <span className="font-mono font-semibold p-1 bg-orange-100 border border-orange-500 rounded-sm">{steps[current].output}</span>
            </p>

            <p className="mb-8 p-2 bg-slate-200 border border-slate-500 rounded-sm">"{t(steps[current].rule)}"</p>

            <div className="flex gap-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setCurrent(prev => prev - 1)}
                    disabled={current === 0}
                >
                    <div className="flex items-center gap-2">
                        <svg className="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 6v12m8-12v12l-8-6 8-6Z" />
                        </svg>
                        <span>{t('Before')}</span>
                    </div>
                </Button>

                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setCurrent(prev => prev + 1)}
                    disabled={current === steps.length - 1}
                >
                    <div className="flex items-center gap-2">
                        <svg className="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 6v12M8 6v12l8-6-8-6Z" />
                        </svg>
                        <span>{t('After')}</span>
                    </div>
                </Button>
            </div>
        </div>
    );
}