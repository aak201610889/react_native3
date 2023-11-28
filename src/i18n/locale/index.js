import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationsEn from './en.json'; // Import your English translations
import translationsAr from './ar.json'; // Import your Arabic translations

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {translation: translationsEn},
    ar: {translation: translationsAr},
  },
  lng: 'ar', // Set the default language
  fallbackLng: 'ar', // Fallback to Arabic if the current language file is missing
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;
