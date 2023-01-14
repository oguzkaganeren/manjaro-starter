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
import { FiCheck, FiHardDrive } from 'react-icons/fi';
import { BsCheckAll } from 'react-icons/bs';

type Props = {}

const FsTrimServiceComponent = (props: Props) => {
  const [isServiceActive, setIsServiceActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { t } = useTranslation();
  function isServiceRunning() {
    invoke('is_service_active', {
      service: 'fstrim.timer',
    }).then((response) => {
      setIsServiceActive(response as boolean);
    });
  }
  useEffect(() => {
    isServiceRunning();
  }, []);
  const setServiceStatus = () => {
    setProcessing(true);
    invoke('run_shell_command', {
      command: 'systemctl enable fstrim.timer',
    }).then((response) => {
      info(response as string);
      invoke('run_shell_command', {
        command: 'systemctl start fstrim.timer',
      }).then((responseSt) => {
        info(responseSt as string);
        isServiceRunning();
        setProcessing(false);
      });
    });
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
        <Tag
          mr={2}
          mt={2}
          shadow="base"
          colorScheme={isServiceActive ? 'whatsapp' : 'gray'}
        >
          <TagLeftIcon boxSize="12px" as={FiHardDrive} />
          <TagLabel>{t('fstrimTimerService')}</TagLabel>
          <Tooltip label={t('fstrimTimerEnableStart')}>
            <IconButton
              ml={5}
              mr={-2}
              aria-label={t('fstrimTimerEnableStart')}
              onClick={setServiceStatus}
              disabled={isServiceActive}
              isLoading={processing}
              icon={!isServiceActive ? <FiCheck /> : <BsCheckAll />}
            />
          </Tooltip>
        </Tag>
      </CardFooter>
    </Card>
  );
};

export default FsTrimServiceComponent;
