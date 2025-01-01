import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const DistroDetail = () => {
  const [version, setVersion] = useState('');
  const [codeName, setCodeName] = useState('');
  const [distro, setDistro] = useState('');
  const { t } = useTranslation();
  useEffect(() => {
    invoke('run_shell_command_with_result', { command: 'cat /etc/lsb-release' }).then((response) => {
      if (response) {
        const variables = (response as string).split('\\n');
        const versionTemp = variables[1].split('=')[1].replaceAll('\\"', '');
        const codeNameTemp = variables[2].split('=')[1].replaceAll('\\"', '');
        const dist = variables[variables.length - 2].split('=')[1].replaceAll('\\"', '');

        setVersion(versionTemp);
        setCodeName(codeNameTemp);
        setDistro(dist);
      }
    });
  }, []);
  return (
    <Heading
      fontWeight={600}
      fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
      lineHeight="50%"
    >
      {`${t('welcomeMessage')} `}

      {distro}
      <br />
      <Text as="span" fontSize="md" style={{ textTransform: 'capitalize' }} color="green.400">
        {version}
        {' '}
        {codeName}
      </Text>
    </Heading>
  );
};
export default DistroDetail;
