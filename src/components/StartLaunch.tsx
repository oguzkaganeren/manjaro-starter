import {
  Switch, FormControl, FormLabel, HStack, Spacer,
} from '@chakra-ui/react';
import React, { Suspense, useEffect, useState } from 'react';
import { forage } from '@tauri-apps/tauri-forage';
import { useTranslation } from 'react-i18next';
import { resolveResource, configDir } from '@tauri-apps/api/path';
import { copyFile, removeFile } from '@tauri-apps/api/fs';

const StartLaunch = (): JSX.Element => {
  const { t } = useTranslation();
  const [launch, setLaunch] = useState(false);
  const handleLaunchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLaunch(event.target.checked);
    const configDirPath = await configDir();
    if (event.target.checked) {
      // localdata set
      forage.setItem({
        key: 'launchStart',
        value: 'true',
      })();
      // copy desktop file to autostart folder
      const resourcePath = await resolveResource('resources/manjaro-starter.desktop');
      await copyFile(resourcePath, `${configDirPath}autostart/manjaro-starter.desktop`);
    } else {
      // localdata set
      forage.setItem({
        key: 'launchStart',
        value: 'false',
      })();
      // remove desktop file from autostart folder
      await removeFile(`${configDirPath}autostart/manjaro-starter.desktop`);
    }
  };

  useEffect(() => {
    const getLocalData = async () => {
      const launchStart = await forage.getItem({ key: 'launchStart' })();
      if (launchStart) {
        setLaunch(launchStart === 'true');
      } else {
        forage.setItem({
          key: 'launchStart',
          value: 'false',
        })();
      }
    };
    getLocalData();
  }, []);
  return (
    <HStack>
      <span>
        {t('launchStart')}
      </span>
      <Spacer />
      <Switch isChecked={launch} onChange={handleLaunchChange} id="launch-start" />
    </HStack>
  );
};

export default StartLaunch;
