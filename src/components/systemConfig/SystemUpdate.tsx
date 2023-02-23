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
  CardHeader,
  Text,
  HStack,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/api/shell';
import { info, error } from 'tauri-plugin-log-api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { connectionState } from '../../stores/ConnectionStore';
import commandState from '../../stores/CommandStore';
import commands from '../../assets/Commands';
import useToastCustom from '../../hooks/useToastCustom';
import commandLogger from '../common/CommandHelper';

const SystemUpdate: React.FC = () => {
  const { t } = useTranslation();
  const [checkUpdateText, setCheckUpdateText] = useState('');
  const isOnline = useRecoilValue(connectionState);
  const { callWarningToast } = useToastCustom();
  const [commandHistory, setCommandHistory] = useRecoilState(commandState);
  const [isUpdating, setIsUpdating] = useState(false);
  const checkUpdates = async () => {
    const cmd = new Command(commands.getPamac.program, ['checkupdates']);
    const cmdResult = await cmd.execute();

    if (cmdResult.stdout) {
      const updateSp = cmdResult.stdout.split(':');
      const updateCount = updateSp[0];
      setCheckUpdateText(updateCount);
    }
  };

  const updateSystem = async () => {
    setIsUpdating(true);
    setCommandHistory([
      // with a new array
      ...commandHistory, // that contains all the old items
      'pamac update --no-confirm --no-aur --force-refresh', // and one new item at the end
    ]);
    const cmd = new Command(commands.getPamac.program, [
      'update',
      '--no-confirm',
      '--no-aur',
      '--force-refresh',
    ]);
    commandLogger(cmd);
    cmd.execute().then((result) => {
      const isSuccess = result.code === 0;
      callWarningToast(isSuccess);
      setIsUpdating(false);
    });
  };

  const openPamacUpdateGui = async () => {
    const cmd = new Command(commands.getPamacManager.program, ['--updates']);
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
          {// FIXME: use global loading-updating state
          }
          {/* <ConfirmPopComponent
            confirmationDesc="confirmDesc"
            handleClick={updateSystem}
            isButtonDisabled={!isOnline || isUpdating}
            commands={[
              (
                [
                  commands.getPamac.program,
                  'update',
                  '--no-aur',
                  '--no-confirm',
                  '--no-update',
                ] as Array<string>
              )
                .map((text) => `${text}`)
                .join(' '),
            ]}
          >
            <Button
              isLoading={isUpdating}
              isDisabled={!isOnline || isUpdating}
            >
              {t('updateWithCli')}
            </Button>
          </ConfirmPopComponent> */}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
export default SystemUpdate;
