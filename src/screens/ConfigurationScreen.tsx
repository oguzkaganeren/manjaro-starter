import {
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  FiAirplay,
  FiDownload, FiGitMerge, FiHardDrive, FiLayers, FiSettings,
} from 'react-icons/fi';
import KernelComponent from '../components/systemConfig/kernel/KernelComponent';
import SystemInfoComponent from '../components/systemConfig/SystemInfo';
import SystemUpdate from '../components/systemConfig/SystemUpdate';
import Mirrors from '../components/systemConfig/mirrors/index';
import { liveState } from '../stores/LiveStore';
import FsTrimServiceComponent from '../components/systemConfig/FsTrimServiceComponent';
import { confTabState } from '../stores/ConfTabStore';
import SettingsComponent from '../components/systemConfig/SettingsComponent';
import Sidebar from '../components/common/Sidebar/Sidebar';
import { SidebarContentType } from '../components/common/Sidebar/SidebarContentType';

const SideContent = () => {
  const isLive = useRecoilValue(liveState);
  const ret: Array<SidebarContentType> = [];
  ret.push({
    icon: FiAirplay, text: 'system', isSelected: true, onClick: () => {},
  });
  ret.push({
    icon: FiGitMerge, text: 'mirrors', onClick: () => {},
  });
  ret.push({
    icon: FiDownload, text: 'updates', onClick: () => {},
  });
  ret.push({
    icon: FiLayers, text: 'kernels', isHidden: isLive, onClick: () => {},
  });
  ret.push({
    icon: FiHardDrive, text: 'storage', isHidden: isLive, onClick: () => {},
  });
  ret.push({
    icon: FiSettings, text: 'settings', onClick: () => {},
  });
  return ret;
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
    <Sidebar sidebarContent={SideContent()} />
  );
};
export default ConfigurationScreen;
