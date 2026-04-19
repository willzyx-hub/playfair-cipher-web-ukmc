import * as z from "zod";

export const schemaEncryptPage = z.object({
    cipherKey: z.string()
        .min(1, { error: 'Cannot be empty' })
        .regex(/^[A-za-z]+$/, { error: 'Alphabet only' }),
    plainText: z.string()
        .min(1, { error: 'Cannot be empty' })
        .regex(/^[A-Za-z\r\n\s]+$/, { error: 'Alphabet only' }),
    cipherText: z.string(),
})