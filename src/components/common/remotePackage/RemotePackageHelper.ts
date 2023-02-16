import { getClient, ResponseType } from '@tauri-apps/api/http';
import { RemotePackageResponseType } from './ResponseType';

const handleRemoteInfo = async (name: string, branch:string) => {
  const client = await getClient();
  const url = new URL('https://search.manjaro-sway.download/');
  url.searchParams.set('name', name);
  url.searchParams.set('branch', branch);

  const response = await client.get(url.toString(), {
    timeout: 30,
    // the expected response type
    responseType: ResponseType.JSON,
    headers: {
      'User-Agent': 'Manjaro-Starter-Desktop 1.0 (+https://manjaro.org)',
    },
  });
  return response.data as RemotePackageResponseType[];
};

export default handleRemoteInfo;
