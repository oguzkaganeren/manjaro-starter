import {
  Modal, useDisclosure, ModalBody, ModalCloseButton,
  ModalContent, ModalHeader, ModalOverlay, IconButton,
} from '@chakra-ui/react';
import { useRef, FC } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useTranslation } from 'react-i18next';
import AboutComponent from './AboutComponent';
import LanguageComponent from './LanguageComponent';
import StartLaunch from './StartLaunch';

const AppSettings: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  return (
    <>
      <IconButton
        size="sm"
        aria-label="Menu"
        icon={<GiHamburgerMenu />}
        onClick={onOpen}
      />
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        size="md"
        onClose={onClose}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent bg="#edf3f8" _dark={{ bg: '#2D3748' }}>
          <ModalHeader>{t('appSettings')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <LanguageComponent />
            <StartLaunch />
            <AboutComponent />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AppSettings;
