import { getClient, ResponseType } from '@tauri-apps/api/http';
import { SearchManjaro } from './SearchManjaro';

const handleSearch = async (keyword: any) => {
  const client = await getClient();
  const url = new URL('https://manjaro.org/search/');
  url.searchParams.set('query', keyword);
  url.searchParams.set('format', 'json');
  url.searchParams.set('type', 'package');
  const response = await client.get(url.toString(), {
    timeout: 30,
    // the expected response type
    responseType: ResponseType.JSON,
  });
  return response.data as SearchManjaro;
};

export default handleSearch;
