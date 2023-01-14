import {
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Stat,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Command } from '@tauri-apps/api/shell';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { invoke } from '@tauri-apps/api/tauri';
import { info } from 'tauri-plugin-log-api';
import KernelComponent from '../components/systemconfig/KernelComponent';
import SystemInfoComponent from '../components/systemconfig/SystemInfo';
import SystemUpdate from '../components/systemconfig/SystemUpdate';
import Mirrors from '../components/systemconfig/Mirrors';
import ManjaroSettingsModule from '../components/systemconfig/ManjaroSettingsModule';
import GnomeLayoutManager from '../components/systemconfig/GnomeLayoutMaganer';
import { liveState } from '../stores/LiveStore';
import FsTrimServiceComponent from '../components/systemconfig/FsTrimServiceComponent';

const ConfigurationScreen: React.FC = () => {
  const [isVisibleGnomeLayout, setIsVisibleGnomeLayout] = useState(false);
  const [isVisibleMSM, setIsVisibleMSM] = useState(false);
  const [isVisibleMCP, setIsVisibleMCP] = useState(false);
  const [isHDD, setIsHDD] = useState(true);
  const isLive = useRecoilValue(liveState);
  const { t } = useTranslation();
  const borderColor = useColorModeValue('gray.800', 'gray.500');
  useEffect(() => {
    const resultOfGnome = new Command('version-control', [
      '-Q',
      'gnome-layout-switcher',
    ]).execute();
    resultOfGnome.then((response) => {
      if (response.stdout) {
        setIsVisibleGnomeLayout(true);
      }
    });
    const resultOfMCP = new Command('version-control', [
      '-Q',
      'mcp-qt',
    ]).execute();
    resultOfMCP.then((response) => {
      if (response.stdout) {
        setIsVisibleMCP(true);
      }
    });
    const resultOfMSM = new Command('version-control', [
      '-Q',
      'manjaro-settings-manager',
    ]).execute();
    resultOfMSM.then((response) => {
      if (response.stdout) {
        setIsVisibleMSM(true);
      }
    });

    invoke('run_shell_command_with_result', {
      command: "lsblk -oMOUNTPOINT,PKNAME -P | grep 'MOUNTPOINT=\"/\"'",
    }).then((response) => {
      if (response) {
        const variables = (response as string).split(' ');
        const mountNameSpec = variables[1].split('=')[1];
        const mountName = mountNameSpec.replace(
          /(\r\n|\n|\s|\r|\\n|\\"|")/gm,
          '',
        );
        info(mountName);
        if (mountName) {
          invoke('run_shell_command_with_result', {
            command: `cat /sys/block/${mountName}/queue/rotational`,
          }).then((catResponse) => {
            const isHdd = (catResponse as string).replace(
              /(\r\n|\n|\s|\r|\\n|\\"|")/gm,
              '',
            );
            setIsHDD(isHdd === '1');
          });
        }
      }
    });
  });
  return (
    <Tabs
      isLazy
      my={20}
      px={5}
      display="grid"
      gridTemplateColumns="auto 1fr"
      orientation="vertical"
      variant="solid-rounded"
      colorScheme="whatsapp"
      w="100%"
    >
      <TabList>
        <Tab>{t('system')}</Tab>
        <Tab>{t('mirrors')}</Tab>
        <Tab>{t('updates')}</Tab>
        {!isLive && <Tab>{t('kernels')}</Tab>}
        {!isHDD && <Tab>{t('storage')}</Tab>}
        <Tab>{t('settings')}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SystemInfoComponent />
        </TabPanel>
        <TabPanel>
          <Mirrors />
        </TabPanel>
        <TabPanel>
          <SystemUpdate />
        </TabPanel>
        {!isLive && (
          <TabPanel>
            <KernelComponent />
          </TabPanel>
        )}
        {!isHDD && (
        <TabPanel>
          <FsTrimServiceComponent />
        </TabPanel>
        )}
        <TabPanel>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
            {isVisibleMSM && <ManjaroSettingsModule />}
            {isVisibleMCP && (
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
            )}
            {isVisibleGnomeLayout && <GnomeLayoutManager />}
          </SimpleGrid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default ConfigurationScreen;
