import {
  Container, Select,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { availableLanguages } from '../i18n';

interface LanguageProps {
  }
const LanguageComponent: React.FC<LanguageProps> = (props) => {
  const { i18n } = useTranslation();
  return (
    <Container textAlign="center">
      <Select variant="filled" defaultValue={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
        {availableLanguages.map((language) => (
          <option key={language}>{language}</option>
        ))}
      </Select>
    </Container>
  );
};
export default LanguageComponent;
