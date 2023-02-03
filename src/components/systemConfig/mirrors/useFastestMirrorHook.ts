import { useRecoilState } from 'recoil';
import commands from '../../../assets/Commands';
import commandState from '../../../stores/CommandStore';
import { mirrorState } from '../../../stores/FastestMirrorStore';
import fastestMirrorRunner from './MirrorHelper';

export default function useFastestMirrorHook(country:string) {
  const [mirrorConf, setMirrorConf] = useRecoilState(mirrorState);
  const [commandHistory, setCommandHistory] = useRecoilState(commandState);
  const callFastestMirrorCommand = async () => {
    setMirrorConf({ isProcessing: true });
    setCommandHistory([
    // with a new array
      ...commandHistory, // that contains all the old items
      (commands.fastestMirror.args as Array<string>).map((text) => `${text}`).join(' '), // and one new item at the end
    ]);
    return fastestMirrorRunner();
  };

  return { callFastestMirrorCommand };
}
