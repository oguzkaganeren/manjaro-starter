import {
  Switch, HStack, Spacer,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { resolveResource, configDir } from '@tauri-apps/api/path';
import { copyFile, removeFile } from '@tauri-apps/api/fs';
import store from 'store/storages/localStorage';
import { info } from 'tauri-plugin-log-api';

const StartLaunch = (): JSX.Element => {
  const { t } = useTranslation();
  const [launch, setLaunch] = useState(false);
  const handleLaunchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLaunch(event.target.checked);
    const configDirPath = await configDir();
    if (event.target.checked) {
      // localdata set
      store.write('launchStart', 'true');
      const resourcePath = await resolveResource('resources/manjaro-starter.desktop');
      info(`${resourcePath} copy to ${configDirPath}autostart/manjaro-starter.desktop`);
      copyFile(resourcePath, `${configDirPath}autostart/manjaro-starter.desktop`);
    } else {
      // localdata set
      store.write('launchStart', 'false');
      info(`${configDirPath}autostart/manjaro-starter.desktop removed if it exists`);
      removeFile(`${configDirPath}autostart/manjaro-starter.desktop`);
    }
  };

  useEffect(() => {
    const getLocalData = () => {
      const val = store.read('launchStart');
      if (val) {
        setLaunch(val === 'true');
      } else {
        store.write('launchStart', 'false');
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
