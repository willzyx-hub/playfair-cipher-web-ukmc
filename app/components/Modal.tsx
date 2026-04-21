'use client'

import { Dispatch, SetStateAction } from 'react';

type ModalProps = {
    children: React.ReactNode
    isModalOpen: boolean,
    setIsModalOpen: Dispatch<SetStateAction<boolean>>,
};

export function Modal({ children, isModalOpen, setIsModalOpen }: ModalProps) {
    return (
        <>
            <div
                className={`fixed inset-0 bg-black/50 p-4 lg:p-8 flex justify-center items-center ${isModalOpen ? 'block' : 'hidden'}`}
                onClick={() => setIsModalOpen(false)}
            >
            </div>

            <div className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl p-4 transition duration-500 ${isModalOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <div className={`p-4 bg-white border border-gray-200 rounded-2xl shadow-2xl transition duration-500 ${isModalOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                    <svg
                        onClick={() => setIsModalOpen(false)}
                        className="ml-auto mb-4 size-6 text-gray-500 cursor-pointer transition duration-500 hover:opacity-50 hover:scale-95" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>

                    <div className="overflow-y-auto max-h-[80vh]">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}