import { useState } from 'react';
import { useRecoilState } from 'recoil';
import commands from '../../../../assets/Commands';
import useToastCustom from '../../../../hooks/useToastCustom';
import commandState from '../../../../stores/CommandStore';
import fastestMirrorRunner from '../MirrorHelper';

export default function useFastestMirrorHook() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { callWarningToast } = useToastCustom();
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
      callWarningToast(isSuccess);
      setIsProcessing(false);
    });
  };

  return { callFastestMirrorCommand, isProcessing };
}
