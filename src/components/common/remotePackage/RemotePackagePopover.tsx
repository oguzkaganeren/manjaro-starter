import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Portal,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import RemotePackageVersion from './RemotePackageVersion';

type Props = {
  name: string;
};
const RemotePackagePopover = ({ name }: Props) => {
  const { t } = useTranslation();
  return (
    <Popover size="xs" isLazy>
      <PopoverTrigger>
        <IconButton aria-label={t('remoteVersion')} icon={<HamburgerIcon />} />
      </PopoverTrigger>
      <Portal>
        <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <RemotePackageVersion branch="unstable" name={name} />
            <RemotePackageVersion branch="testing" name={name} />
            <RemotePackageVersion branch="stable" name={name} />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default RemotePackagePopover;
