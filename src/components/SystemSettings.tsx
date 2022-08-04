import {
  Box,
  Center,
  Button,
  useColorModeValue,
  chakra,
  ButtonGroup,
} from '@chakra-ui/react';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { GiProtectionGlasses } from 'react-icons/gi';
import { Command } from '@tauri-apps/api/shell';
import { useTranslation } from 'react-i18next';
import KernelComponent from './KernelComponent';
import SystemInfoComponent from './SystemInfo';

interface SystemSettingsProps {
}

const SystemSettings: React.FC<SystemSettingsProps> = (props) => {
  const [isVisibleGnomeLayout, setIsVisibleGnomeLayout] = useState(false);
  const [isVisibleMSM, setIsVisibleMSM] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    const resultOfGnome = new Command('installed-control', ['gnome-layout-switcher']).execute();
    resultOfGnome.then((response) => {
      if (response.stdout) {
        setIsVisibleGnomeLayout(true);
      }
    });
    const resultOfMSM = new Command('installed-control', ['manjaro-settings-manager']).execute();
    resultOfMSM.then((response) => {
      if (response.stdout) {
        setIsVisibleMSM(true);
      }
    });
  });
  return (
    <Box
      px={8}
      py={20}
      mx="auto"
      bg={useColorModeValue('white', 'gray.800')}
      shadow="xl"
    >
      <SystemInfoComponent />
      <Box textAlign={{ lg: 'center' }}>
        <chakra.p
          mt={2}
          fontSize={{ base: '3xl', sm: '4xl' }}
          lineHeight="8"
          fontWeight="extrabold"
          letterSpacing="tight"
          color={useColorModeValue('white.900', 'white.100')}
        >
          {t('settings')}
        </chakra.p>
        <chakra.p
          mt={4}
          maxW="2xl"
          fontSize="xl"
          mx={{ lg: 'auto' }}
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          {t('setupEnv')}
        </chakra.p>

      </Box>
      <KernelComponent />

      <Center>
        <ButtonGroup>
          {isVisibleMSM && (
          <Button
            mt={10}
            size="md"
            height="48px"
            border="2px"
            borderColor="green.500"
            onClick={async () => {
              const result = new Command('manjaro-settings-manager').execute();
              console.log(result);
            }}
            leftIcon={<GiProtectionGlasses />}
          >
            {t('moreSettings')}
          </Button>
          )}
          {isVisibleGnomeLayout && (
          <Button
            mt={10}
            size="md"
            height="48px"
            border="2px"
            onClick={async () => {
              const result = new Command('gnome-layout-switcher').execute();
              console.log(result);
            }}
          >
            {t('gnomeLayoutSwitcher')}
          </Button>
          )}
        </ButtonGroup>

      </Center>
    </Box>
  );
};
export default SystemSettings;
