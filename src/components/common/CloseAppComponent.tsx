import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api/tauri';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from '@chakra-ui/icons';
import { appWindow } from '@tauri-apps/api/window';

const CloseAppComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  return (
    <>
      <IconButton
        aria-label="Close"
        onClick={onOpen}
        size="sm"
        icon={<CloseIcon />}
      />
      <Modal
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{t('exit')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {t('appCloseDesc')}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                appWindow.close();
              }}
              colorScheme="red"
              size="sm"
            >
              {t('exitApplication')}
            </Button>
            <Button
              colorScheme="yellow"
              onClick={async () => {
                invoke('hide_window').then(() => {
                  onClose();
                });
              }}
              size="sm"
              ml={3}
            >
              {t('hideAsTrayIcon')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CloseAppComponent;
