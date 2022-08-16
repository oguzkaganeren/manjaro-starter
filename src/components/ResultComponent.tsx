import {
  Container, Heading, Text, Button, Center,
} from '@chakra-ui/react';
import React from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  SiDiscourse, SiWikipedia, SiGit, SiTelegram, SiReddit,
} from 'react-icons/si';
import {
  FiPackage, FiMail, FiFacebook, FiTwitter,
} from 'react-icons/fi';
import { open } from '@tauri-apps/api/shell';
import { BiDonateHeart } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-named-default
import { default as SocialLinks } from '../assets/SocialUrls.json';

interface ResultProps {
    onReset: () => void;
}
const ResultComponent: React.FC<ResultProps> = (props) => {
  const { t } = useTranslation();
  const { onReset } = props;
  return (
    <Container textAlign="center">
      <CheckCircleIcon boxSize="50px" color="green.500" marginTop={100} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {t('congratulations')}
      </Heading>
      <Text color="gray.500">
        {t('readyText')}
      </Text>
      <Button mt={5} mr={5} colorScheme="whatsapp" onClick={async () => { await open(SocialLinks.urls.forum); }} leftIcon={<SiDiscourse />}>
        <Center>
          <Text>{t('postForum')}</Text>
        </Center>
      </Button>
      <Button mt={5} mr={5} colorScheme="yellow" onClick={async () => { await open(SocialLinks.urls.software); }} leftIcon={<FiPackage />}>
        <Center>
          <Text>{t('discoverSoftware')}</Text>
        </Center>
      </Button>
      <Button mt={5} mr={5} colorScheme="orange" onClick={async () => { await open(SocialLinks.urls.wiki); }} leftIcon={<SiWikipedia />}>
        <Center>
          <Text>{t('readWiki')}</Text>
        </Center>
      </Button>
      <Button mt={5} mr={5} colorScheme="teal" onClick={async () => { await open(SocialLinks.urls.development); }} leftIcon={<SiGit />}>
        <Center>
          <Text>{t('contribute')}</Text>
        </Center>
      </Button>
      <Button mt={5} mr={5} colorScheme="telegram" onClick={async () => { await open(SocialLinks.urls.telegram); }} leftIcon={<SiTelegram />}>
        <Center>
          <Text>{t('telegram')}</Text>
        </Center>
      </Button>
      <Button mt={5} mr={5} colorScheme="facebook" onClick={async () => { await open(SocialLinks.urls.facebook); }} leftIcon={<FiFacebook />}>
        <Center>
          <Text>{t('facebook')}</Text>
        </Center>
      </Button>
      <Button mt={5} mr={5} colorScheme="twitter" onClick={async () => { await open(SocialLinks.urls.twitter); }} leftIcon={<FiTwitter />}>
        <Center>
          <Text>{t('twitter')}</Text>
        </Center>
      </Button>
      <Button mt={5} mr={5} colorScheme="red" onClick={async () => { await open(SocialLinks.urls.reddit); }} leftIcon={<SiReddit />}>
        <Center>
          <Text>{t('reddit')}</Text>
        </Center>
      </Button>
      <Button mt={5} mr={5} colorScheme="cyan" onClick={async () => { await open(SocialLinks.urls.mailing); }} leftIcon={<FiMail />}>
        <Center>
          <Text>{t('joinMail')}</Text>
        </Center>
      </Button>
      <Button mt={5} mr={5} colorScheme="green" onClick={async () => { await open(SocialLinks.urls.donate); }} leftIcon={<BiDonateHeart />}>
        <Center>
          <Text>{t('donate')}</Text>
        </Center>
      </Button>

      <Button mt={5} mr={5} onClick={() => onReset()}>
        {t('returnFirstStep')}
      </Button>

    </Container>
  );
};
export default ResultComponent;
