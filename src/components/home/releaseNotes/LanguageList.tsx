import React, { useEffect, useState } from 'react';
import { Button, Box } from '@chakra-ui/react';

import { getLanguages } from './TranslationHelper';
import { Language } from './LanguageType';
import useTranslateHook from './useTranslateHook';

const LanguageList = () => {
  const [languages, setLanguages] = useState<Array<Language>>();
  const { selectedLanguage, setSelectedLanguage } = useTranslateHook();
  useEffect(() => {
    getLanguages().then((response: Array<Language>) => {
      setLanguages(response);
    });
  }, []);
  return (
    <Box>
      {languages
        && languages.map((lang) => (
          <Button
            size="xs"
            mr={2}
            variant="outline"
            isActive={lang.code === selectedLanguage}
            onClick={async () => {
              setSelectedLanguage(lang.code);
            }}
          >
            {lang.name}
          </Button>
        ))}
    </Box>
  );
};

export default LanguageList;
