import {
  Select,
  HStack,
  Spacer,
  FormControl,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { availableLanguages } from '../../i18n';

const LanguageComponent: React.FC = () => {
  const { i18n, t } = useTranslation();
  const bColor = useColorModeValue('gray.800', 'gray.500');
  return (
    <FormControl
      px={{ base: 2, md: 4 }}
      py="5"
      shadow="xl"
      border="1px solid"
      borderColor={bColor}
      rounded="lg"
    >
      <HStack>
        <span>{t('language')}</span>
        <Spacer />
        <Select
          id="lan"
          variant="filled"
          defaultValue={i18n.resolvedLanguage}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          {availableLanguages.map((language) => (
            <option key={language}>{language}</option>
          ))}
        </Select>
      </HStack>
    </FormControl>
  );
};
export default LanguageComponent;
