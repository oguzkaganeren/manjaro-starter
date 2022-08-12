import {
  Box,
  Button,
  useColorModeValue,
  chakra,
  useToast,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/api/shell';

const InstallDrivers: React.FC = (props) => {
  const { t } = useTranslation();
  const setFastestMirror = async () => {
    const cmd = new Command('manjaro-settings-manager', ['-m', 'msm_mhwd']);
    cmd.execute();
  };

  return (
    <Box mt={5} textAlign={{ lg: 'left' }}>

      <chakra.p
        mt={2}
        fontSize={{ base: '3xl', sm: '3xl' }}
        lineHeight="8"
        fontWeight="extrabold"
        letterSpacing="tight"
        color={useColorModeValue('white.900', 'white.100')}
      >
        {t('installDrivers')}
      </chakra.p>

      <Button
        size="md"
        height="48px"
        width="200px"
        border="2px"
        mt={5}
        borderColor="green.500"
        onClick={setFastestMirror}
      >
        {t('installDrivers')}
      </Button>
    </Box>
  );
};
export default InstallDrivers;
