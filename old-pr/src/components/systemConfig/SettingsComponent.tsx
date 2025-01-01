import React from 'react';
import {
  SimpleGrid, Button, Card,
} from '@chakra-ui/react';
import { Command } from '@tauri-apps/plugin-shell';
import { useTranslation } from 'react-i18next';
import usePackageStatus from '../../hooks/usePackageStatus';
import ManjaroSettingsModule from './ManjaroSettingsModule';
import GnomeLayoutManager from './GnomeLayoutMaganer';
import commands from '../../assets/Commands';

const SettingsComponent = () => {
  const isVisibleMSM = usePackageStatus('manjaro-settings-manager');
  const isVisibleMCP = usePackageStatus('mcp-qt');
  const isVisibleGnomeLayout = usePackageStatus('gnome-layout-switcher');
  const { t } = useTranslation();
  const MCPModule = (
    <Card
      size="sm"
    >
      <Button
        width="100%"
        height="20"
        variant="ghost"
        onClick={async () => {
          Command.create(commands.getMCP.program).execute();
        }}
      >
        {t('moreSettings')}
      </Button>
    </Card>
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
