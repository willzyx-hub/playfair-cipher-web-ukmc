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

export const schemaDecryptPage = z.object({
    cipherKey: z.string()
        .min(1, { error: 'Cannot be empty' })
        .regex(/^[A-za-z]+$/, { error: 'Alphabet only' }),
    cipherText: z.string()
        .min(1, { error: 'Cannot be empty' })
        .regex(/^[A-Za-z\r\n\s]+$/, { error: 'Alphabet only' })
        .superRefine((val, ctx) => {
            if (val.length % 2 !== 0) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Text must have an even length',
                });
            }

            val = val.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
            for (let i = 0; i < val.length; i += 2) {
                const firstLetter = val[i];
                const secondLetter = val[i + 1];

                if (firstLetter === secondLetter) {
                    ctx.addIssue({
                        code: 'custom',
                        message: ctx.issues.length === 1 ? ' and cannot have same pair of 2 letter' : 'Text cannot have same pair of 2 letter',
                    })
                    return;
                }
            }
        }),
    plainText: z.string(),
})