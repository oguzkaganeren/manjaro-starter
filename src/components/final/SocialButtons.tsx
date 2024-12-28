import React from 'react';
import {
  Text,
  Button,
  Center,
} from '@chakra-ui/react';
import { open } from '@tauri-apps/plugin-shell';

import {
  FiTwitter, FiPackage, FiMail, FiFacebook,
} from 'react-icons/fi';
import {
  SiDiscourse,
  SiWikipedia,
  SiGit,
  SiTelegram,
  SiReddit,
  SiBlogger,
} from 'react-icons/si';
import { BiDonateHeart } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-named-default
import { default as SocialDetails } from '../../assets/SocialUrls.json';

interface socialProps {
  url: string;
  icon: any;
  text: string;
  color: string;
}
const icons:any = {
  FiTwitter: <FiTwitter />,
  SiDiscourse: <SiDiscourse />,
  SiWikipedia: <SiWikipedia />,
  SiGit: <SiGit />,
  SiTelegram: <SiTelegram />,
  SiReddit: <SiReddit />,
  SiBlogger: <SiBlogger />,
  FiPackage: <FiPackage />,
  FiMail: <FiMail />,
  FiFacebook: <FiFacebook />,
  BiDonateHeart: <BiDonateHeart />,
};
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
      shadow="md"
    >
      <Center>
        <Text>{t(text)}</Text>
      </Center>
    </Button>
  );
};
const SocialButtons = () => (
  <>
    {SocialDetails.detail.map((det) => (
      <SocialIcon
        url={det.url}
        icon={icons[det.icon]}
        text={det.text}
        color={det.color}
      />
    ))}
  </>
);

export default SocialButtons;
