import { Button, Stat, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/api/shell';

const ManjaroSettingsModule: React.FC = (props) => {
  const { t } = useTranslation();
  const openManjaroSettingsManager = async (moduleName:string) => {
    const cmd = new Command('manjaro-settings-manager', ['-m', `msm_${moduleName}`]);
    cmd.execute();
  };

  return (
    <>
      <Stat
        px={{ base: 2, md: 4 }}
        py="5"
        shadow="xl"
        size="sm"
        border="1px solid"
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded="lg"
      >
        <Button
          width="100%"
          onClick={() => {
            openManjaroSettingsManager('mhwd');
          }}
        >
          {t('installDrivers')}
        </Button>
      </Stat>
      <Stat
        px={{ base: 2, md: 4 }}
        py="5"
        shadow="xl"
        size="sm"
        border="1px solid"
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded="lg"
      >
        <Button
          width="100%"
          onClick={() => {
            openManjaroSettingsManager('timedate');
          }}
        >
          {t('setDateTime')}
        </Button>
      </Stat>
      <Stat
        px={{ base: 2, md: 4 }}
        py="5"
        shadow="xl"
        size="sm"
        border="1px solid"
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded="lg"
      >
        <Button
          width="100%"
          onClick={() => {
            openManjaroSettingsManager('language_packages');
          }}
        >
          {t('languagePackages')}
        </Button>
      </Stat>
      <Stat
        px={{ base: 2, md: 4 }}
        py="5"
        shadow="xl"
        size="sm"
        border="1px solid"
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded="lg"
      >
        <Button
          width="100%"
          onClick={async () => {
            new Command('manjaro-settings-manager').execute();
          }}
        >
          {t('moreSettings')}
        </Button>
      </Stat>
    </>
  );
};
export default ManjaroSettingsModule;
