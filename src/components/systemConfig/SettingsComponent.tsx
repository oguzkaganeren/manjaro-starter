import React from 'react';
import {
  SimpleGrid, Stat, Button, useColorModeValue,
} from '@chakra-ui/react';
import { Command } from '@tauri-apps/api/shell';
import { useTranslation } from 'react-i18next';
import usePackageStatus from '../../hooks/usePackageStatus';
import ManjaroSettingsModule from './ManjaroSettingsModule';
import GnomeLayoutManager from './GnomeLayoutMaganer';

const SettingsComponent = () => {
  const isVisibleMSM = usePackageStatus('manjaro-settings-manager');
  const isVisibleMCP = usePackageStatus('mcp-qt');
  const isVisibleGnomeLayout = usePackageStatus('gnome-layout-switcher');
  const { t } = useTranslation();
  const borderColor = useColorModeValue('gray.800', 'gray.500');
  const MCPModule = (
    <Stat
      px={{ base: 2, md: 4 }}
      py="5"
      shadow="xl"
      size="sm"
      border="1px solid"
      borderColor={borderColor}
      rounded="lg"
    >
      <Button
        width="100%"
        onClick={async () => {
          new Command('mcp').execute();
        }}
      >
        {t('moreSettings')}
      </Button>
    </Stat>
  );
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
      {isVisibleMSM && <ManjaroSettingsModule />}
      {isVisibleMCP && (MCPModule)}
      {isVisibleGnomeLayout && <GnomeLayoutManager />}
    </SimpleGrid>
  );
};

export default SettingsComponent;
