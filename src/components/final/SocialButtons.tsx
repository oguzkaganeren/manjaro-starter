import React from 'react';
import { open } from '@tauri-apps/api/shell';

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

import { Button } from 'react-daisyui';
// eslint-disable-next-line import/no-named-default
import { default as SocialDetails } from '../../assets/SocialUrls.json';

interface socialProps {
  url: string;
  icon: any;
  text: string;
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
    url, icon, text,
  } = props;
  const { t } = useTranslation();
  return (
    <Button
      size="sm"
      onClick={async () => {
        await open(url);
      }}
      startIcon={icon}
    >
      {t(text)}
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
      />
    ))}
  </>
);

export default SocialButtons;
