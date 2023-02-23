import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import commands from '../../../../assets/Commands';
import useToastCustom from '../../../../hooks/useToastCustom';
import commandState from '../../../../stores/CommandStore';
import countryState from '../../../../stores/CountryStore';
import { countryMirrorRunner, getMirrorCountry } from '../MirrorHelper';

export default function useCountryHook() {
  const [countries, setCountries] = useState<string[]>();
  const [checkedItems, setCheckedItems] = useRecoilState(countryState);
  const [isProcessing, setIsProcessing] = useState(false);
  const { callWarningToast } = useToastCustom();
  const [commandHistory, setCommandHistory] = useRecoilState(commandState);

  const countryParam = checkedItems.size === countries?.length
    ? 'all'
    : Array.from(checkedItems.keys())
      .map((text) => `${text}`)
      .join(',');

  const cmdHs = `${(commands.countryMirror.args as Array<string>)
    .map((text) => `${text}`)
    .join(' ')} ${countryParam}`;
  useEffect(() => {
    getMirrorCountry().then((response) => {
      if (response.stdout) {
        const responseRp = ((response.stdout as string)
          .replaceAll('"', '').split('\n')) as string[];
        setCountries(responseRp);
      }
    });
  }, []);
  const callCountryMirrorCommand = async () => {
    setIsProcessing(true);
    setCommandHistory([
    // with a new array
      ...commandHistory, // that contains all the old items
      cmdHs,
    ]);
    countryMirrorRunner(countryParam).then((result) => {
      const isSuccess = result.code === 0;
      callWarningToast(isSuccess);

      setIsProcessing(false);
    });
  };
  return {
    countries, countryParam, callCountryMirrorCommand, isProcessing,
  };
}
