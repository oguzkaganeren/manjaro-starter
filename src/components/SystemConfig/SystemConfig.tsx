import {
  Box,
  Center,
  Button,
  useColorModeValue,
  ButtonGroup,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { GiProtectionGlasses } from 'react-icons/gi';
import { Command } from '@tauri-apps/api/shell';
import { useTranslation } from 'react-i18next';
import KernelComponent from './KernelComponent';
import SystemInfoComponent from './SystemInfo';
import SystemUpdate from './SystemUpdate';
import SystemFastestMirror from './SystemFastestMirror';
import ManjaroSettingsModule from './ManjaroSettingsModule';
import GnomeLayoutManager from './GnomeLayoutMaganer';

interface SystemConfigProps {
}

const SystemConfig: React.FC<SystemConfigProps> = (props) => {
  const [isVisibleGnomeLayout, setIsVisibleGnomeLayout] = useState(false);
  const [isVisibleMSM, setIsVisibleMSM] = useState(false);
  const [isVisibleMCP, setIsVisibleMCP] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const resultOfGnome = new Command('version-control', ['-Q', 'gnome-layout-switcher']).execute();
    resultOfGnome.then((response) => {
      if (response.stdout) {
        setIsVisibleGnomeLayout(true);
      }
    });
    const resultOfMCP = new Command('version-control', ['-Q', 'mcp-qt']).execute();
    resultOfMCP.then((response) => {
      if (response.stdout) {
        setIsVisibleMCP(true);
      }
    });
    const resultOfMSM = new Command('version-control', ['-Q', 'manjaro-settings-manager']).execute();
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
      {isVisibleMSM && (<ManjaroSettingsModule />)}
      <KernelComponent />

      <Center>
        <ButtonGroup>
          {isVisibleMCP && (
          <Button
            mt={10}
            size="md"
            height="48px"
            border="2px"
            borderColor="green.500"
            onClick={async () => {
              new Command('mcp').execute();
            }}
            leftIcon={<GiProtectionGlasses />}
          >
            {t('moreSettings')}
          </Button>
          )}
          {isVisibleMSM && (
          <Button
            mt={10}
            size="md"
            height="48px"
            border="2px"
            borderColor="green.500"
            onClick={async () => {
              new Command('manjaro-settings-manager').execute();
            }}
            leftIcon={<GiProtectionGlasses />}
          >
            {t('moreSettings')}
          </Button>
          )}
          {isVisibleGnomeLayout && (
          <GnomeLayoutManager />
          )}
        </ButtonGroup>

      </Center>
    </Box>
  );
};
export default SystemConfig;
