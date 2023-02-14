import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { resolveResource, configDir } from '@tauri-apps/api/path';
import { copyFile, removeFile, exists } from '@tauri-apps/api/fs';
import { info } from 'tauri-plugin-log-api';
import { Toggle, Form } from 'react-daisyui';

const StartLaunch = (): JSX.Element => {
  const { t } = useTranslation();
  const [launch, setLaunch] = useState(false);
  const handleLaunchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLaunch(event.target.checked);
    const configDirPath = await configDir();
    if (event.target.checked) {
      const resourcePath = await resolveResource('resources/manjaro-starter.desktop');
      info(`${resourcePath} copy to ${configDirPath}autostart/manjaro-starter.desktop`);
      copyFile(resourcePath, `${configDirPath}autostart/manjaro-starter.desktop`);
    } else {
      info(`${configDirPath}autostart/manjaro-starter.desktop removed if it exists`);
      removeFile(`${configDirPath}autostart/manjaro-starter.desktop`);
    }
  };

  useEffect(() => {
    const getLocalData = async () => {
      const configDirPath = await configDir();
      if (await exists(`${configDirPath}autostart/manjaro-starter.desktop`) as unknown as boolean) {
        setLaunch(true);
      }
    };
    getLocalData();
  }, []);
  return (
    <Form className="bg-base-200 p-4 mt-5 rounded-lg shadow">
      <Form.Label title={t('launchStart') ?? ''}>
        <Toggle
          checked={launch}
          size="sm"
          color="success"
          onChange={handleLaunchChange}
          id="launch-start"
        />
      </Form.Label>
    </Form>
  );
};

export default StartLaunch;
