import { getClient, ResponseType } from '@tauri-apps/api/http';
import { SearchManjaro } from './SearchManjaro';

const handleSearch = async (keyword: any) => {
  const client = await getClient();
  const response = await client.get(`https://manjaro.org/search/?query=${keyword}&format=json&type=package`, {
    timeout: 30,
    // the expected response type
    responseType: ResponseType.JSON,
  });
  return response.data as SearchManjaro;
};

export default handleSearch;
