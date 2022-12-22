import {
  Box,
  Button,
  chakra,
  Badge,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/api/shell';
import { info, error } from 'tauri-plugin-log-api';

const SystemUpdate: React.FC = (props) => {
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
    <Box textAlign={{ lg: 'left' }}>
      <chakra.p mt={2}>{t('updateDesc')}</chakra.p>
      <Button
        size="md"
        height="48px"
        border="2px"
        m={5}
        borderColor="green.500"
        onClick={updateSystem}
      >
        {t('update')}
        <Badge ml={5}>{checkUpdate}</Badge>
      </Button>
    </Box>
  );
};
export default SystemUpdate;
