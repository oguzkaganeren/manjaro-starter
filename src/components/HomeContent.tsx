import React, { ReactElement } from 'react';
import {
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Divider,
} from '@chakra-ui/react';
import {
  FcElectronics, FcInfo, FcGlobe, FcCollaboration, FcFeedback, FcInvite,
} from 'react-icons/fc';
import { useTranslation } from 'react-i18next';
import ReleaseNotes from './ReleaseNotes';

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

    <Text color="gray.600" align="left">{text}</Text>
  </Stack>
);

const HomeContent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Flex p={4} marginTop={90} marginBottom={50}>

      <Stack spacing={4} as={Container} maxW="3xl" textAlign="center">
        <Heading fontSize="3xl">
          {t('welcomeManjaro')}
        </Heading>
        <Text color="gray.600" fontSize="xl">
          {t('homeText1')}
        </Text>

        <Divider orientation="horizontal" />
        <ReleaseNotes />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
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
            icon={<Icon as={FcInvite} w={10} h={10} />}
            title={t('mailList')}
            text={t('homeText6')}
          />
          <Feature
            icon={<Icon as={FcFeedback} w={10} h={10} />}
            title={t('suggestions')}
            text={t('homeText7')}
          />
        </SimpleGrid>
      </Stack>

    </Flex>
  );
};
export default HomeContent;
