import {
  Box,
  CircularProgress,
  Flex,
  Button,
  TagLabel,
  useColorModeValue,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import React, {
  ReactNode, useState, useEffect, useLayoutEffect,
} from 'react';
import { FiCpu, FiDatabase } from 'react-icons/fi';
import { FaMemory } from 'react-icons/fa';
import { HiOutlineDesktopComputer, HiOutlineUser } from 'react-icons/hi';
import { AiFillCode } from 'react-icons/ai';
import { invoke } from '@tauri-apps/api/tauri';
import {
  trace, info, error, attachConsole,
} from 'tauri-plugin-log-api';

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}
interface SystemInfoComponentProps {
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py="5"
      shadow="xl"
      border="1px solid"
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded="lg"
    >
      <Flex justifyContent="space-between">
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight="medium" isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize="2xl" fontWeight="medium">
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
}
function formatBytes(bytes:number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const SystemInfoComponent: React.FC<SystemInfoComponentProps> = (props) => {
  const [systemInfo, setSystemInfo] = useState({
    numberOfCpu: '', totalMemory: 0, usedMemory: 0, totalSwap: 0, usedSwap: 0, sysName: '', sysKernelVersion: '', sysOsVersion: '', sysHostName: '', nameOfCpu: '',
  });
  useEffect(() => {
    invoke('get_sys_info').then((response) => {
      // why two parse???
      const responseJson = JSON.parse(JSON.parse(JSON.stringify(response)));
      setSystemInfo(responseJson);
      info(responseJson);
    });
  }, []);
  return (
    <Box mt={5} mb={5} textAlign={{ lg: 'left' }}>
      <chakra.p
        mt={2}
        mb={4}
        fontSize={{ base: '3xl', sm: '4xl' }}
        lineHeight="8"
        fontWeight="extrabold"
        letterSpacing="tight"
        color={useColorModeValue('white.900', 'white.100')}
      >
        System Details
      </chakra.p>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title="System"
          stat={`${systemInfo.sysName} ${systemInfo.sysOsVersion}`}
          icon={<HiOutlineDesktopComputer size="3em" />}
        />
        <StatsCard
          title="Kernel"
          stat={systemInfo.sysKernelVersion}
          icon={<AiFillCode size="3em" />}
        />
        <StatsCard
          title="Host"
          stat={systemInfo.sysHostName}
          icon={<HiOutlineUser size="3em" />}
        />
        <StatsCard
          title="CPU"
          stat={`${systemInfo.nameOfCpu} 
          ${systemInfo.numberOfCpu} Core`}
          icon={<FiCpu size="3em" />}
        />
        <StatsCard
          title="Memory"
          stat={`${formatBytes(systemInfo.usedMemory * 1024)} / ${formatBytes(systemInfo.totalMemory * 1024)}`}
          icon={<FaMemory size="3em" />}
        />
        <StatsCard
          title="Swap"
          stat={`${formatBytes(systemInfo.usedSwap * 1024)} / ${formatBytes(systemInfo.totalSwap * 1024)}`}
          icon={<FiDatabase size="3em" />}
        />
      </SimpleGrid>

    </Box>
  );
};
export default SystemInfoComponent;
