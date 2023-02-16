import {
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  Card,
  Text,
} from '@chakra-ui/react';
import React, {
  ReactNode, useState, useEffect,
} from 'react';
import { FiCpu, FiDatabase } from 'react-icons/fi';
import { FaMemory } from 'react-icons/fa';
import { HiOutlineDesktopComputer, HiOutlineUser } from 'react-icons/hi';
import { AiFillCode } from 'react-icons/ai';
import { invoke } from '@tauri-apps/api/tauri';
import { useTranslation } from 'react-i18next';
import GpuInfoComponent from './GpuInfoComponent';
import formatBytes from '../../utils/Format';

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}
const StatsCard = (props: StatsCardProps) => {
  const { title, stat, icon } = props;
  return (
    <Card
      px={{ base: 2, md: 4 }}
      py="3"
      size="sm"
    >
      <Flex justifyContent="space-between">
        <Box px={{ base: 2, md: 4 }}>
          <Text fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="sm" fontWeight="small">
            {stat}
          </Text>
        </Box>
        <Box
          my="auto"
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent="center"
        >
          {icon}
        </Box>
      </Flex>
    </Card>
  );
};

const SystemInfoComponent: React.FC = () => {
  const { t } = useTranslation();
  const [systemInfo, setSystemInfo] = useState({
    numberOfCpu: '',
    totalMemory: 0,
    usedMemory: 0,
    totalSwap: 0,
    usedSwap: 0,
    sysName: '',
    sysKernelVersion: '',
    sysOsVersion: '',
    sysHostName: '',
    nameOfCpu: '',
  });
  useEffect(() => {
    invoke('get_sys_info').then((response) => {
      // why two parse???
      const responseJson = JSON.parse(JSON.parse(JSON.stringify(response)));
      setSystemInfo(responseJson);
    });
  }, []);
  return (
    <>
      <SimpleGrid columns={2} spacing={4}>
        <StatsCard
          title={t('system')}
          stat={`${systemInfo.sysName} ${systemInfo.sysOsVersion}`}
          icon={<HiOutlineDesktopComputer size="2em" />}
        />
        <StatsCard
          title={t('kernel')}
          stat={systemInfo.sysKernelVersion}
          icon={<AiFillCode size="2em" />}
        />
        <StatsCard
          title={t('host')}
          stat={systemInfo.sysHostName}
          icon={<HiOutlineUser size="2em" />}
        />
        <StatsCard
          title={t('cpu')}
          stat={`${systemInfo.nameOfCpu} 
          ${systemInfo.numberOfCpu} Core`}
          icon={<FiCpu size="2em" />}
        />
        <StatsCard
          title={t('memory')}
          stat={`${formatBytes(systemInfo.usedMemory)} / ${formatBytes(systemInfo.totalMemory)}`}
          icon={<FaMemory size="2em" />}
        />
        <StatsCard
          title={t('swap')}
          stat={`${formatBytes(systemInfo.usedSwap)} / ${formatBytes(systemInfo.totalSwap)}`}
          icon={<FiDatabase size="2em" />}
        />
      </SimpleGrid>
      <GpuInfoComponent />
    </>
  );
};
export default SystemInfoComponent;
