import {
  atom, selector, selectorFamily, useRecoilValue,
} from 'recoil';
import { invoke } from '@tauri-apps/api/tauri';
import _ from 'lodash';

export interface Kernel {
  id: string;
  name: string;
  isInstalled:boolean;
}

export const getKernelList = selectorFamily({
  key: 'getKernelList',
  get: () => async () => {
    const result = await invoke('run_shell_command_with_result', { command: 'mhwd-kernel -l' });
    return result;
  },
});
export const getKernels = selector({
  key: 'getKernels',
  get: async ({ get }) => {
    const kernels = [] as Kernel[];
    const kernelLi:string = await invoke('run_shell_command_with_result', { command: 'mhwd-kernel -l' });
    const kernelInstalled:string = await invoke('run_shell_command_with_result', { command: 'mhwd-kernel -li' });
    const splitKernels = kernelLi.split('*').filter((item) => item.indexOf('linux') > 0);
    const splitInstalledKernels = kernelInstalled.split('*').filter((item) => item.indexOf('linux') > 0);
    splitKernels.map((item) => {
      const temp = item.replaceAll(' ', '').replaceAll('\\n', '').replaceAll('\"', '');
      const isInstalled = splitInstalledKernels.some((item) => item.indexOf(temp) > 0);
      const kernel:Kernel = { id: _.uniqueId(), name: temp, isInstalled };
      kernels.push(kernel);
    });
    return kernels;
  },
});

export const installKernel = selectorFamily({
  key: 'installKernel',
  get: (kernelName:string) => async () => {
    const result:string = await invoke('run_shell_command_with_result', { command: `mhwd-kernel -i ${kernelName}` });
    return result;
  },
});

export const kernelState = atom({
  key: 'kernelState',
  default: getKernels,
});
