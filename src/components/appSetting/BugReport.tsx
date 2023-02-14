import React from 'react';
import { open } from '@tauri-apps/api/shell';
import { useTranslation } from 'react-i18next';
import { BiBug } from 'react-icons/bi';
import { Button } from 'react-daisyui';

const BugReport = () => {
  const { t } = useTranslation();
  return (
    <Button
      size="xs"
      fullWidth
      startIcon={<BiBug />}
      className="mt-2"
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
