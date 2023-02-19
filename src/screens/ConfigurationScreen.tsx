import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import KernelComponent from '../components/systemConfig/kernel/KernelComponent';
import SystemInfoComponent from '../components/systemConfig/SystemInfo';
import SystemUpdate from '../components/systemConfig/SystemUpdate';
import Mirrors from '../components/systemConfig/mirrors/index';
import { liveState } from '../stores/LiveStore';
import FsTrimServiceComponent from '../components/systemConfig/FsTrimServiceComponent';
import confTabState from '../stores/ConfTabStore';
import SettingsComponent from '../components/systemConfig/SettingsComponent';
import expertState from '../stores/ExpertStore';
import DotComponent from '../components/common/DotComponent';

const TabListEx = () => {
  const isLive = useRecoilValue(liveState);
  const isExpert = useRecoilValue(expertState);
  const { t } = useTranslation();
  return (
    <TabList>
      <Tab>{t('system')}</Tab>
      <Tab>
        {isExpert ? <DotComponent color="orange.300">{t('mirrors')}</DotComponent> : t('mirrors')}
      </Tab>
      <Tab>{t('updates')}</Tab>
      {!isLive && <Tab>{t('kernels')}</Tab>}
      {!isLive && <Tab>{t('storage')}</Tab>}
      <Tab>{t('settings')}</Tab>
    </TabList>
  );
};

const TabPanelEx = () => {
  const isLive = useRecoilValue(liveState);
  return (
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
      <TabListEx />
      <TabPanelEx />
    </Tabs>
  );
};
export default ConfigurationScreen;
