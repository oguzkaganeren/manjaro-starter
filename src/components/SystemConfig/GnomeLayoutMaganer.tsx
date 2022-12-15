import {
  Modal, useDisclosure, ModalBody, ModalCloseButton,
  ModalContent, ModalHeader, ModalOverlay,
  Button, useColorModeValue, ModalFooter, Image, SimpleGrid, Heading, VStack,
} from '@chakra-ui/react';
import { useRef, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/api/shell';

const GnomeLayoutManager: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const LAYOUTS = ['gnome', 'manjaro', 'material-shell', 'traditional'];
  const { t } = useTranslation();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  return (
    <>
      <Button
        mt={10}
        size="md"
        height="48px"
        border="2px"
        onClick={onOpen}
      >
        {t('gnomeLayoutSwitcher')}
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        size="lg"
        onClose={onClose}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>
            {t('gnomeLayoutSwitcher')}

          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SimpleGrid columns={2} spacing={10}>
              {LAYOUTS.map((layout, index) => (
                <Button
                  py="5"
                  px={{ base: 2, md: 4 }}
                  height="200px"
                  shadow="xl"
                  variant="outline"
                  border="1px solid"
                  borderColor={useColorModeValue('gray.800', 'gray.500')}
                  rounded="lg"
                  onClick={async () => {
                    new Command('gnome-layout-switcher', [`apply-${layout}`]).execute();
                  }}
                >
                  <VStack>
                    <Heading as="h5" size="sm" style={{ textTransform: 'capitalize' }}>{layout}</Heading>
                    <Image src={`${process.env.PUBLIC_URL}/GnomeLayouts/${layout}preview.svg`} alt="Gnome" />
                  </VStack>

                </Button>
              ))}
            </SimpleGrid>

          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              onClick={async () => {
                new Command('gnome-layout-switcher').execute();
              }}
            >
              {t('advanced')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default GnomeLayoutManager;
