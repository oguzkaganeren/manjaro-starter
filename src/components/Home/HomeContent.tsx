import React from 'react';
import {
  Container,
  Heading,
  Text,
  Stack,
  Flex,
  Divider,
  useColorModeValue,
  Badge,
  Tooltip,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import ReleaseNotes from './ReleaseNotes';
import Info from './Info';
import LiveInstaller from './LiveInstaller';
import ManjaroVersion from './ManjaroVersion';

const HomeContent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Flex p={4} marginTop={90} marginBottom={50}>
      <Stack spacing={4} as={Container} maxW="3xl" textAlign="center">
        <Heading fontSize="3xl">
          {t('welcomeManjaro')}
          <ManjaroVersion />
        </Heading>

        <Text color={useColorModeValue('gray.800', 'gray.300')} fontSize="xl">
          {t('homeText1')}
        </Text>
        <Info />
        <Divider orientation="horizontal" />
        <ReleaseNotes />
        <LiveInstaller />
      </Stack>
    </Flex>
  );
};
export default HomeContent;
