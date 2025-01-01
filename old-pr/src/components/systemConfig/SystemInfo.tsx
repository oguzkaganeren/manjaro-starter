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
import { FiCpu, FiDatabase, FiDisc } from 'react-icons/fi';
import { IoIosTimer } from 'react-icons/io';
import { FaMemory } from 'react-icons/fa';
import { HiOutlineDesktopComputer, HiOutlineUser } from 'react-icons/hi';
import { AiFillCode } from 'react-icons/ai';
import { invoke } from '@tauri-apps/api/core';
import { useTranslation } from 'react-i18next';
import { PiTimer } from 'react-icons/pi';
import { TbTemperature } from 'react-icons/tb';
import GpuInfoComponent from './GpuInfoComponent';
import formatBytes, { secToMinutesAndSeconds } from '../../utils/Format';
import DiskInfo from './DiskInfo';
import ComponentInfo from './ComponentInfo';

interface StatsCardProps {
  title: string;
  stat?: string;
  icon: ReactNode;
  children?:ReactNode;
}
const StatsCard = (props: StatsCardProps) => {
  const {
    title, stat, icon, children,
  } = props;
  return (
    <Card px={{ base: 2, md: 4 }} py="3" size="sm">
      <Flex justifyContent="space-between">
        <Box px={{ base: 2, md: 4 }}>
          <Text fontWeight="bold">{title}</Text>
          {stat || (
            <Text fontSize="sm" fontWeight="small">
              {stat}
            </Text>
          )}
        </Box>

        <Box
          my="auto"
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent="center"
        >
          {icon}
        </Box>
      </Flex>
      {children}
    </Card>
  );
};

const SystemInfoComponent: React.FC = () => {
  const { t } = useTranslation();
  const [systemInfo, setSystemInfo] = useState({
    host_name: '',
    distribution_id: '',
    long_os_version: '',
    os_version: '',
    kernel_version: '',
    name: '',
    load_average: {},
    boot_time: 0,
    uptime: 0,
    used_swap: 0,
    free_swap: 0,
    total_swap: 0,
    used_memory: 0,
    available_memory: 0,
    free_memory: 0,
    total_memory: 0,
    physical_core_count: 0,
    global_cpu_info: {
      brand: '',
      cpu_usage: 0,
      frequency: 0,
      name: '',
      vendor_id: '',
    },
    cpus: [{
      brand: '',
      cpu_usage: 0,
      frequency: 0,
      name: '',
      vendor_id: '',
    }],
  });
  useEffect(() => {
    invoke('get_sys_info').then((response) => {
      const responseJson = JSON.parse(JSON.parse(JSON.stringify(response)));
      setSystemInfo(responseJson);
    });
  }, []);
  return (
    <>
      <SimpleGrid transition=".3s ease" columns={2} spacing={4}>
        <StatsCard
          title={t('system')}
          stat={`${systemInfo.name} ${systemInfo.os_version}`}
          icon={<HiOutlineDesktopComputer size="2em" />}
        />
        <StatsCard
          title={t('kernel')}
          stat={systemInfo.kernel_version}
          icon={<AiFillCode size="2em" />}
        />
        <StatsCard
          title={t('host')}
          stat={systemInfo.host_name}
          icon={<HiOutlineUser size="2em" />}
        />
        <StatsCard
          title={t('memory')}
          stat={`${formatBytes(systemInfo.used_memory)} / ${formatBytes(
            systemInfo.total_memory,
          )}`}
          icon={<FaMemory size="2em" />}
        />

        <StatsCard
          title={t('uptime')}
          stat={secToMinutesAndSeconds(systemInfo.uptime)}
          icon={<PiTimer size="2em" />}
        />
        <StatsCard
          title={t('bootTime')}
          stat={secToMinutesAndSeconds(systemInfo.boot_time)}
          icon={<IoIosTimer size="2em" />}
        />

        <StatsCard
          title={t('cpu')}
          stat={`${systemInfo.cpus[0].brand} 
          ${systemInfo.cpus.length} Core`}
          icon={<FiCpu size="2em" />}
        />
        <StatsCard title={t('disks')} icon={<FiDisc size="2em" />}>
          <DiskInfo />
        </StatsCard>
        <StatsCard
          title={t('swap')}
          stat={`${formatBytes(systemInfo.used_swap)} / ${formatBytes(
            systemInfo.total_swap,
          )}`}
          icon={<FiDatabase size="2em" />}
        />
        <StatsCard
          title={t('componentTemp')}
          icon={<TbTemperature size="2em" />}
        >
          <ComponentInfo />
        </StatsCard>
      </SimpleGrid>
      <GpuInfoComponent />
    </>
  );
};
export default SystemInfoComponent;
