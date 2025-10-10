import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import translationEN from './locales/en.json';
import translationHI from './locales/hi.json';

// the translations
const resources = {
  en: {
    translation: translationEN.translation
  },
  hi: {
    translation: translationHI.translation
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en', // use English if a translation is missing
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;