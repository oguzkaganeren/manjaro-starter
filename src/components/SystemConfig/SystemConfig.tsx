import {
  Center,
  Button,
  ButtonGroup,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
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

  const colors = useColorModeValue(
    ['red.50', 'teal.50', 'blue.50'],
    ['red.900', 'teal.900', 'blue.900'],
  );
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];
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

    <Tabs
      px={8}
      py={20}
      orientation="vertical"
      variant="solid-rounded"
      colorScheme="whatsapp"
     // onChange={(index) => setTabIndex(index)}
      // bg={bg}
    >
      <TabList>
        <Tab>
          {t('systemDetails')}
        </Tab>
        <Tab>Mirrors</Tab>
        <Tab>{t('updates')}</Tab>
        <Tab>Settings</Tab>
        <Tab>Kernels</Tab>
        <Tab>More</Tab>
      </TabList>
      <TabPanels>
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
          {isVisibleMSM && (<ManjaroSettingsModule />)}
        </TabPanel>
        <TabPanel>
          <KernelComponent />
        </TabPanel>
        <TabPanel>
          <Center minW="730px">
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
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default SystemConfig;
