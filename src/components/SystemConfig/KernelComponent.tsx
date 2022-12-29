import {
  TagLabel,
  chakra,
  TagLeftIcon,
  Tag,
  IconButton,
  useToast,
  Tooltip,
  Text,
  Card,
  Divider,
  CardBody,
  CardFooter,
  Spinner,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FaLinux } from 'react-icons/fa';
import { RiAddLine } from 'react-icons/ri';
import { MdOutlineDownloadDone } from 'react-icons/md';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/api/shell';
import { info, error } from 'tauri-plugin-log-api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { connectionState } from '../../stores/ConnectionStore';
import { commandState } from '../../stores/CommandStore';

interface Kernel {
  id: string;
  name: string;
  isInstalled:boolean;
}

const KernelComponent: React.FC = () => {
  const [kernelSt, setKernelSt] = useState<Kernel[]>();
  const isOnline = useRecoilValue(connectionState);
  const [isLoadingKernel, setIsLoadingKernel] = useState<Map<string, boolean>>(new Map());
  const toast = useToast();
  const { t } = useTranslation();
  const [commandHistory, setCommandHistory] = useRecoilState(commandState);
  const getKernelList = async () => {
    const cmd = new Command('mhwd-kernel', ['-l']);
    const kernelList = await cmd.execute();
    const kernels = [] as Kernel[];
    const splitKernels = kernelList.stdout.split('*').filter((item) => item.indexOf('linux') > 0);
    await Promise.all(splitKernels.map(async (item) => {
      const kernelName = item.replace(/^\s+|\s+$/g, '').replaceAll('"', '');
      const installedCmd = new Command('version-control', ['-Q', kernelName]);
      const kernelInstalled = await installedCmd.execute();
      let isInstalled = false;
      if (kernelInstalled.stdout) {
        isInstalled = true;
      }
      const kernel:Kernel = { id: _.uniqueId(), name: kernelName, isInstalled };
      kernels.push(kernel);
    }));
    return kernels;
  };
  const updateKernelState = async () => {
    const kernelList:Kernel[] = await getKernelList();
    setKernelSt(kernelList);
  };
  function showMsg(msg:string, kernelName:string, isError:boolean) {
    const desc = (
      <Text maxH={200} overflow="scroll">
        {msg.replaceAll('"', '').replaceAll('\\u{a0}', ' ').split('\\n').map((item) => (
          <span>
            {item}
            <br />
          </span>
        ))}
      </Text>
    );
    toast({
      title: `${t('installing')} ${kernelName}`,
      description: desc,
      status: isError ? 'error' : 'success',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    });
  }
  const installKernel = async (kernelName:string) => {
    setIsLoadingKernel(new Map(isLoadingKernel?.set(kernelName, true)));
    const cmd = new Command('pamac', ['install', '--no-confirm', kernelName]);
    cmd.on('close', (data) => {
      info(
        `command finished with code ${data.code} and signal ${data.signal}`,
      );
      setIsLoadingKernel(new Map(isLoadingKernel?.set(kernelName, false)));
      const isThereError = data.code === 1;
      showMsg(
        isThereError ? t('installError') : t('installSuccess'),
        kernelName,
        isThereError,
      );
      updateKernelState();
    });
    cmd.on('error', (error) => {
      error(error);
      setCommandHistory((prevCommand) => `${prevCommand}\n${error}`);
    });
    cmd.stdout.on('data', (line) => {
      info(`command stdout: "${line}"`);
      setCommandHistory((prevCommand) => `${prevCommand}\n${line}`);
    });
    cmd.stderr.on('data', (line) => {
      error(`command stderr: "${line}"`);
      setCommandHistory((prevCommand) => `${prevCommand}\n${line}`);
    });
    const child = await cmd.spawn();

    info(`pid:${child.pid}`);
  };

  useEffect(() => {
    updateKernelState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card minH="2xs" variant="filled">
      <CardBody>
        <chakra.p mt={2}>{t('kernelDesc')}</chakra.p>
      </CardBody>
      <Divider />
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        {kernelSt === undefined ? (
          <Spinner />
        ) : (
          kernelSt.map((kernel) => (
            <Tag
              mr={2}
              mt={2}
              key={kernel.id}
              colorScheme={kernel.isInstalled ? 'whatsapp' : 'gray'}
            >
              <TagLeftIcon boxSize="12px" as={FaLinux} />
              <TagLabel>{kernel.name}</TagLabel>
              {!kernel.isInstalled ? (
                <Tooltip label="Install Kernel">
                  <IconButton
                    ml={5}
                    mr={-2}
                    disabled={!isOnline || isLoadingKernel?.get(kernel.name)}
                    aria-label="Install Kernel"
                    onClick={() => installKernel(kernel.name)}
                    isLoading={isLoadingKernel?.get(kernel.name) || false}
                    icon={<RiAddLine />}
                  />
                </Tooltip>
              ) : (
                <IconButton
                  ml={5}
                  mr={-2}
                  disabled
                  aria-label=""
                  icon={<MdOutlineDownloadDone />}
                />
              )}
            </Tag>
          ))
        )}
      </CardFooter>
    </Card>
  );
};
export default KernelComponent;
