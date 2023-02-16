import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Portal,
  Tooltip,
  useDisclosure,
  PopoverHeader,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCloudversify } from 'react-icons/fa';
import RemotePackageVersion from './RemotePackageVersion';

type Props = {
  name: string;
};
const RemotePackagePopover = ({ name }: Props) => {
  const { t } = useTranslation();
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <Popover isOpen={isOpen} onClose={onClose} size="xs" isLazy>
      <PopoverTrigger>
        <Tooltip label={t('repoDetail')}>
          <IconButton
            aria-label={t('remoteVersion')}
            icon={<FaCloudversify />}
            onClick={onToggle}
          />
        </Tooltip>
      </PopoverTrigger>
      <Portal>
        <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
          <PopoverHeader pt={4} fontWeight="bold" border="0">
            {t('branchVersions')}
          </PopoverHeader>
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
