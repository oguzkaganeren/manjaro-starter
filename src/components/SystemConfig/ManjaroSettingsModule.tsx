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

const ManjaroSettingsModule: React.FC = (props) => {
  const { t } = useTranslation();
  const openManjaroSettingsManager = async (moduleName:string) => {
    const cmd = new Command('manjaro-settings-manager', ['-m', `msm_${moduleName}`]);
    cmd.execute();
  };

  return (
    <>
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
          onClick={() => { openManjaroSettingsManager('mhwd'); }}
        >
          {t('installDrivers')}
        </Button>
      </Box>
      <Box mt={5} textAlign={{ lg: 'left' }}>
        <chakra.p
          mt={2}
          fontSize={{ base: '3xl', sm: '3xl' }}
          lineHeight="8"
          fontWeight="extrabold"
          letterSpacing="tight"
          color={useColorModeValue('white.900', 'white.100')}
        >
          {t('setDateTime')}
        </chakra.p>

        <Button
          size="md"
          height="48px"
          width="200px"
          border="2px"
          mt={5}
          borderColor="green.500"
          onClick={() => { openManjaroSettingsManager('timedate'); }}
        >
          {t('setDateTime')}
        </Button>
      </Box>
      <Box mt={5} textAlign={{ lg: 'left' }}>
        <chakra.p
          mt={2}
          fontSize={{ base: '3xl', sm: '3xl' }}
          lineHeight="8"
          fontWeight="extrabold"
          letterSpacing="tight"
          color={useColorModeValue('white.900', 'white.100')}
        >
          {t('installLanguagePackages')}
        </chakra.p>

        <Button
          size="md"
          height="48px"
          width="200px"
          border="2px"
          mt={5}
          borderColor="green.500"
          onClick={() => { openManjaroSettingsManager('language_packages'); }}
        >
          {t('languagePackages')}
        </Button>
      </Box>
    </>

  );
};
export default ManjaroSettingsModule;
