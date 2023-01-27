import {
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
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

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}
const StatsCard = (props: StatsCardProps) => {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py="3"
      shadow="xl"
      size="sm"
      border="1px solid"
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded="lg"
    >
      <Flex justifyContent="space-between">
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight="bold">
            {title}
          </StatLabel>
          <StatNumber fontSize="sm" fontWeight="small">
            {stat}
          </StatNumber>
        </Box>
        <Box
          my="auto"
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent="center"
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
};
function formatBytes(bytes:number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

const SystemInfoComponent: React.FC = () => {
  const { t } = useTranslation();
  const [systemInfo, setSystemInfo] = useState({
    numberOfCpu: '', totalMemory: 0, usedMemory: 0, totalSwap: 0, usedSwap: 0, sysName: '', sysKernelVersion: '', sysOsVersion: '', sysHostName: '', nameOfCpu: '',
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
          stat={`${formatBytes(systemInfo.usedMemory * 1024)} / ${formatBytes(
            systemInfo.totalMemory * 1024,
          )}`}
          icon={<FaMemory size="2em" />}
        />
        <StatsCard
          title={t('swap')}
          stat={`${formatBytes(systemInfo.usedSwap * 1024)} / ${formatBytes(
            systemInfo.totalSwap * 1024,
          )}`}
          icon={<FiDatabase size="2em" />}
        />
      </SimpleGrid>
      <GpuInfoComponent />
    </>
  );
};
export default SystemInfoComponent;
