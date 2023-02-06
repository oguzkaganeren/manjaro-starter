import { Button } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { connectionState } from '../../../../stores/ConnectionStore';
import useFastestMirrorHook from './useFastestMirrorHook';
import ConfirmPopComponent from '../../../common/ConfirmPopComponent';

const FastestMirrorComponent: React.FC = () => {
  const { t } = useTranslation();
  const isOnline = useRecoilValue(connectionState);
  const { callFastestMirrorCommand, isProcessing } = useFastestMirrorHook();

  return (
    <ConfirmPopComponent
      confirmationDesc="confirmDesc"
      handleClick={callFastestMirrorCommand}
      isButtonDisabled={!isOnline || isProcessing}
    >
      <Button
        shadow="base"
        isDisabled={!isOnline || isProcessing}
        isLoading={isProcessing}
      >
        {t('setFastestMirrors')}
      </Button>
    </ConfirmPopComponent>
  );
};
export default FastestMirrorComponent;
