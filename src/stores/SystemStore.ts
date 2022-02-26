import {
  atom, selector,
} from 'recoil';
import { invoke } from '@tauri-apps/api/tauri';

export const getSystemInfo = selector({
  key: 'getSystemInfo',
  get: async ({ get }) => {
    const systemInfo:string = await invoke('run_shell_command_with_result', { command: 'inxi -b' });
    const result = systemInfo.replaceAll('"', '');
    console.log(result);
    return result;
  },
});

export const systemState = atom({
  key: 'systemState',
  default: getSystemInfo,
});
