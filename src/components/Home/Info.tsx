import React, { ReactElement } from 'react';
import {
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
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
  <Stack>
    <Stack direction="row" align="center">
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="white"
        rounded="full"
        bg="gray.100"
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
    </Stack>

    <Text color={useColorModeValue('gray.800', 'gray.300')} align="left">{text}</Text>
  </Stack>
);
const Info: React.FC = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>{t('more')}</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" motionPreset="slideInBottom">
        <ModalOverlay
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent p={4}>
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

export default Info;
