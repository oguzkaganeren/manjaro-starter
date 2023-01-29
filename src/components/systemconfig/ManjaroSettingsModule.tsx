import { Button, Stat, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/api/shell';

const ManjaroSettingsModule: React.FC = () => {
  const { t } = useTranslation();
  const modules = ['mhwd', 'timedate', 'language_packages'];
  const borderColor = useColorModeValue('gray.800', 'gray.500');
  const languageText = ['installDrivers', 'setDateTime', 'languagePackages'];
  const openManjaroSettingsManager = async (moduleName:string) => {
    const cmd = new Command('manjaro-settings-manager', ['-m', `msm_${moduleName}`]);
    cmd.execute();
  };

  return (
    <>
      {modules.map((module, index) => (
        <Stat
          px={{ base: 2, md: 4 }}
          py="5"
          shadow="xl"
          size="sm"
          border="1px solid"
          borderColor={borderColor}
          rounded="lg"
        >
          <Button
            width="100%"
            onClick={() => {
              openManjaroSettingsManager(module);
            }}
          >
            {t(languageText[index])}
          </Button>
        </Stat>
      ))}

      <Stat
        px={{ base: 2, md: 4 }}
        py="5"
        shadow="xl"
        size="sm"
        border="1px solid"
        borderColor={borderColor}
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
