import { useToast, Button } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { connectionState } from '../../../../stores/ConnectionStore';
import useFastestMirrorHook from './useFastestMirrorHook';
import { mirrorState } from '../../../../stores/FastestMirrorStore';
import ConfirmPopComponent from '../../../common/ConfirmPopComponent';

const FastestMirrorComponent: React.FC = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const isOnline = useRecoilValue(connectionState);
  const [mirrorConf, setMirrorConf] = useRecoilState(mirrorState);
  const { callFastestMirrorCommand } = useFastestMirrorHook();
  const handleClick = async () => {
    callFastestMirrorCommand().then((result) => {
      const isSuccess = result.code === 0;
      toast({
        title: '',
        description: isSuccess ? t('success') : t('failed'),
        status: isSuccess ? 'success' : 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
      setMirrorConf({ isProcessing: false });
    });
  };

  return (
    <ConfirmPopComponent
      confirmationDesc="confirmDesc"
      handleClick={handleClick}
      isButtonDisabled={!isOnline || mirrorConf.isProcessing}
    >
      <Button
        shadow="base"
        isDisabled={!isOnline || mirrorConf.isProcessing}
        isLoading={mirrorConf.isProcessing}
      >
        {t('setFastestMirrors')}
      </Button>
    </ConfirmPopComponent>
  );
};
export default FastestMirrorComponent;
