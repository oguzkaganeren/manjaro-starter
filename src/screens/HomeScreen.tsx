import React from 'react';
import {
  Container,
  Heading,
  Text,
  Stack,
  Flex,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import ReleaseNotes from '../components/Home/ReleaseNotes';
import Info from '../components/Home/Info';
import LiveInstaller from '../components/Home/LiveInstaller';
import ManjaroVersion from '../components/Home/ManjaroVersion';

const HomeScreen: React.FC = () => {
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
export default HomeScreen;
