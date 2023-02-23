import { useToast } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export default function useToastCustom() {
  const toast = useToast();
  const { t } = useTranslation();
  function callWarningToast(isSuccess:boolean) {
    toast({
      title: '',
      description: isSuccess ? t('success') : t('failed'),
      status: isSuccess ? 'success' : 'error',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    });
  }
  function callPackageWarning(msg: string | ReactNode, pkName: string, isError: boolean) {
    toast({
      title: `${pkName}`,
      description: msg,
      status: isError ? 'error' : 'success',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    });
  }
  return { callWarningToast, callPackageWarning };
}
