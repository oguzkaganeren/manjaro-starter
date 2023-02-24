import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Button,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Command } from '@tauri-apps/api/shell';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { info } from 'tauri-plugin-log-api';
import { appWindow } from '@tauri-apps/api/window';
import commands from '../../assets/Commands';

const RootDetector = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen } = useDisclosure();
  const closeHandle = () => {
    appWindow.close();
  };
  useEffect(() => {
    const detectWho = async () => {
      const cmd = new Command(commands.getWhoami.program);
      cmd.stdout.on('data', (line) => {
        info(`whoami stdout: "${line}"`);
        if (line === 'root') {
          onOpen();
        }
      });
      cmd.on('error', (error) => {
        error(error);
      });
      await cmd.spawn();
    };
    detectWho();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Modal isCentered isOpen={isOpen} onClose={closeHandle}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>{t('rootUserDetected')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{t('rootUserDesc')}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeHandle}>{t('close')}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RootDetector;
