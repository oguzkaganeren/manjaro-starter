import React, { memo } from 'react';
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
  DrawerCloseButton,
  DrawerFooter,
  useColorModeValue,
  Code,
  VStack,
  Box,
  useToast,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { HiOutlineCommandLine } from 'react-icons/hi2';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyIcon } from '@chakra-ui/icons';
import commandState from '../../stores/CommandStore';

const CommandHistory = () => {
  const commandHistory = useRecoilValue(commandState);
  const toast = useToast();
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

      <Drawer placement="left" size={['xs', 'xs', 'md', 'lg']} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {t('commandHistory')}
          </DrawerHeader>
          <DrawerBody>
            <VStack alignItems="start">
              {commandHistory.map((cmd) => (
                <Box>
                  <Code colorScheme="green" variant="solid">
                    <CopyToClipboard
                      text={cmd}
                      onCopy={() => {
                        toast({
                          title: t('copied'),
                          description: cmd,
                          status: 'success',
                          duration: 2000,
                          isClosable: true,
                          variant: 'left-accent',
                          position: 'bottom-left',
                        });
                      }}
                    >
                      <IconButton
                        aria-label={t('copyCommand')}
                        size="xs"
                        icon={<CopyIcon />}
                        mr={1}
                        mt={1}
                        bg="green.800"
                      />
                    </CopyToClipboard>
                    {cmd}
                  </Code>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Text
              color={useColorModeValue('gray.800', 'gray.500')}
              fontSize="xs"
            >
              {t('appLogInfo')}
            </Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default memo(CommandHistory);
