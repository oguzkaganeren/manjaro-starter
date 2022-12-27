import {
  Button,
  chakra,
  useToast,
  Text,
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
import { useRecoilValue } from 'recoil';
import MirrorList from './MirrorList';
import { connectionState } from '../../stores/ConnectionStore';

const Mirrors: React.FC = (props) => {
  const { t } = useTranslation();
  const toast = useToast();
  const isOnline = useRecoilValue(connectionState);
  const [isProcessing, setIsProcessing] = useState(false);
  function showMsg(msg:string, isError:boolean) {
    const desc = (
      <Text maxH={200} overflow="scroll">
        {msg.replace(/\u001b\[.*?m/g, '').replaceAll('::', '')}
      </Text>
    );
    toast({
      title: '',
      description: desc,
      status: isError ? 'error' : 'success',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    });
  }
  const setFastestMirror = async () => {
    setIsProcessing(true);
    const cmd = new Command('sudo', ['pacman-mirrors', '--fasttrack', '5']);
    cmd.execute().then((response) => {
      setIsProcessing(false);
      error(response.stderr);
      info(response.stdout);
      if (response.stdout) {
        showMsg(response.stdout, false);
      } else {
        showMsg(response.stderr, true);
      }
    });
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
          <Button isDisabled={!isOnline} onClick={setFastestMirror} isLoading={isProcessing}>
            {t('setFastestMirrors')}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
export default Mirrors;
