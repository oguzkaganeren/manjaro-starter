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
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/api/shell';
import { info, error } from 'tauri-plugin-log-api';

const SystemUpdate: React.FC = () => {
  const { t } = useTranslation();
  const [checkUpdate, setCheckUpdate] = useState('');
  const checkUpdates = async () => {
    const cmd = new Command('pamac', ['checkupdates']);
    const cmdResult = await cmd.execute();

    if (cmdResult.stdout) {
      const updateSp = cmdResult.stdout.split(':');
      const updateCount = updateSp[0];
      setCheckUpdate(updateCount);
    }
  };
  const updateSystem = async () => {
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
      <CardBody>
        <chakra.p mt={2}>{t('updateDesc')}</chakra.p>
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
          <Button onClick={updateSystem}>
            {t('update')}
            {' '}
            {checkUpdate === '' ? (
              <Spinner ml="1" size="xs" />
            ) : (
              <Badge ml="1" colorScheme="orange">
                {checkUpdate}
              </Badge>
            )}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
export default SystemUpdate;
