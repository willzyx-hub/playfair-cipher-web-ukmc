import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "@/locales/en.json";
import idTranslations from "@/locales/id.json";

const resources = {
    en: {
        translation: enTranslations,
    },
    id: {
        translation: idTranslations,
    }
}

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: 'id',
        interpolation: {
            escapeValue: false,
        }
    });

export default i18next;