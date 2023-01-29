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
import React from 'react';
import { Command } from '@tauri-apps/api/shell';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import KernelComponent from '../../components/systemConfig/KernelComponent';
import SystemInfoComponent from '../../components/systemConfig/SystemInfo';
import SystemUpdate from '../../components/systemConfig/SystemUpdate';
import Mirrors from '../../components/systemConfig/Mirrors';
import ManjaroSettingsModule from '../../components/systemConfig/ManjaroSettingsModule';
import GnomeLayoutManager from '../../components/systemConfig/GnomeLayoutMaganer';
import { liveState } from '../../stores/LiveStore';
import FsTrimServiceComponent from '../../components/systemConfig/FsTrimServiceComponent';
import { confTabState } from '../../stores/ConfTabStore';
import usePackageStatus from './usePackageStatus';

const ConfigurationScreen: React.FC = () => {
  const isVisibleGnomeLayout = usePackageStatus('gnome-layout-switcher');
  const [confTabIndex, setConfTabIndex] = useRecoilState(confTabState);
  const isVisibleMSM = usePackageStatus('manjaro-settings-manager');
  const isVisibleMCP = usePackageStatus('mcp-qt');
  const isLive = useRecoilValue(liveState);
  const { t } = useTranslation();
  const borderColor = useColorModeValue('gray.800', 'gray.500');

  return (
    <Tabs
      isLazy
      mt={16}
      px={5}
      display="grid"
      gridTemplateColumns="auto 1fr"
      orientation="vertical"
      variant="solid-rounded"
      colorScheme="whatsapp"
      w="100%"
      index={confTabIndex}
      onChange={(index) => setConfTabIndex(index)}
    >
      <TabList>
        <Tab>{t('system')}</Tab>
        <Tab>{t('mirrors')}</Tab>
        <Tab>{t('updates')}</Tab>
        {!isLive && <Tab>{t('kernels')}</Tab>}
        {!isLive && <Tab>{t('storage')}</Tab>}
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
        {!isLive && (
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
