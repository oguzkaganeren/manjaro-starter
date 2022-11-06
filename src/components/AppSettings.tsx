import {
  FormControl,
  Modal, useDisclosure, ModalBody, ModalCloseButton,
  ModalContent, ModalHeader, ModalOverlay, IconButton,
} from '@chakra-ui/react';
import { useRef, FC } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import AboutComponent from './AboutComponent';
import LanguageComponent from './LanguageComponent';
import StartLaunch from './StartLaunch';

const AppSettings: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  return (
    <>
      <IconButton aria-label="Menu" icon={<GiHamburgerMenu />} onClick={onOpen} />
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
        <ModalContent>
          <ModalHeader>App Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={4}>
              <LanguageComponent />
            </FormControl>
            <FormControl>
              <StartLaunch />
            </FormControl>
            <AboutComponent />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AppSettings;
