import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { info } from 'tauri-plugin-log-api';
import {
  TagLabel,
  chakra,
  TagLeftIcon,
  Tag,
  IconButton,
  Tooltip,
  Card,
  Divider,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiHardDrive } from 'react-icons/fi';
import { BsCheck } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import commandState from '../../stores/CommandStore';

const FsTrimServiceComponent = () => {
  const [isServiceActive, setIsServiceActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [commandHistory, setCommandHistory] = useRecoilState(commandState);
  const { t } = useTranslation();
  function isServiceRunning() {
    invoke('is_service_active', {
      service: 'fstrim.timer',
    }).then((response) => {
      info(`Is Fstrim Service running: ${response}`);
      setIsServiceActive(response as boolean);
    });
  }
  function serviceHandler(isStart:boolean) {
    invoke('run_shell_command', {
      command: isStart
        ? 'systemctl enable fstrim.timer'
        : 'systemctl disable fstrim.timer',
    }).then((response) => {
      info(
        isStart
          ? 'systemctl enable fstrim.timer'
          : 'systemctl disable fstrim.timer',
      );
      setCommandHistory([
        // with a new array
        ...commandHistory, // that contains all the old items
        isStart
          ? 'systemctl enable fstrim.timer'
          : 'systemctl disable fstrim.timer', // and one new item at the end
      ]);
      info(response as string);
      invoke('run_shell_command', {
        command: isStart
          ? 'systemctl start fstrim.timer'
          : 'systemctl stop fstrim.timer',
      }).then((responseSt) => {
        info(isStart
          ? 'systemctl start fstrim.timer'
          : 'systemctl stop fstrim.timer');
        setCommandHistory([
          // with a new array
          ...commandHistory, // that contains all the old items
          isStart
            ? 'systemctl start fstrim.timer'
            : 'systemctl stop fstrim.timer', // and one new item at the end
        ]);
        info(responseSt as string);
        isServiceRunning();
        setProcessing(false);
      });
    });
  }
  useEffect(() => {
    isServiceRunning();
  }, []);
  const setServiceStatus = () => {
    setProcessing(true);
    serviceHandler(!isServiceActive);
  };
  return (
    <Card minH="2xs" variant="filled">
      <CardBody>
        <chakra.p mt={2}>{t('fstrimDesc')}</chakra.p>
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
        <Tooltip
          label={
            isServiceActive
              ? t('fstrimTimerDisableStop')
              : t('fstrimTimerEnableStart')
          }
        >
          <Tag
            mr={2}
            mt={2}
            shadow="base"
            colorScheme={isServiceActive ? 'whatsapp' : 'gray'}
          >
            <TagLeftIcon boxSize="12px" as={FiHardDrive} />

            <TagLabel>{t('fstrimTimerService')}</TagLabel>

            <IconButton
              ml={5}
              mr={-2}
              aria-label={t('fstrimTimerEnableStart')}
              onClick={setServiceStatus}
              isLoading={processing}
              icon={isServiceActive ? <AiFillCloseCircle /> : <BsCheck />}
            />
          </Tag>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default FsTrimServiceComponent;
