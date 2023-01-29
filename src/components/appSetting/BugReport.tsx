import React from 'react';
import {
  Button,
} from '@chakra-ui/react';
import { open } from '@tauri-apps/api/shell';
import { useTranslation } from 'react-i18next';
import { BiBug } from 'react-icons/bi';

const BugReport = () => {
  const { t } = useTranslation();
  return (
    <Button
      size="xs"
      colorScheme="red"
      leftIcon={<BiBug />}
      onClick={async () => {
        await open(
          'https://github.com/oguzkaganeren/manjaro-starter/issues/new?assignees=&labels=&template=bug_report.md&title=',
        );
      }}
    >
      {t('bugReport')}
    </Button>
  );
};

export default BugReport;
