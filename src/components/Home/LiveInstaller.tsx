import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/api/shell';
import { exists } from '@tauri-apps/api/fs';
import { default as paths } from '../../assets/Paths.json';

const LiveInstaller = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const isLive = async () => {
      if (await exists(paths.live_path) as unknown as boolean) {
        const resultOfMCP = new Command('version-control', ['-Q', 'calamares']).execute();
        resultOfMCP.then((response) => {
          if (response.stdout) {
            setIsVisible(true);
          }
        });
      }
    };
    isLive();
  }, []);
  return (
    <Box>
      {isVisible && (
      <Button
        px={3}
        py={1}
        fontWeight="700"
        rounded="md"
        variant="outline"
        colorScheme="whatsapp"
        onClick={async () => {
          new Command('calamares').execute();
        }}
      >
        {t('installManjaroLinux')}
      </Button>
      )}
    </Box>

  );
};

export default LiveInstaller;
