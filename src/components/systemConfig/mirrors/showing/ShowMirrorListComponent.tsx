import React, { useState } from 'react';
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
  ModalCloseButton,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { getMirrorList } from '../MirrorHelper';

const MirrorList = () => {
  const { t } = useTranslation();
  const [mirrorList, setMirrorList] = useState<string | null>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalOpen = () => {
    getMirrorList().then((data) => {
      setMirrorList(data);
      onOpen();
    });
  };
  return (
    <Box>
      <Button
        shadow="base"
        onClick={modalOpen}
      >
        {t('showsMirrorList')}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={['md', 'md', 'xl', '2xl']}
        motionPreset="slideInBottom"
      >
        <ModalOverlay backdropBlur="2px" />

        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={4}>
            {mirrorList?.split('\\n')
              .map((item) => (
                <span>
                  {item}
                  <br />
                </span>
              ))}

          </ModalBody>
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
