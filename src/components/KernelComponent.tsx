import {
  Box,
  CircularProgress,
  Flex,
  Button,
  TagLabel,
  useColorModeValue,
  chakra,
  TagLeftIcon,
  Tag,
  IconButton,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { FaLinux } from 'react-icons/fa';
import { RiAddLine } from 'react-icons/ri';
import { MdOutlineDownloadDone } from 'react-icons/md';
import {
  useRecoilState, useRecoilCallback, useRecoilValue,
} from 'recoil';
import _ from 'lodash';
import {
  kernelState,
} from '../stores/KernelStore';

interface KernelComponentProps {
}

const KernelComponent: React.FC<KernelComponentProps> = (props) => {
  const kernelSt = useRecoilValue(kernelState);

  return (
    <Box textAlign={{ lg: 'left' }}>
      <chakra.p
        mt={2}
        fontSize={{ base: '3xl', sm: '4xl' }}
        lineHeight="8"
        fontWeight="extrabold"
        letterSpacing="tight"
        color={useColorModeValue('white.900', 'white.100')}
      >
        Kernels
      </chakra.p>
      <chakra.p
        mt={4}
        maxW="2xl"
        fontSize="xl"
        color={useColorModeValue('gray.500', 'gray.400')}
      >
        Install kernel(s)
      </chakra.p>
      {kernelSt.map((kernel) => (
        <Tag size="md" ml={5} mt={5} key={kernel.id} backgroundColor={kernel.isInstalled ? useColorModeValue('green.300', 'green.500') : 'none'}>
          <TagLeftIcon boxSize="12px" as={FaLinux} />
          <TagLabel>{kernel.name}</TagLabel>
          {!kernel.isInstalled ? <IconButton ml={5} mr={-2} aria-label="Install Kernel" icon={<RiAddLine />} /> : <IconButton ml={5} mr={-2} disabled aria-label="" icon={<MdOutlineDownloadDone />} />}
        </Tag>
      ))}

    </Box>
  );
};
export default KernelComponent;
