import { fetch } from '@tauri-apps/plugin-http';
import { RemotePackageResponseType } from './ResponseType';

const handleRemoteInfo = async (name: string, branch:string) => {
  const url = new URL('https://search.manjaro-sway.download/');

  url.searchParams.set('name', name);
  url.searchParams.set('branch', branch);

  const client = await fetch(url, {
    connectTimeout: 30,
    headers: {
      'User-Agent': 'Manjaro-Starter-Desktop 1.0 (+https://manjaro.org)',
    },
  });
  const response = await client.json();
  return response as RemotePackageResponseType;
};

export default handleRemoteInfo;
