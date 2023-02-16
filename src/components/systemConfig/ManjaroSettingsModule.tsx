import {
  Button, Card,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/api/shell';
import commands from '../../assets/Commands';

const ManjaroSettingsModule: React.FC = () => {
  const { t } = useTranslation();
  const modules = ['mhwd', 'timedate', 'language_packages'];
  const languageText = ['installDrivers', 'setDateTime', 'languagePackages'];
  const openManjaroSettingsManager = async (moduleName:string) => {
    const cmd = new Command(commands.getMSM.program, ['-m', `msm_${moduleName}`]);
    cmd.execute();
  };

  return (
    <>
      {modules.map((module, index) => (
        <Card size="sm">
          <Button
            width="100%"
            height="20"
            variant="ghost"
            onClick={() => {
              openManjaroSettingsManager(module);
            }}
          >
            {t(languageText[index])}
          </Button>
        </Card>
      ))}

      <Card size="sm">
        <Button
          width="100%"
          height="20"
          variant="ghost"
          onClick={async () => {
            new Command(commands.getMSM.program).execute();
          }}
        >
          {t('moreSettings')}
        </Button>
      </Card>
    </>
  );
};
export default ManjaroSettingsModule;
