import { Command } from '@tauri-apps/api/shell';
import _ from 'lodash';
import commands from '../../../assets/Commands';
import commandLogger from '../../common/CommandHelper';
import { Kernel } from './Kernel';

const getKernelList = async () => {
  const cmd = new Command(commands.getPacman.program, ['-Ssq', '^linux[0-9][0-9]?([0-9])$|^linux[0-9][0-9]?([0-9])-rt$']);
  commandLogger(cmd);
  const kernelList = await cmd.execute();
  const kernels = [] as Kernel[];
  const splitKernels = kernelList.stdout.split('\n');
  await Promise.all(splitKernels.map(async (name) => {
    const installedCmd = new Command(commands.getPacman.program, ['-Qqs', name]);
    const kernelInstalled = await installedCmd.execute();
    const isInstalled = !!kernelInstalled.stdout;

    const kernel:Kernel = { id: _.uniqueId(), name, isInstalled };
    kernels.push(kernel);
  }));
  return kernels;
};

export const runCommandInstallKernel = async (kernelName:string) => {
  const cmd = new Command(commands.getPamac.program, ['install', '--no-confirm', kernelName]);
  commandLogger(cmd);
  return cmd.execute();
};

export default getKernelList;
