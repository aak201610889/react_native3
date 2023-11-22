import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';
import translationsEn from './src/i18n/locale/en.json';
import translationsAr from './src/i18n/locale/ar.json';
import store from './src/redux/store';
import {Provider} from 'react-redux';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {translation: translationsEn},
    ar: {translation: translationsAr},
  },
  lng: 'ar', // Set the default language
  fallbackLng: 'ar', // Fallback to English if the current language file is missing
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

// Wrap the App component inside a function
const RootComponent = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RootComponent);
