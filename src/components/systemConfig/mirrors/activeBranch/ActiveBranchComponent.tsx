import { Badge, Tooltip } from '@chakra-ui/react';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { getActiveBranch } from '../MirrorHelper';

const ActiveBranchComponent = () => {
  const [activeBranch, setActiveBranch] = useState('');
  const colorSc = () => {
    switch (activeBranch) {
      case 'stable':
        return 'green';
      case 'testing':
        return 'orange';
      case 'unstable':
        return 'red';
      default:
        return 'gray';
    }
  };
  useEffect(() => {
    getActiveBranch().then((res) => {
      setActiveBranch(res.stdout);
    });
  }, []);
  return (
    <Tooltip label={t('activeBranchDesc')}>
      <Badge variant="solid" colorScheme={colorSc()}>
        {activeBranch}
      </Badge>
    </Tooltip>
  );
};

export default ActiveBranchComponent;
