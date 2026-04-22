'use client'

import { Dispatch, SetStateAction } from 'react';

type ModalProps = {
    title: string,
    isModalOpen: boolean,
    setIsModalOpen: Dispatch<SetStateAction<boolean>>,
    children: React.ReactNode
};

export function Modal({ title, isModalOpen, setIsModalOpen, children }: ModalProps) {
    return (
        <>
            <div
                className={`fixed inset-0 bg-black/50 p-4 lg:p-8 flex justify-center items-center ${isModalOpen ? 'block' : 'hidden'}`}
                onClick={() => setIsModalOpen(false)}
            >
            </div>

            <div className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl p-4 transition duration-500 ${isModalOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <div className={`p-2 bg-white dark:bg-slate-800 border border-gray-200 rounded-lg shadow-2xl transition duration-500 ${isModalOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                    <div className="mb-4 p-4 flex justify-between items-center">
                        <h2 className="text-slate-700 dark:text-white text-2xl font-semibold">{title}</h2>
                        <svg
                            onClick={() => setIsModalOpen(false)}
                            className="size-6 text-gray-500 cursor-pointer transition duration-500 hover:opacity-50 hover:scale-95" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                    </div>

                    <div
                        className="p-4 overflow-y-auto max-h-[80vh] [&::-webkit-scrollbar]:w-2 
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-white"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}