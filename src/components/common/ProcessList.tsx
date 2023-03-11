import React, { memo, useEffect } from 'react';
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
  chakra,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { HiOutlineQueueList } from 'react-icons/hi2';
import { useRecoilState } from 'recoil';
import { FaLinux } from 'react-icons/fa';
import { GiMirrorMirror } from 'react-icons/gi';
import { FiPackage, FiTool } from 'react-icons/fi';
import processState, { ProcessStatues, ProcessTypes } from '../../stores/ProcessStore';
import ProcessSingle from './ProcessSingle';

const getIcon = (type:ProcessTypes) => {
  switch (type) {
    case ProcessTypes.Kernel:
      return FaLinux;

    case ProcessTypes.Mirror:
      return GiMirrorMirror;

    case ProcessTypes.Package:
      return FiPackage;

    default:
      return FiTool;
  }
};

const ProcessList = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [processList, setProcess] = useRecoilState(processState);
  async function startProcess() {
    Array.from(processList.entries()).map(async (entry) => {
      const [key, value] = entry;

      value.child.execute().then((res) => {
        const updateList = new Map(processList);
        updateList.delete(key);
        setProcess(updateList);
      });
    });
  }
  useEffect(() => {
    if (processList.size === 7) {
      startProcess();
    }
  }, [processList]);

  return (
    <>
      <Tooltip label={t('processList')}>
        <IconButton
          size="sm"
          aria-label="Show Process List"
          onClick={onOpen}
          icon={(
            <>
              <HiOutlineQueueList />
              {processList.size > 0 && (
              <chakra.span
                pos="absolute"
                top="-1px"
                right="-1px"
                p="4px"
                fontSize="xs"
                fontWeight="bold"
                lineHeight="none"
                color="red.100"
                transform="translate(50%,-50%)"
                bg="red.600"
                rounded="full"
              />
              )}
            </>
        )}
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
              {processList.size > 0 && Array.from(processList.entries()).map((entry) => {
                const [key, value] = entry;
                return (
                  <ProcessSingle
                    title={key}
                    desc={ProcessTypes[value.type]}
                    isProcessing={value.status === ProcessStatues.Processing}
                    icon={getIcon(value.type)}
                  />
                );
              })}
            </VStack>
            {processList.size === 0 && <AbsoluteCenter><Text fontSize="xs" color="gray.400">{t('noProcess')}</Text></AbsoluteCenter>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default memo(ProcessList);
