import { useState, useEffect } from 'react';
import { Command } from '@tauri-apps/api/shell';
import commands from '../assets/Commands';

async function getPackageInstalled(packageName:string) {
  const result = await new Command(commands.getPacman.program, [
    '-Q',
    packageName,
  ]).execute().then((response) => {
    if (response.stdout) {
      return true;
    }
    return false;
  });
  return result;
}

export default function usePackageStatus(packageName:string) {
  const [installed, setInstalled] = useState(false);
  useEffect(() => {
    async function setStatus() {
      setInstalled(await getPackageInstalled(packageName));
    }
    setStatus();
  });
  return installed;
}
