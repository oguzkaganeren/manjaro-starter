import {
  Box,
  CircularProgress,
  Flex,
  Skeleton,
  TagLabel,
  useColorModeValue,
  chakra,
  TagLeftIcon,
  Tag,
  IconButton,
  useToast,
  Spacer,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FaLinux } from 'react-icons/fa';
import { RiAddLine } from 'react-icons/ri';
import { MdOutlineDownloadDone } from 'react-icons/md';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/api/shell';

interface Kernel {
  id: string;
  name: string;
  isInstalled:boolean;
}

const KernelComponent: React.FC = (props) => {
  const [kernelSt, setKernelSt] = useState<Kernel[]>();
  const toast = useToast();
  const { t } = useTranslation();
  const getKernelList = async () => {
    const cmd = new Command('mhwd-kernel', ['-l']);
    const kernelList = await cmd.execute();
    const kernels = [] as Kernel[];
    const installedCmd = new Command('mhwd-kernel', ['-li']);
    const kernelInstalled = await installedCmd.execute();
    const splitKernels = kernelList.stdout.split('*').filter((item) => item.indexOf('linux') > 0);
    const splitInstalledKernels = kernelInstalled.stdout.split('*').filter((item) => item.indexOf('linux') > 0);
    splitKernels.map((item) => {
      const temp = item.replaceAll(' ', '').replaceAll('\\n', '').replaceAll('\"', '');
      const isInstalled = splitInstalledKernels.some((item) => item.indexOf(temp) > 0);
      const kernel:Kernel = { id: _.uniqueId(), name: temp, isInstalled };
      kernels.push(kernel);
    });
    return kernels;
  };
  const setKernelList = async () => {
    const kernelList:Kernel[] = await getKernelList();
    setKernelSt(kernelList);
  };
  const installKernel = async (kernelName:string) => {
    const cmd = new Command('pamac', ['install', '--no-confirm', kernelName]);
    const cmdResult = await cmd.execute();
    if (cmdResult.stdout) {
      const desc = cmdResult.stdout.replaceAll('"', '').replaceAll('\\u{a0}', ' ').split('\\n').map((item, index) => (
        <span>
          {item}
          <br />
        </span>
      ));
      toast({
        title: `${t('installing')} ${kernelName}`,
        description: desc,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
    } else {
      const desc = cmdResult.stderr.replaceAll('"', '').replaceAll('\\u{a0}', ' ').split('\\n').map((item, index) => (
        <span>
          {item}
          <br />
        </span>
      ));
      toast({
        title: kernelName,
        description: desc,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
    setKernelList();
    return cmdResult;
  };

  useEffect(() => {
    setKernelList();
  });

  return (
    <Box mt={5} textAlign={{ lg: 'left' }}>

      <chakra.p
        mt={2}
        fontSize={{ base: '3xl', sm: '3xl' }}
        lineHeight="8"
        fontWeight="extrabold"
        letterSpacing="tight"
        color={useColorModeValue('white.900', 'white.100')}
      >
        Kernels
      </chakra.p>

      <chakra.p
        mt={4}
        maxW="2xl"
        fontSize="xl"
        color={useColorModeValue('gray.500', 'gray.400')}
      >
        Install kernel(s)
      </chakra.p>
      <Skeleton isLoaded={kernelSt !== null}>
        {kernelSt && kernelSt.map((kernel) => (
          <Tag size="md" ml={5} mt={5} key={kernel.id} colorScheme={kernel.isInstalled ? 'whatsapp' : 'gray'}>
            <TagLeftIcon boxSize="12px" as={FaLinux} />
            <TagLabel>{kernel.name}</TagLabel>
            {!kernel.isInstalled ? <IconButton ml={5} mr={-2} aria-label="Install Kernel" onClick={() => installKernel(kernel.name)} icon={<RiAddLine />} /> : <IconButton ml={5} mr={-2} disabled aria-label="" icon={<MdOutlineDownloadDone />} />}
          </Tag>
        ))}
      </Skeleton>

    </Box>
  );
};
export default KernelComponent;
