import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Danish from './translations/da.json';
import Francais from './translations/fr.json';
import German from './translations/de.json';
import English from './translations/en.json';
import Polish from './translations/pl.json';
import Russian from './translations/ru.json';
import Ukrainian from './translations/uk.json';

const resources = {
  Danish,
  Francais,
  German,
  English,
  Polish,
  Russian,
  Ukrainian,
};

const availableLanguages = Object.keys(resources);

i18n.use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    defaultNS: 'common',
    fallbackLng: 'English',
  });

export default availableLanguages;
