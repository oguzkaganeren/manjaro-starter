import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import commandState from '../../../stores/CommandStore';
import commands from '../../../assets/Commands';
import { Kernel } from './Kernel';
import getKernelList, { runCommandGetRunningKernel, runCommandInstallKernel } from './KernelHelper';
import useToastCustom from '../../../hooks/useToastCustom';

export default function useKernelHook() {
  const [kernelList, setKernelList] = useState<Kernel[]>();
  const [currentKernel, setCurrentKernel] = useState('');
  const { callWarningToast } = useToastCustom();
  const { t } = useTranslation();
  const [isLoadingKernel, setIsLoadingKernel] = useState<Map<string, boolean>>(new Map());
  const [commandHistory, setCommandHistory] = useRecoilState(commandState);

  const getCurrentKernel = async () => {
    const temp = await runCommandGetRunningKernel();
    const spTemp = temp.stdout.split('.');
    const major = spTemp[0];
    const minor = spTemp[1];
    const isRT = temp.stdout.toLowerCase().indexOf('rt') > 0 ? '-rt' : '';
    const kernelPkName = `linux${major}${minor}${isRT}`;
    setCurrentKernel(kernelPkName);
  };
  const getKernels = async () => {
    const temp:Kernel[] = await getKernelList();
    setKernelList(temp);
  };
  useEffect(() => {
    getKernels();
    getCurrentKernel();
  }, []);
  const installKernel = async (kernelName:string) => {
    setIsLoadingKernel(new Map(isLoadingKernel?.set(kernelName, true)));
    setCommandHistory([
      // with a new array
      ...commandHistory, // that contains all the old items
      ([commands.getPamac.program, 'install', '--no-confirm', '--no-upgrade', kernelName] as Array<string>).map((text) => `${text}`).join(' '),
    ]);
    runCommandInstallKernel(kernelName).then((data) => {
      setIsLoadingKernel(new Map(isLoadingKernel?.set(kernelName, false)));
      const isSuccess = data.code === 0;
      const msg = isSuccess ? t('kernelSuccess') : t('kernelFail');
      callWarningToast(isSuccess, msg);

      getKernels();
    });
  };

  return {
    installKernel, kernelList, isLoadingKernel, currentKernel,
  };
}
