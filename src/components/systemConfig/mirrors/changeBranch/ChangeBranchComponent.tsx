import {
  HStack, Select, Text, Tooltip,
} from '@chakra-ui/react';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import Branches from '../../../../assets/Braches';
import { getActiveBranch } from '../MirrorHelper';

function capitalize(str:string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const ChangeBranchComponent = () => {
  const [activeBranch, setActiveBranch] = useState('');
  const brValues = Object.values(Branches);

  const colorSc = () => {
    switch (activeBranch) {
      case Branches.Stable:
        return 'green';
      case Branches.Testing:
        return 'orange';
      case Branches.Unstable:
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
    <HStack>
      <Text as="b" fontSize="sm" mr={-1} mt={1}>
        {t('currentBranch')}
        :
      </Text>
      <Tooltip label={t('activeBranchDesc')}>
        <Select
          variant="filled"
          bg={colorSc()}
          onChange={() => {

          }}
        >
          {brValues.map((name) => (
            <option
              value={Branches.Stable}
              selected={activeBranch === name}
              autoCapitalize="words"
            >
              {capitalize(name)}

            </option>
          ))}

        </Select>
      </Tooltip>
    </HStack>
  );
};

export default ChangeBranchComponent;
