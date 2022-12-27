import {
  FormControl,
  Modal, useDisclosure, ModalBody, ModalCloseButton,
  ModalContent, ModalHeader, ModalOverlay, IconButton, useColorModeValue, ModalFooter, Text,
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
      <IconButton size="sm" aria-label="Menu" icon={<GiHamburgerMenu />} onClick={onOpen} />
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
          <ModalHeader>{t('appSettings')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl
              mb={4}
              px={{ base: 2, md: 4 }}
              py="5"
              shadow="xl"
              border="1px solid"
              borderColor={useColorModeValue('gray.800', 'gray.500')}
              rounded="lg"
            >
              <LanguageComponent />
            </FormControl>
            <FormControl
              mb={4}
              px={{ base: 2, md: 4 }}
              py="5"
              mt={10}
              shadow="xl"
              border="1px solid"
              borderColor={useColorModeValue('gray.800', 'gray.500')}
              rounded="lg"
            >
              <StartLaunch />
            </FormControl>
            <AboutComponent />
          </ModalBody>
          <ModalFooter>
            <Text color={useColorModeValue('gray.800', 'gray.500')} as="sup">{t('appLogInfo')}</Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AppSettings;
