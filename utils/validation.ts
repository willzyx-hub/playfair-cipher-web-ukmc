import * as z from "zod";
import "@/utils/i18next";
import i18next from "i18next";

function t(key: string) {
    return i18next.t(key);
}

export const schemaEncryptPage = z.object({
    cipherKey: z.string()
        .min(1, { error: t('Cannot be empty') })
        .regex(/^[A-za-z]+$/, { error: t('Alphabet only') }),
    plainText: z.string()
        .min(1, { error: t('Cannot be empty') })
        .regex(/^[A-Za-z\r\n\s]+$/, { error: t('Alphabet only') }),
    cipherText: z.string(),
})

export const schemaDecryptPage = z.object({
    cipherKey: z.string()
        .min(1, { error: t('Cannot be empty') })
        .regex(/^[A-za-z]+$/, { error: t('Alphabet only') }),
    cipherText: z.string()
        .min(1, { error: t('Cannot be empty') })
        .regex(/^[A-Za-z\r\n\s]+$/, { error: t('Alphabet only') })
        .superRefine((val, ctx) => {
            if (val.length % 2 !== 0) {
                ctx.addIssue({
                    code: 'custom',
                    message: t('Text even length'),
                });
            }

            val = val.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
            for (let i = 0; i < val.length; i += 2) {
                const firstLetter = val[i];
                const secondLetter = val[i + 1];

                if (firstLetter === secondLetter) {
                    ctx.addIssue({
                        code: 'custom',
                        message: ctx.issues.length === 1 ? t('and cannot have same pair of 2 letter') : t('Text cannot have same pair of 2 letter'),
                    })
                    return;
                }
            }
        }),
    plainText: z.string(),
})