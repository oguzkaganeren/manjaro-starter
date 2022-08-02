import {
  Box,
  Center,
  Icon,
  Button,
  SimpleGrid,
  useColorModeValue,
  chakra,
  Spacer,
  Flex,
  ButtonGroup,
} from '@chakra-ui/react';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { GiProtectionGlasses } from 'react-icons/gi';
import { invoke } from '@tauri-apps/api/tauri';
import { Command } from '@tauri-apps/api/shell';
import KernelComponent from './KernelComponent';
import SystemInfoComponent from './SystemInfo';

interface SystemSettingsProps {
}

const SystemSettings: React.FC<SystemSettingsProps> = (props) => {
  const [isVisibleGnomeLayout, setIsVisibleGnomeLayout] = useState(false);
  useEffect(() => {
    const result = new Command('installed-control', ['gnome-layout-switcher']).execute();
    result.then((response) => {
      if (response.stdout) {
        setIsVisibleGnomeLayout(true);
      }
    });
  });
  return (
    <Box
      px={8}
      py={20}
      mx="auto"
      bg={useColorModeValue('white', 'gray.800')}
      shadow="xl"
    >
      <SystemInfoComponent />
      <Box textAlign={{ lg: 'center' }}>
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

      <Center>
        <ButtonGroup>
          <Button
            mt={10}
            size="md"
            height="48px"
            border="2px"
            borderColor="green.500"
            onClick={() => invoke('run_shell_command_with_result', { command: 'manjaro-settings-manager' })}
            leftIcon={<GiProtectionGlasses />}
          >
            More Settings
          </Button>
          {isVisibleGnomeLayout && (
          <Button
            mt={10}
            size="md"
            height="48px"
            border="2px"
            onClick={async () => {
              const result = new Command('gnome-layout-switcher').execute();
              console.log(result);
            }}
          >
            Gnome Layout Switcher
          </Button>
          )}
        </ButtonGroup>

      </Center>
    </Box>
  );
};
export default SystemSettings;
