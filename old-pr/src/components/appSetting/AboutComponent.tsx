import {
  Button,
  Flex,
  Box,
  Image,
  Center,
  Text,
  chakra,
  VStack,
  HStack,
  Divider,
} from '@chakra-ui/react';
import {
  SiGit, SiMonkeytie,
} from 'react-icons/si';
import { open } from '@tauri-apps/plugin-shell';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/icon.png';
import packageJson from '../../../package.json';
import Changelog from './Changelog';
import BugReport from './BugReport';
import SendFeedback from './SendFeedback';

const AboutDetailsButtons = () => {
  const { t } = useTranslation();
  return (
    <VStack alignItems="flex-start">
      <Changelog />
      <BugReport />
      <SendFeedback />
      <Button
        mt={5}
        mr={5}
        size="xs"
        onClick={async () => {
          await open('https://github.com/oguzkaganeren/manjaro-starter');
        }}
        leftIcon={<SiGit />}
      >
        <Center>
          <Text>{t('projectGithubPage')}</Text>
        </Center>
      </Button>
      <Button
        mt={5}
        mr={5}
        size="xs"
        onClick={async () => {
          await open(
            'https://github.com/oguzkaganeren/manjaro-starter/blob/master/LICENSE.md',
          );
        }}
        leftIcon={<SiMonkeytie />}
      >
        <Center>
          <Text>{t('gnu')}</Text>
        </Center>
      </Button>
    </VStack>
  );
};
const AboutDetailsInfo = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <chakra.h2
        color="gray.800"
        _dark={{
          color: 'white',
        }}
        fontSize={{
          base: '1xl',
          md: '3xl',
        }}
        fontWeight="bold"
      >
        {t('manjaroStarter')}
      </chakra.h2>
      <chakra.h3
        color="gray.800"
        _dark={{
          color: 'white',
        }}
        fontSize={{
          base: '1xl',
          md: '2xl',
        }}
        mt={{
          base: 2,
          md: 0,
        }}
      >
        {packageJson.version}
      </chakra.h3>
    </Box>
  );
};

const AboutComponent = (): JSX.Element => (
  <Box
    mx="auto"
    py={4}
    px={8}
    mt={16}
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
      mt={-16}
    >
      <Image
        w={20}
        h={20}
        fit="cover"
        rounded="full"
        borderStyle="solid"
        borderWidth={2}
        color="brand.500"
        _dark={{
          color: 'brand.400',
        }}
        src={logo}
      />
    </Flex>
    <HStack>
      <AboutDetailsInfo />
      <Center height="180px">
        <Divider orientation="vertical" />
      </Center>
      <AboutDetailsButtons />
    </HStack>
  </Box>
);

export default AboutComponent;
