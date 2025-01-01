import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
  Spinner,
  Card,
  Text,
} from '@chakra-ui/react';
import { Command } from '@tauri-apps/plugin-shell';
import { error } from '@tauri-apps/plugin-log';
import { TbHeartRateMonitor } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import commands from '../../assets/Commands';

const GpuInfoComponent = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [vgaInfo, setVgaInfo] = useState('');
  const { t } = useTranslation();
  useEffect(() => {
    const getGpuInfo = async () => {
      setIsProcessing(true);
      const cmd = Command.create(commands.getLspci.program);
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
    <Card
      px={{ base: 2, md: 4 }}
      py="3"
      mt={4}
      size="sm"
    >
      <Flex justifyContent="space-between">
        <Box pl={{ base: 2, md: 4 }}>
          <Text fontWeight="bold">{t('gpu')}</Text>
          <Text
            style={{ whiteSpace: 'pre-line' }}
            fontSize="1xl"
            fontWeight="small"
          >
            {vgaInfo}
          </Text>
        </Box>
        <Box
          my="auto"
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent="center"
        >
          <TbHeartRateMonitor size="2em" />
        </Box>
      </Flex>
    </Card>
  );
};
export default GpuInfoComponent;
