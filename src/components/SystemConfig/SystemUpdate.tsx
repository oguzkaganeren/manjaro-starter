import {
  Box,
  Skeleton,
  TagLabel,
  useColorModeValue,
  chakra,
  TagLeftIcon,
  Tag,
  IconButton,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FaLinux } from 'react-icons/fa';
import { RiAddLine } from 'react-icons/ri';
import { MdOutlineDownloadDone } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/api/shell';

const SystemUpdate: React.FC = (props) => {
  const { t } = useTranslation();
    
  useEffect(() => {

  });

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
        {t('updates')}
      </chakra.p>

      <chakra.p
        mt={4}
        maxW="2xl"
        fontSize="xl"
        color={useColorModeValue('gray.500', 'gray.400')}
      >
        {t('updateYourSystem')}
      </chakra.p>

    </Box>
  );
};
export default SystemUpdate;
