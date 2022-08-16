import {
  Box,
  Button,
  useColorModeValue,
  chakra,
  SimpleGrid,
} from '@chakra-ui/react';
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
    <SimpleGrid
      columns={{
        base: 1,
        sm: 2,
        md: 3,
        lg: 4,
      }}
      spacingX={{
        base: 10,
        lg: 24,
      }}
      spacingY={10}
    >
      <Box mt={5} textAlign={{ lg: 'left' }}>

        <chakra.p
          mt={2}
          fontSize={{ base: '3xl', sm: '3xl' }}
          lineHeight="8"
          fontWeight="extrabold"
          letterSpacing="tight"
          color={useColorModeValue('white.900', 'white.100')}
        >
          {t('installDrivers')}
        </chakra.p>

        <Button
          size="md"
          height="48px"
          width="200px"
          border="2px"
          mt={5}
          borderColor="green.500"
          onClick={() => { openManjaroSettingsManager('mhwd'); }}
        >
          {t('installDrivers')}
        </Button>
      </Box>
      <Box mt={5} textAlign={{ lg: 'left' }}>
        <chakra.p
          mt={2}
          fontSize={{ base: '3xl', sm: '3xl' }}
          lineHeight="8"
          fontWeight="extrabold"
          letterSpacing="tight"
          color={useColorModeValue('white.900', 'white.100')}
        >
          {t('setDateTime')}
        </chakra.p>

        <Button
          size="md"
          height="48px"
          width="200px"
          border="2px"
          mt={5}
          borderColor="green.500"
          onClick={() => { openManjaroSettingsManager('timedate'); }}
        >
          {t('setDateTime')}
        </Button>
      </Box>
      <Box mt={5} textAlign={{ lg: 'left' }}>
        <chakra.p
          mt={2}
          fontSize={{ base: '3xl', sm: '3xl' }}
          lineHeight="8"
          fontWeight="extrabold"
          letterSpacing="tight"
          color={useColorModeValue('white.900', 'white.100')}
        >
          {t('installLanguage')}
        </chakra.p>

        <Button
          size="md"
          height="48px"
          width="200px"
          border="2px"
          mt={5}
          borderColor="green.500"
          onClick={() => { openManjaroSettingsManager('language_packages'); }}
        >
          {t('languagePackages')}
        </Button>
      </Box>
    </SimpleGrid>

  );
};
export default ManjaroSettingsModule;
