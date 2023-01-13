import {
  Container, Heading, Text, Button, Center, Tooltip, IconButton, Spacer,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  SiDiscourse, SiWikipedia, SiGit, SiTelegram, SiReddit, SiBlogger,
} from 'react-icons/si';
import {
  FiPackage, FiMail, FiFacebook, FiTwitter,
} from 'react-icons/fi';
import { GiReturnArrow } from 'react-icons/gi';
import { open } from '@tauri-apps/api/shell';
import { BiDonateHeart } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-named-default
import { default as SocialLinks } from '../assets/SocialUrls.json';
import SearchComponent from '../components/common/search/SearchComponent';

interface FinalProps {
    onReset: () => void;
}
interface socialProps {
  url: string;
  icon: any;
  text:string;
  color:string;
}
const SocialIcon = (props: socialProps) => {
  const {
    url, icon, text, color,
  } = props;
  const { t } = useTranslation();
  return (
    <Button
      mt={2}
      mr={2}
      size="xs"
      colorScheme={color}
      onClick={async () => {
        await open(url);
      }}
      leftIcon={icon}
    >
      <Center>
        <Text>{t(text)}</Text>
      </Center>
    </Button>
  );
};
const FinalScreen: React.FC<FinalProps> = (props) => {
  const { t } = useTranslation();
  const { onReset } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container textAlign="center">
      <CheckCircleIcon boxSize="50px" color="green.500" marginTop={100} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {t('congratulations')}
      </Heading>
      <Text color="gray.500">{t('readyText')}</Text>
      <Spacer mt={5} />
      <SearchComponent isForPackage={false} />
      <SocialIcon
        url={SocialLinks.urls.forum}
        icon={<SiDiscourse />}
        text="postForum"
        color="whatsapp"
      />
      <SocialIcon
        url={SocialLinks.urls.software}
        icon={<FiPackage />}
        text="discoverSoftware"
        color="blue"
      />
      <SocialIcon
        url={SocialLinks.urls.wiki}
        icon={<SiWikipedia />}
        text="readWiki"
        color="orange"
      />
      <SocialIcon
        url={SocialLinks.urls.development}
        icon={<SiGit />}
        text="contribute"
        color="teal"
      />
      <SocialIcon
        url={SocialLinks.urls.telegram}
        icon={<SiTelegram />}
        text="telegram"
        color="telegram"
      />
      <SocialIcon
        url={SocialLinks.urls.facebook}
        icon={<FiFacebook />}
        text="facebook"
        color="facebook"
      />
      <SocialIcon
        url={SocialLinks.urls.twitter}
        icon={<FiTwitter />}
        text="twitter"
        color="twitter"
      />
      <SocialIcon
        url={SocialLinks.urls.reddit}
        icon={<SiReddit />}
        text="reddit"
        color="red"
      />
      <SocialIcon
        url={SocialLinks.urls.blog}
        icon={<SiBlogger />}
        text="blog"
        color="purple"
      />
      <SocialIcon
        url={SocialLinks.urls.mailing}
        icon={<FiMail />}
        text="joinMail"
        color="pink"
      />
      <SocialIcon
        url={SocialLinks.urls.donate}
        icon={<BiDonateHeart />}
        text="donate"
        color="green"
      />

      <Tooltip label={t('returnFirstStep')}>
        <IconButton
          boxSize="50px"
          color="green.500"
          position="fixed"
          bottom={5}
          aria-label={t('returnFirstStep')}
          left={5}
          onClick={() => onReset()}
          icon={<GiReturnArrow />}
        />
      </Tooltip>
    </Container>
  );
};
export default FinalScreen;
