import React, { ReactElement } from 'react';
import {
  SimpleGrid,
  Icon,
  Box,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  chakra,
} from '@chakra-ui/react';
import {
  FcElectronics, FcInfo, FcGlobe, FcCollaboration, FcFeedback,
} from 'react-icons/fc';
import { useTranslation } from 'react-i18next';

interface FeatureProps {
    title: string;
    text: string;
    icon: ReactElement;
  }
const Feature = ({ title, text, icon }: FeatureProps) => (
  <Box
    w={['xs', 'xs', 'sm', 'md']}
    mx="auto"
    py={4}
    px={8}
    bg="white"
    _dark={{
      bg: 'gray.800',
    }}
    shadow="lg"
    rounded="lg"
  >
    <Flex
      justifyContent={{
        base: 'center',
        md: 'end',
      }}
      mt={-8}
    >
      {icon}
    </Flex>

    <chakra.h2
      color="gray.800"
      _dark={{
        color: 'white',
      }}
      fontSize={{
        base: '2xl',
        md: '3xl',
      }}
      mt={{
        base: 2,
        md: 0,
      }}
      fontWeight="bold"
    >
      {title}
    </chakra.h2>

    <chakra.p
      mt={2}
      color="gray.600"
      _dark={{
        color: 'gray.200',
      }}
    >
      {text}
    </chakra.p>

  </Box>
);
const LearnMoreComponent: React.FC = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant="link" colorScheme="blue" size="sm" onClick={onOpen}>
        {t('learnMore')}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={['xs', 'sm', 'md', 'lg']}
        motionPreset="slideInBottom"
      >
        <ModalOverlay backdropInvert="80%" backdropBlur="2px" />
        <ModalContent bg="#edf3f8" _dark={{ bg: '#2D3748' }} p={9}>
          <SimpleGrid columns={{ base: 1, md: 1 }} spacing={10}>
            <Feature
              icon={<Icon as={FcElectronics} w={10} h={10} />}
              title={t('handleHardware')}
              text={t('homeText2')}
            />
            <Feature
              icon={<Icon as={FcInfo} w={10} h={10} />}
              title={t('gettingHelp')}
              text={t('homeText3')}
            />
            <Feature
              icon={<Icon as={FcGlobe} w={10} h={10} />}
              title={t('searchWeb')}
              text={t('homeText4')}
            />
            <Feature
              icon={<Icon as={FcCollaboration} w={10} h={10} />}
              title={t('lookForum')}
              text={t('homeText5')}
            />
            <Feature
              icon={<Icon as={FcFeedback} w={10} h={10} />}
              title={t('suggestions')}
              text={t('homeText7')}
            />
          </SimpleGrid>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LearnMoreComponent;
