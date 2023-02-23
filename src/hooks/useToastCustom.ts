import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
import { capitalize } from 'lodash';

export default function useToastCustom() {
  const toast = useToast();
  const { t } = useTranslation();
  async function pushNotification(body:string) {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === 'granted';
    }
    if (permissionGranted) {
      sendNotification({ title: 'Manjaro Starter', body });
    }
  }
  async function callWarningToast(isSuccess:boolean) {
    pushNotification(isSuccess ? t('success') : t('failed'));
    toast({
      title: '',
      description: isSuccess ? t('success') : t('failed'),
      status: isSuccess ? 'success' : 'error',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    });
  }
  async function callPackageWarning(msg: string, pkName: string, isError: boolean) {
    pushNotification(`${capitalize(pkName)} ${msg}`);
    toast({
      title: `${capitalize(pkName)}`,
      description: msg,
      status: isError ? 'error' : 'success',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    });
  }
  return { callWarningToast, callPackageWarning };
}
