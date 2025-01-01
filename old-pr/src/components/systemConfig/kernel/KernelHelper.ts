import { Command } from '@tauri-apps/plugin-shell';
import _ from 'lodash';
import commands from '../../../assets/Commands';
import commandLogger from '../../common/CommandHelper';
import { Kernel } from './Kernel';

const getKernelList = async () => {
  const cmd = Command.create(commands.getPacman.program, ['-Ss', '^linux[0-9][0-9]?([0-9])$|^linux[0-9][0-9]?([0-9])-rt$']);
  const kernelList = await cmd.execute();
  const kernels = [] as Kernel[];
  const splitKernels = kernelList.stdout.split('\n').filter((item) => item.indexOf('linux') > 0);
  await Promise.all(splitKernels.map(async (kernelInfo) => {
    const spKernelInfo = kernelInfo.split(' ');
    const name = spKernelInfo[0].split('/')[1];
    const remoteVersion = spKernelInfo[1];
    const isInstalled = spKernelInfo.length > 2;

    const kernel:Kernel = {
      id: _.uniqueId(), name, isInstalled, remoteVersion,
    };
    kernels.push(kernel);
  }));
  const sortedKernel = kernels.sort((a, b) => (a.remoteVersion < b.remoteVersion ? 1 : -1));
  return sortedKernel;
};

export const runCommandInstallKernel = async (kernelName:string) => {
  const cmd = Command.create(commands.getPamac.program, ['install', '--no-confirm', '--no-upgrade', kernelName]);
  commandLogger(cmd);
  return cmd.execute();
};

export const runCommandGetRunningKernel = async () => {
  const cmd = Command.create(commands.getRunningKernel.program, ['-r']);
  return cmd.execute();
};

export default getKernelList;
