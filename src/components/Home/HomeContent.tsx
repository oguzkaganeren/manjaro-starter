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
import ReleaseNotes from './ReleaseNotes';
import Info from './Info';

const HomeContent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Flex p={4} marginTop={90} marginBottom={50}>

      <Stack spacing={4} as={Container} maxW="3xl" textAlign="center">
        <Heading fontSize="3xl">
          {t('welcomeManjaro')}
        </Heading>
        <Text color={useColorModeValue('gray.800', 'gray.300')} fontSize="xl">
          {t('homeText1')}
        </Text>
        <Info />
        <Divider orientation="horizontal" />

        <ReleaseNotes />

      </Stack>

    </Flex>
  );
};
export default HomeContent;
