import { useEffect, useState } from 'react';
import handleRemoteInfo from './RemotePackageHelper';

export default function useRemoteHook(name: string, branch: string) {
  const [version, setVersion] = useState('');
  useEffect(() => {
    handleRemoteInfo(name, branch).then((response) => {
      setVersion(response[0].version);
    });
  }, []);
  return { version };
}
