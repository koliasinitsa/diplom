// src/services/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../assets/translation.en.json';
import translationRU from '../assets/translation.ru.json';
import translationBel from '../assets/translation.bel.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      ru: {
        translation: translationRU,
      },
      bel: {
        translation: translationBel,
      },
    },
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  export const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  
  export default i18n;
