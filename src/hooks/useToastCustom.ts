import { useToast } from '@chakra-ui/react';
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
import { capitalize } from 'lodash';

export default function useToastCustom() {
  const toast = useToast();

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
  async function callWarningToast(isSuccess:boolean, msg: string) {
    pushNotification(msg);
    toast({
      title: '',
      description: msg,
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
