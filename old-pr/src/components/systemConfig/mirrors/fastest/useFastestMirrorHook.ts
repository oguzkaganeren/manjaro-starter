import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import commands from '../../../../assets/Commands';
import useToastCustom from '../../../../hooks/useToastCustom';
import commandState from '../../../../stores/CommandStore';
import fastestMirrorRunner from '../MirrorHelper';

export default function useFastestMirrorHook() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { callWarningToast } = useToastCustom();
  const { t } = useTranslation();
  const [commandHistory, setCommandHistory] = useRecoilState(commandState);
  const callFastestMirrorCommand = async () => {
    setIsProcessing(true);
    setCommandHistory([
    // with a new array
      ...commandHistory, // that contains all the old items
      (commands.fastestMirror.args as Array<string>).map((text) => `${text}`).join(' '), // and one new item at the end
    ]);
    fastestMirrorRunner().then((result) => {
      const isSuccess = result.code === 0;
      const msg = isSuccess ? t('fastestMirrorSuccess') : t('fastestMirrorFail');
      callWarningToast(isSuccess, msg);
      setIsProcessing(false);
    });
  };

  return { callFastestMirrorCommand, isProcessing };
}
