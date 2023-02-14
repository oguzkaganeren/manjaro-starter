import React from 'react';
import {
  Form, Select, useTheme,
} from 'react-daisyui';
import { useTranslation } from 'react-i18next';

const ThemeSelectComponent: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const DEFAULT_THEMES = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
  ];
  return (
    <Form className="bg-base-200 p-4 mt-5 rounded-lg shadow">
      <Form.Label title={t('theme') ?? ''}>
        <Select
          id="lan"
          size="sm"
          defaultValue={i18n.resolvedLanguage}
          onChange={(e) => {
            document
              .getElementsByTagName('html')[0]
              .setAttribute('data-theme', e.target.value);
            setTheme(e.target.value);
          }}
        >
          {DEFAULT_THEMES.map((tm) => (
            <Select.Option key={tm}>{tm}</Select.Option>
          ))}
        </Select>
      </Form.Label>
    </Form>
  );
};
export default ThemeSelectComponent;
