import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  FiAirplay, FiDownload, FiGitMerge, FiHardDrive, FiLayers, FiSettings,
} from 'react-icons/fi';
import KernelComponent from '../components/systemConfig/kernel/KernelComponent';
import SystemInfoComponent from '../components/systemConfig/SystemInfo';
import SystemUpdate from '../components/systemConfig/SystemUpdate';
import Mirrors from '../components/systemConfig/mirrors/index';
import { liveState } from '../stores/LiveStore';
import FsTrimServiceComponent from '../components/systemConfig/FsTrimServiceComponent';
import { confTabState } from '../stores/ConfTabStore';
import SettingsComponent from '../components/systemConfig/SettingsComponent';

const TabListEx = () => {
  const isLive = useRecoilValue(liveState);
  const { t } = useTranslation();
  const color = useColorModeValue('gray.600', 'gray.300');
  return (
    <TabList>
      <Tab>
        <Icon
          mr="2"
          boxSize="4"
          _groupHover={{
            color,
          }}
          as={FiAirplay}
        />
        {t('system')}
      </Tab>
      <Tab>
        <Icon
          mr="2"
          boxSize="4"
          _groupHover={{
            color,
          }}
          as={FiGitMerge}
        />
        {t('mirrors')}

      </Tab>
      <Tab>
        <Icon
          mr="2"
          boxSize="4"
          _groupHover={{
            color,
          }}
          as={FiDownload}
        />
        {t('updates')}

      </Tab>
      {!isLive && (
      <Tab>
        <Icon
          mr="2"
          boxSize="4"
          _groupHover={{
            color,
          }}
          as={FiLayers}
        />
        {t('kernels')}
      </Tab>
      )}
      {!isLive && (
      <Tab>
        <Icon
          mr="2"
          boxSize="4"
          _groupHover={{
            color,
          }}
          as={FiHardDrive}
        />
        {t('storage')}
      </Tab>
      )}
      <Tab>
        <Icon
          mr="2"
          boxSize="4"
          _groupHover={{
            color,
          }}
          as={FiSettings}
        />
        {t('settings')}

      </Tab>
    </TabList>
  );
};

const TabPanelEx = () => {
  const isLive = useRecoilValue(liveState);
  return (
    <TabPanels overflowY="auto" maxHeight="calc(80vh)">
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
        <SettingsComponent />
      </TabPanel>
    </TabPanels>
  );
};

const ConfigurationScreen: React.FC = () => {
  const [confTabIndex, setConfTabIndex] = useRecoilState(confTabState);
  return (
    <Tabs
      isLazy
      mb={20}
      px={2}
      display="grid"
      gridTemplateColumns="auto 1fr"
      orientation="vertical"
      variant="unstyled"
      colorScheme="whatsapp"
      w="full"
      index={confTabIndex}
      onChange={(index) => setConfTabIndex(index)}
    >
      <TabListEx />
      <TabPanelEx />
    </Tabs>
  );
};
export default ConfigurationScreen;
