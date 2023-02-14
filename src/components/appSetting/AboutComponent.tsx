import {
  SiGit, SiMonkeytie,
} from 'react-icons/si';
import { open } from '@tauri-apps/api/shell';
import { useTranslation } from 'react-i18next';
import {
  Stats, Avatar, Button,
} from 'react-daisyui';
import logo from '../../assets/icon.png';
import packageJson from '../../../package.json';
import Changelog from './Changelog';
import BugReport from './BugReport';
import SendFeedback from './SendFeedback';

const AboutComponent = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Stats className="w-full bg-base-200 shadow mt-5 font-sans">
      <Stats.Stat>
        <Stats.Stat.Item variant="title">{t('manjaroStarter')}</Stats.Stat.Item>
        <Stats.Stat.Item variant="value">{packageJson.version}</Stats.Stat.Item>
        <Stats.Stat.Item variant="figure" className="text-secondary">
          <Avatar size="sm" src={logo} shape="circle" />
        </Stats.Stat.Item>
      </Stats.Stat>
      <Stats.Stat>
        <Changelog />
        <BugReport />
        <SendFeedback />
        <Button
          size="xs"
          onClick={async () => {
            await open('https://github.com/oguzkaganeren/manjaro-starter');
          }}
          startIcon={<SiGit />}
          className="mt-2"
        >
          {t('projectGithubPage')}
        </Button>
        <Button
          size="xs"
          onClick={async () => {
            await open(
              'https://github.com/oguzkaganeren/manjaro-starter/blob/master/LICENSE.md',
            );
          }}
          startIcon={<SiMonkeytie />}
          className="mt-2"
        >
          {t('gnu')}
        </Button>
      </Stats.Stat>
    </Stats>
  );
};

export default AboutComponent;
