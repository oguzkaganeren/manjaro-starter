import {
  Box,
  Button,
  useColorModeValue,
  chakra,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/api/shell';
import { info, error } from 'tauri-plugin-log-api';

const SystemFastestMirror: React.FC = (props) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const setFastestMirror = async () => {
    setIsProcessing(true);
    const cmd = new Command('sudo', ['pacman-mirrors', '--fasttrack', '5']);
    cmd.execute().then((response) => {
      setIsProcessing(false);
      error(response.stderr);
      info(response.stdout);
      if (response.stdout) {
        toast({
          title: '',
          description: response.stdout.replace(/\u001b\[.*?m/g, '').replaceAll('::', ''),
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'bottom-right',
        });
      } else {
        toast({
          title: '',
          description: response.stderr.replace(/\u001b\[.*?m/g, ''),
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'bottom-right',
        });
      }
    });
  };

  return (
    <Box mt={5} textAlign={{ lg: 'left' }}>

      <chakra.p
        mt={2}
        fontSize={{ base: '3xl', sm: '3xl' }}
        lineHeight="8"
        fontWeight="extrabold"
        letterSpacing="tight"
        color={useColorModeValue('white.900', 'white.100')}
      >
        {t('fastestMirror')}
      </chakra.p>

      <chakra.p
        mt={4}
        maxW="2xl"
        fontSize="xl"
        color={useColorModeValue('gray.500', 'gray.400')}
      >
        {t('setFastestMirrors')}

      </chakra.p>
      <Button
        size="md"
        height="48px"
        width="200px"
        border="2px"
        mt={5}
        borderColor="green.500"
        onClick={setFastestMirror}
        isLoading={isProcessing}
        loadingText={t('processing')}
      >
        {t('setFastestMirrors')}
      </Button>
    </Box>
  );
};
export default SystemFastestMirror;
