import React from 'react';
import {
  Button,
  Box,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { open } from '@tauri-apps/plugin-shell';

const ShowRepoDetails = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Button
        shadow="base"
        onClick={async () => {
          await open('https://repo.manjaro.org/');
        }}
      >
        {t('statusOfMirrors')}
      </Button>
    </Box>
  );
};
export default ShowRepoDetails;
