import {
  Button,
  chakra,
  useToast,
  Card,
  CardBody,
  CardFooter,
  Divider,
  ButtonGroup,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/api/shell';
import { info, error } from 'tauri-plugin-log-api';
import { useRecoilValue, useRecoilState } from 'recoil';
import MirrorList from './MirrorList';
import { connectionState } from '../../stores/ConnectionStore';
import commandState from '../../stores/CommandStore';

const Mirrors: React.FC = (props) => {
  const { t } = useTranslation();
  const toast = useToast();
  const isOnline = useRecoilValue(connectionState);
  const [commandHistory, setCommandHistory] = useRecoilState(commandState);
  const [isProcessing, setIsProcessing] = useState(false);
  function showMsg(msg:string, isError:boolean) {
    toast({
      title: '',
      description: msg,
      status: isError ? 'error' : 'success',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    });
  }
  const setFastestMirror = async () => {
    setIsProcessing(true);
    setCommandHistory([
      // with a new array
      ...commandHistory, // that contains all the old items
      'pacman-mirrors --fasttrack 5', // and one new item at the end
    ]);
    const cmd = new Command('pkexec', ['pacman-mirrors', '--fasttrack', '5']);
    cmd.on('close', (data) => {
      info(
        `command finished with code ${data.code} and signal ${data.signal}`,
      );
      setIsProcessing(false);
      const isThereError = data.code !== 0;
      showMsg(
        isThereError ? t('failed') : t('success'),
        isThereError,
      );
    });
    cmd.on('error', (error) => {
      error(error);
    });
    cmd.stdout.on('data', (line) => {
      info(`command stdout: "${line}"`);
    });
    cmd.stderr.on('data', (line) => {
      error(`command stderr: "${line}"`);
    });
    const child = await cmd.spawn();

    info(`pid:${child.pid}`);
  };

  return (
    <Card minH="2xs" variant="filled">
      <CardBody>
        <chakra.p fontSize="sm">{t('mirrorDesc')}</chakra.p>
        <chakra.p fontSize="sm" mt={2}>
          {t('pacmanMirrors')}
        </chakra.p>
        <chakra.p fontSize="sm" mt={2}>
          {t('fastestMirrorWords')}
        </chakra.p>
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
        <ButtonGroup spacing="2">
          <MirrorList />
          <Button
            shadow="base"
            isDisabled={!isOnline || isProcessing}
            onClick={setFastestMirror}
            isLoading={isProcessing}
          >
            {t('setFastestMirrors')}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
export default Mirrors;
