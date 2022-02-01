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
import { FaLinux } from 'react-icons/fa';
import { RiAddLine } from 'react-icons/ri';
import { MdOutlineDownloadDone } from 'react-icons/md';
import {
  useRecoilCallback, useRecoilValue,
} from 'recoil';
import _ from 'lodash';
import {
  systemState,
} from '../stores/SystemStore';

interface SystemInfoComponentProps {
}

const SystemInfoComponent: React.FC<SystemInfoComponentProps> = (props) => {
  const systemSt = useRecoilValue(systemState);
  const [systemInfoRaw, setSystemInfoRaw] = useState('');
  useEffect(() => {
    let htmlRaw = '';
    systemSt.split('\\n').map((item, idx) => {
      htmlRaw += `${item.replaceAll('\\u{3}12', '<b>').replaceAll('\\u{3}', '</b>')}<br/>`;
    });
    setSystemInfoRaw(htmlRaw);
  }, []);
  return (
    <Box borderWidth="1px" mt={5} mb={5} borderRadius={5} padding={5} textAlign={{ lg: 'left' }}>

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
      <div dangerouslySetInnerHTML={{ __html: systemInfoRaw }} />
    </Box>
  );
};
export default SystemInfoComponent;
