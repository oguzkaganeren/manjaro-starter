import {
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Command } from '@tauri-apps/api/shell';
import { useTranslation } from 'react-i18next';
import KernelComponent from './KernelComponent';
import SystemInfoComponent from './SystemInfo';
import SystemUpdate from './SystemUpdate';
import SystemFastestMirror from './SystemFastestMirror';
import ManjaroSettingsModule from './ManjaroSettingsModule';
import GnomeLayoutManager from './GnomeLayoutMaganer';

const SystemConfig: React.FC = () => {
  const [isVisibleGnomeLayout, setIsVisibleGnomeLayout] = useState(false);
  const [isVisibleMSM, setIsVisibleMSM] = useState(false);
  const [isVisibleMCP, setIsVisibleMCP] = useState(false);
  const { t } = useTranslation();
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
    <Tabs
      isLazy
      my={20}
      orientation="vertical"
      variant="solid-rounded"
      colorScheme="whatsapp"
    >
      <TabList>
        <Tab>{t('system')}</Tab>
        <Tab>{t('mirrors')}</Tab>
        <Tab>{t('updates')}</Tab>
        <Tab>{t('kernels')}</Tab>
        <Tab>{t('settings')}</Tab>
      </TabList>
      <TabPanels minW="730px" maxW="2xl">
        <TabPanel>
          <SystemInfoComponent />
        </TabPanel>
        <TabPanel>
          <SystemFastestMirror />
        </TabPanel>
        <TabPanel>
          <SystemUpdate />
        </TabPanel>
        <TabPanel>
          <KernelComponent />
        </TabPanel>
        <TabPanel>
          <Box mt={5} textAlign={{ lg: 'left' }}>
            {isVisibleMSM && <ManjaroSettingsModule />}
            {isVisibleMCP && (
              <Button
                mt={5}
                height="48px"
                border="2px"
                borderColor="green.500"
                onClick={async () => {
                  new Command('mcp').execute();
                }}
              >
                {t('moreSettings')}
              </Button>
            )}
            {isVisibleGnomeLayout && <GnomeLayoutManager />}
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default SystemConfig;
