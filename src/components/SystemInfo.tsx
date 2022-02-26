import {
  Box,
  useColorModeValue,
  chakra,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
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
      <div dangerouslySetInnerHTML={{ __html: systemInfoRaw }} />
    </Box>
  );
};
export default SystemInfoComponent;
