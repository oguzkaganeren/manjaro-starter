import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Badge } from '@chakra-ui/react';

const ManjaroVersion = () => {
  const [version, setVersion] = useState('');
  const [codeName, setCodeName] = useState('');
  useEffect(() => {
    invoke('run_shell_command_with_result', { command: 'cat /etc/lsb-release' }).then((response) => {
      if (response) {
        const variables = (response as string).split('\\n');
        const versionTemp = variables[1].split('=')[1];
        const codeNameTemp = variables[2].split('=')[1];
        setVersion(versionTemp);
        setCodeName(codeNameTemp);
      }
    });
  }, []);
  return (
    <Badge ml="1" style={{ textTransform: 'capitalize' }} colorScheme="green" p={1} mb={10}>
      {version}
      {' '}
      {codeName}
    </Badge>

  );
};
export default ManjaroVersion;
