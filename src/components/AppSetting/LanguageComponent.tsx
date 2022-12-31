import { Select, HStack, Spacer } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import locale from 'locale-codes';
import { availableLanguages } from '../../i18n';

const LanguageComponent: React.FC = () => {
  const { i18n, t } = useTranslation();
  return (
    <HStack>
      <span>{t('language')}</span>
      <Spacer />
      <Select
        id="lan"
        variant="filled"
        defaultValue={locale.getByTag(i18n.language).name}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        {availableLanguages.map((language) => (
          <option key={language}>{language}</option>
        ))}
      </Select>
    </HStack>
  );
};
export default LanguageComponent;
