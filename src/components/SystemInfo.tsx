import {
  Box,
  CircularProgress,
  Flex,
  Button,
  TagLabel,
  useColorModeValue,
  chakra,
  Text,
  Tag,
  IconButton,
  useToast,
  Spacer,
} from '@chakra-ui/react';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

interface SystemInfoComponentProps {
}

const SystemInfoComponent: React.FC<SystemInfoComponentProps> = (props) => {
  useEffect(() => {
    invoke('get_sys_info').then((result) => {
      console.log(result);
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
      {}
    </Box>
  );
};
export default SystemInfoComponent;
