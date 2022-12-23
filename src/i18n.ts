import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Danish from './translations/da.json';
import Deutsch from './translations/de.json';
import English from './translations/en.json';
import Polski from './translations/pl.json';
import Turkce from './translations/tr.json';

const resources = {
  Danish,
  Deutsch,
  English,
  Polski,
  Turkce,
};

export const availableLanguages = Object.keys(resources);

i18n.use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    defaultNS: 'common',
    fallbackLng: 'English',
  });
