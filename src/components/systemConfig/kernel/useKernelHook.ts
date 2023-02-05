import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import commandState from '../../../stores/CommandStore';
import commands from '../../../assets/Commands';
import { Kernel } from './Kernel';
import getKernelList, { runCommandInstallKernel } from './KernelHelper';

export default function useKernelHook() {
  const [kernelList, setKernelList] = useState<Kernel[]>();
  const toast = useToast();
  const { t } = useTranslation();
  const [isLoadingKernel, setIsLoadingKernel] = useState<Map<string, boolean>>(new Map());
  const [commandHistory, setCommandHistory] = useRecoilState(commandState);

  const getKernels = async () => {
    const temp:Kernel[] = await getKernelList();
    setKernelList(temp);
  };
  useEffect(() => {
    getKernels();
  }, []);
  const installKernel = async (kernelName:string) => {
    setIsLoadingKernel(new Map(isLoadingKernel?.set(kernelName, true)));
    setCommandHistory([
      // with a new array
      ...commandHistory, // that contains all the old items
      ([commands.getPamac.program, 'install', '--no-confirm', kernelName] as Array<string>).map((text) => `${text}`).join(' '),
    ]);
    runCommandInstallKernel(kernelName).then((data) => {
      setIsLoadingKernel(new Map(isLoadingKernel?.set(kernelName, false)));
      const isThereError = data.code === 1;
      toast({
        title: `${t('installing')} ${kernelName}`,
        description: isThereError ? t('failed') : t('success'),
        status: isThereError ? 'error' : 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
      getKernels();
    });
  };

  return { installKernel, kernelList, isLoadingKernel };
}
