import Link from "next/link";

export default function Home() {
    return (
        <main className="h-screen flex flex-col justify-center items-center p-4 md:p-20">
            <div className="mb-12 text-center">
                <h1 className="mb-8 text-4xl md:text-6xl font-extrabold">Playfair Cipher</h1>
                <p className="text-gray-600 text-lg md:text-2xl">
                    Playfair Cipher adalah algoritma kriptografi klasik yang ditemukan oleh Charles Wheatstone pada 1854, yang mengenkripsi pesan menggunakan pasangan huruf (digram/bigram) dan matriks kunci
                </p>
            </div>

            <div className="flex gap-4">
                <Link
                    href={'/encrypt'}
                    className="px-4 py-2 bg-gray-800 text-white rounded-sm text-lg md:text-xl transition duration-300 hover:-translate-y-1 hover:opacity-75">
                    Encrypt
                </Link>
                <Link
                    href={'/decrypt'}
                    className="px-4 py-2 border border-gray-800 text-gray-800 rounded-sm text-lg md:text-xl transition duration-300 hover:-translate-y-1 hover:opacity-75">
                    Decrypt
                </Link>
            </div>
        </main>
    )
}