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
import SystemUpdate from './SystemUpdate';
import SystemFastestMirror from './SystemFastestMirror';
import ManjaroSettingsModule from './ManjaroSettingsModule';

interface SystemConfigProps {
}

const SystemConfig: React.FC<SystemConfigProps> = (props) => {
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
      <SystemFastestMirror />
      <SystemUpdate />
      <ManjaroSettingsModule />
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
export default SystemConfig;
