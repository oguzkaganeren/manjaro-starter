import React, { memo } from 'react';
import {
  DrawerOverlay,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  IconButton,
  Tooltip,
  DrawerCloseButton,
  VStack,
  Text,
  AbsoluteCenter,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { HiOutlineQueueList } from 'react-icons/hi2';
import { useRecoilValue } from 'recoil';
import ProcessSingle from './ProcessSingle';
import processState from '../../stores/ProcessStore';

const ProcessList = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const processList = useRecoilValue(processState);
  return (
    <>
      <Tooltip label={t('processList')}>
        <IconButton
          size="sm"
          aria-label="Show Process List"
          onClick={onOpen}
          icon={<HiOutlineQueueList />}
        />
      </Tooltip>

      <Drawer placement="left" size={['xs', 'xs', 'sm', 'md']} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent
          bg="#edf3f8"
          _dark={{
            bg: '#171923',
          }}
        >
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {t('processList')}
          </DrawerHeader>
          <DrawerBody>
            <VStack alignItems="start">
              {processList.size > 0 && <ProcessSingle />}
            </VStack>
            {processList.size === 0 && <AbsoluteCenter><Text fontSize="xs" color="gray.400">{t('noProcess')}</Text></AbsoluteCenter>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default memo(ProcessList);
