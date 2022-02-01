import {
  Box,
  CircularProgress,
  Icon,
  Button,
  SimpleGrid,
  useColorModeValue,
  chakra,
  Spacer,
  Flex,
} from '@chakra-ui/react';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { GiProtectionGlasses } from 'react-icons/gi';
import { invoke } from '@tauri-apps/api/tauri';
import KernelComponent from './KernelComponent';
import SystemInfoComponent from './SystemInfo';

interface SystemSettingsProps {
}

const SystemSettings: React.FC<SystemSettingsProps> = (props) => (
  <Box
    px={8}
    py={20}
    mx="auto"
    bg={useColorModeValue('white', 'gray.800')}
    shadow="xl"
  >
    <SystemInfoComponent />
    <Box textAlign={{ lg: 'center' }}>
      <Flex>
        <chakra.p
          mt={2}
          fontSize={{ base: '3xl', sm: '4xl' }}
          lineHeight="8"
          fontWeight="extrabold"
          letterSpacing="tight"
          color={useColorModeValue('white.900', 'white.100')}
        >
          Settings
        </chakra.p>
        <Spacer />
        <Button colorScheme="red" onClick={() => invoke('run_shell_command_with_result', { command: 'manjaro-settings-manager' })} leftIcon={<GiProtectionGlasses />}>
          Advanced
        </Button>
      </Flex>
      <chakra.p
        mt={4}
        maxW="2xl"
        fontSize="xl"
        mx={{ lg: 'auto' }}
        color={useColorModeValue('gray.500', 'gray.400')}
      >
        Set up your environment.
      </chakra.p>

    </Box>
    <KernelComponent />
  </Box>
);
export default SystemSettings;
