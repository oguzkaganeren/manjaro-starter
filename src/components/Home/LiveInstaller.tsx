import React from 'react';
import {
  Box,
  Button,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/api/shell';
import { useRecoilValue } from 'recoil';
import { liveState } from '../../stores/LiveStore';

const LiveInstaller = () => {
  const { t } = useTranslation();
  const isLive = useRecoilValue(liveState);
  return (
    <Box>
      {isLive && (
        <Button
          px={3}
          py={1}
          fontWeight="700"
          rounded="md"
          variant="outline"
          colorScheme="whatsapp"
          onClick={async () => {
            new Command('calamares_polkit').execute();
          }}
        >
          {t('installManjaroLinux')}
        </Button>
      )}
    </Box>
  );
};

export default LiveInstaller;
