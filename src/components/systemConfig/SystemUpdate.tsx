import {
  Button,
  chakra,
  Badge,
  Card,
  CardBody,
  CardFooter,
  Divider,
  ButtonGroup,
  Spinner,
  Tooltip,
  useToast,
  CardHeader,
  Text,
  HStack,
} from '@chakra-ui/react';
import React, { useState, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/api/shell';
import { info, error } from 'tauri-plugin-log-api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { connectionState } from '../../stores/ConnectionStore';
import commandState from '../../stores/CommandStore';

const SystemUpdate: React.FC = () => {
  const { t } = useTranslation();
  const [checkUpdateText, setCheckUpdateText] = useState('');
  const isOnline = useRecoilValue(connectionState);
  const toast = useToast();
  const [commandHistory, setCommandHistory] = useRecoilState(commandState);
  const [isUpdating, setIsUpdating] = useState(false);
  const checkUpdates = async () => {
    const cmd = new Command('pamac', ['checkupdates']);
    const cmdResult = await cmd.execute();

    if (cmdResult.stdout) {
      const updateSp = cmdResult.stdout.split(':');
      const updateCount = updateSp[0];
      setCheckUpdateText(updateCount);
    }
  };
  function showMsg(msg: string | ReactNode, isError: boolean) {
    toast({
      title: '',
      description: msg,
      status: isError ? 'error' : 'success',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    });
  }

  const updateSystem = async () => {
    setIsUpdating(true);
    setCommandHistory([
      // with a new array
      ...commandHistory, // that contains all the old items
      'pamac update --no-confirm --force-refresh', // and one new item at the end
    ]);
    const cmd = new Command('pamac', [
      'update',
      '--no-confirm',
      '--force-refresh',
    ]);
    cmd.on('close', (data) => {
      info(`command finished with code ${data.code} and signal ${data.signal}`);
      setIsUpdating(false);
      const isThereError = data.code !== 0;
      showMsg(isThereError ? t('failed') : t('success'), isThereError);
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

  const openPamacUpdateGui = async () => {
    const cmd = new Command('pamac-manager', ['--updates']);
    const cmdResult = await cmd.execute();
    error(cmdResult.stderr);
    info(cmdResult.stdout);
  };
  useEffect(() => {
    checkUpdates();
  });

  return (
    <Card minH="2xs" variant="filled">
      <CardHeader>
        {checkUpdateText === '' ? (
          <Badge size="xs" p="1" ml="1" colorScheme="yellow">
            <HStack>
              <Spinner ml="1" size="xs" />
              <Text>{t('checkingForUpdates')}</Text>
            </HStack>
          </Badge>
        ) : (
          <Badge
            size="xs"
            p="1"
            ml="1"
            colorScheme={
              checkUpdateText.indexOf('up to date') > 0 ? 'green' : 'orange'
            }
          >
            {checkUpdateText}
          </Badge>
        )}
      </CardHeader>
      <CardBody mt={-15}>
        <chakra.p>{t('updateDesc')}</chakra.p>
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
          <Tooltip label={t('openPamacTooltip')}>
            <Button
              shadow="base"
              isDisabled={!isOnline}
              onClick={openPamacUpdateGui}
            >
              {t('updateWithGui')}
            </Button>
          </Tooltip>
          {/* <Tooltip label={t('updateTooltip')}>
            <Button
              isLoading={isUpdating}
              isDisabled={!isOnline || isUpdating}
              onClick={updateSystem}
            >
              {t('updateWithCli')}
            </Button>
      </Tooltip> */}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
export default SystemUpdate;
