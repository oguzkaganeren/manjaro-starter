import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  DrawerOverlay,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Text,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { HiOutlineCommandLine } from 'react-icons/hi2';
import { commandState } from '../../stores/CommandStore';

const CommandHistory = () => {
  const commandHistory = useRecoilValue(commandState);
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label={t('commandHistory')}>
        <IconButton
          size="sm"
          aria-label="Open Command History"
          onClick={onOpen}
          icon={<HiOutlineCommandLine />}
        />
      </Tooltip>

      <Drawer placement="left" size="md" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            {t('commandHistory')}
          </DrawerHeader>
          <DrawerBody>
            <Text style={{ whiteSpace: 'pre-line' }}>{commandHistory}</Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default CommandHistory;
