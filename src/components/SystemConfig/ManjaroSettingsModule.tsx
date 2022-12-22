import { Box, Button } from '@chakra-ui/react';
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
      <Box textAlign={{ lg: 'left' }}>

        <Button
          size="md"
          height="48px"
          border="2px"
          borderColor="green.500"
          onClick={() => { openManjaroSettingsManager('mhwd'); }}
        >
          {t('installDrivers')}
        </Button>
      </Box>
      <Box mt={5} textAlign={{ lg: 'left' }}>

        <Button
          size="md"
          height="48px"
          border="2px"
          borderColor="green.500"
          onClick={() => { openManjaroSettingsManager('timedate'); }}
        >
          {t('setDateTime')}
        </Button>
      </Box>
      <Box mt={5} textAlign={{ lg: 'left' }}>

        <Button
          size="md"
          height="48px"
          border="2px"
          borderColor="green.500"
          onClick={() => { openManjaroSettingsManager('language_packages'); }}
        >
          {t('languagePackages')}
        </Button>
        <Button
          height="48px"
          border="2px"
          ml={5}
          borderColor="green.500"
          onClick={async () => {
            new Command('manjaro-settings-manager').execute();
          }}
        >
          {t('moreSettings')}
        </Button>
      </Box>
    </>

  );
};
export default ManjaroSettingsModule;
