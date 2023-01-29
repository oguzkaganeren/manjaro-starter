import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  Spinner,
} from '@chakra-ui/react';
import { Command } from '@tauri-apps/api/shell';
import { error } from 'tauri-plugin-log-api';
import { TbHeartRateMonitor } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';

const GpuInfoComponent = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [vgaInfo, setVgaInfo] = useState('');
  const { t } = useTranslation();
  useEffect(() => {
    const getGpuInfo = async () => {
      setIsProcessing(true);
      const cmd = new Command('lspci');
      cmd.on('close', (data) => {
        setIsProcessing(false);
      });
      cmd.on('error', (retError) => {
        error(retError);
      });
      cmd.stdout.on('data', (line) => {
        if (line.indexOf('VGA') > 0) {
          const dataCut = line.split(':')[2];
          setVgaInfo((prevInfo) => (prevInfo ? `${prevInfo}\n${dataCut}` : dataCut));
        }
      });
      cmd.stderr.on('data', (line) => {
        error(`command stderr: "${line}"`);
      });
      await cmd.spawn();
    };
    getGpuInfo();
  }, []);

  if (isProcessing) return <Spinner />;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py="3"
      mt={4}
      shadow="xl"
      size="sm"
      border="1px solid"
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded="lg"
    >
      <Flex justifyContent="space-between">
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight="bold">{t('gpu')}</StatLabel>
          <StatNumber
            style={{ whiteSpace: 'pre-line' }}
            fontSize="1xl"
            fontWeight="small"
          >
            {vgaInfo}
          </StatNumber>
        </Box>
        <Box
          my="auto"
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent="center"
        >
          <TbHeartRateMonitor size="2em" />
        </Box>
      </Flex>
    </Stat>
  );
};
export default GpuInfoComponent;
