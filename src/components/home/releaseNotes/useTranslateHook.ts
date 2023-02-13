import { useState } from 'react';
import { Translation } from './LanguageType';
import getTranslation from './TranslationHelper';

export default function useTranslateHook() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [translatedContent, setTranslatedContent] = useState('');
  const getTranslatedContent = async (text:string) => {
    const params = { target: selectedLanguage, text } as Translation;
    getTranslation(params).then((result) => {
      setTranslatedContent(result as unknown as string);
    });
  };

  return {
    selectedLanguage, setSelectedLanguage, translatedContent, getTranslatedContent,
  };
}
