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
import { FiCpu } from 'react-icons/fi';
import { invoke } from '@tauri-apps/api/tauri';

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
const SystemInfoComponent: React.FC<SystemInfoComponentProps> = (props) => {
  const [systemInfo, setSystemInfo] = useState({ numberOfCpu: '' });
  useEffect(() => {
    invoke('get_sys_info').then((response) => {
      // why two parse???
      const responseJson = JSON.parse(JSON.parse(JSON.stringify(response)));
      setSystemInfo(responseJson);
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
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title="CPU"
          stat={`${systemInfo.numberOfCpu} Core`}
          icon={<FiCpu size="3em" />}
        />
      </SimpleGrid>

    </Box>
  );
};
export default SystemInfoComponent;
