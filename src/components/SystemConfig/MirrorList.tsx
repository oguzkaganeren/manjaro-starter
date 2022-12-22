import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import {
  Button,
  Modal,
  ModalOverlay,
  useDisclosure,
  Box,
  ModalContent,
  ModalFooter,
  Text,
  useColorModeValue,
  ModalBody,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const MirrorList = () => {
  const { t } = useTranslation();
  const [mirrorList, setMirrorList] = useState<JSX.Element[] | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalOpen = () => {
    invoke('run_shell_command_with_result', {
      command: 'cat /etc/pacman.d/mirrorlist',
    }).then((response) => {
      if (response) {
        const responseParse = (response as string)
          .replaceAll('"', '')
          .split('\\n')
          .map((item) => (
            <span>
              {item}
              <br />
            </span>
          ));
        setMirrorList(responseParse);
        onOpen();
      }
    });
  };
  return (
    <Box>
      <Button border="2px" m={5} borderColor="green.500" onClick={modalOpen}>
        {t('showsMirrorList')}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay backdropBlur="2px" />
        <ModalContent>
          <ModalBody p={4}>{mirrorList}</ModalBody>
          <ModalFooter>
            <Text color={useColorModeValue('gray.800', 'gray.500')} as="sup">
              {t('fileCanBeFound')}
              {' '}
              /etc/pacman.d/mirrorlist
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default MirrorList;
