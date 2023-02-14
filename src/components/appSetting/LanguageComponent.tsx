import React from 'react';
import { Form, Select } from 'react-daisyui';
import { useTranslation } from 'react-i18next';
import { availableLanguages } from '../../i18n';

const LanguageComponent: React.FC = () => {
  const { i18n, t } = useTranslation();
  return (
    <Form className="bg-base-200 p-4 mt-5 rounded-lg shadow">
      <Form.Label title={t('language') ?? ''}>
        <Select
          id="lan"
          size="sm"
          defaultValue={i18n.resolvedLanguage}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          {availableLanguages.map((language) => (
            <Select.Option key={language}>{language}</Select.Option>
          ))}
        </Select>
      </Form.Label>
    </Form>
  );
};
export default LanguageComponent;
