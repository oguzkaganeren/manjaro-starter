import { Body, getClient } from '@tauri-apps/api/http';
import { Language, Translation } from './LanguageType';

const getTranslation = async (props:Translation) => {
  const { text, target } = props;
  const client = await getClient();
  const bd = Body.json({
    q: text,
    source: 'en',
    target,
  });
  const res = await client.post('https://translate.argosopentech.com/translate', bd);
  return res;
};
export const getLanguages = async () => {
  const client = await getClient();
  const res = await client.get('https://translate.argosopentech.com/languages');
  return res.data as Array<Language>;
};
export default getTranslation;
