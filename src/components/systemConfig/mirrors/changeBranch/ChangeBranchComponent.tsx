import { EditIcon } from '@chakra-ui/icons';
import {
  Select, Text, Tooltip, Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  FocusLock,
  Button,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import Branches from '../../../../assets/Braches';
import ActiveBranchComponent from '../activeBranch/ActiveBranchComponent';
import { getActiveBranch } from '../MirrorHelper';

function capitalize(str:string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
interface FormTypes {
    onCancel?: () => void,
}

const ChangeBranchForm = (props:FormTypes) => {
  const [activeBranch, setActiveBranch] = useState('');
  const brValues = Object.values(Branches);
  const { onCancel } = props;

  useEffect(() => {
    getActiveBranch().then((res) => {
      setActiveBranch(res.stdout);
    });
  }, []);
  return (
    <Stack spacing={4}>
      <Tooltip label={t('activeBranchDesc')}>
        <Text as="b" fontSize="sm" mr={-1} mt={1}>
          {t('currentBranch')}
          :
        </Text>
      </Tooltip>
      <Select
        size="sm"
        shadow="base"
        variant="filled"
        fontWeight="bold"
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
      <Button variant="outline" onClick={onCancel}>
        {t('cancel')}
      </Button>
      <Button colorScheme="teal">
        {t('apply')}
      </Button>
    </Stack>
  );
};

const ChangeBranchComponent = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <ActiveBranchComponent />
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton aria-label="edit" size="sm" icon={<EditIcon />} />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <ChangeBranchForm onCancel={onClose} />
          </FocusLock>
        </PopoverContent>

      </Popover>
    </>
  );
};

export default ChangeBranchComponent;
