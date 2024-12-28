import { fetch } from '@tauri-apps/plugin-http';
import { SearchManjaro } from './SearchManjaro';

const handleSearch = async (keyword: string, isForPackage:boolean) => {
  const url = new URL('https://manjaro.org/search/');
  url.searchParams.set('query', keyword);
  url.searchParams.set('format', 'json');
  url.searchParams.set('type', isForPackage ? 'package' : 'wiki forum page');
  const client = await fetch(url, {
    connectTimeout: 30,
    headers: {
      'User-Agent': 'Manjaro-Starter-Desktop 1.0 (+https://manjaro.org)',
    },
  });
  const response = await client.json();

  return response as SearchManjaro;
};

export default handleSearch;
