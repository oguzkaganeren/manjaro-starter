import {
  Switch,
  HStack,
  Spacer,
  FormControl,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { resolveResource, configDir } from '@tauri-apps/api/path';
import { copyFile, removeFile, exists } from '@tauri-apps/api/fs';
import { info } from 'tauri-plugin-log-api';

const StartLaunch = (): JSX.Element => {
  const { t } = useTranslation();
  const [launch, setLaunch] = useState(false);
  const bColor = useColorModeValue('gray.800', 'gray.500');
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
    <FormControl
      px={{ base: 2, md: 4 }}
      py="5"
      mt={5}
      shadow="xl"
      border="1px solid"
      borderColor={bColor}
      rounded="lg"
    >
      <HStack>
        <span>{t('launchStart')}</span>
        <Spacer />
        <Switch
          isChecked={launch}
          onChange={handleLaunchChange}
          id="launch-start"
        />
      </HStack>
    </FormControl>
  );
};

export default StartLaunch;
