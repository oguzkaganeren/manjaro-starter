import { Child } from '@tauri-apps/plugin-shell';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import useToastCustom from '../../hooks/useToastCustom';
import commandState from '../../stores/CommandStore';
import {
  Package,
  packageState,
} from '../../stores/PackageStore';
import callPackageQuery, { callPackageInstall } from './PackageHelper';

export default function usePackageHook() {
  const { callPackageWarning } = useToastCustom();
  const { t } = useTranslation();
  const [commandHistory, setCommandHistory] = useRecoilState(commandState);
  const [packageSt, setPackageSt] = useRecoilState(packageState);
  const getPackageLoadingStatus = (catId:string, pkId:string) => packageSt.get(catId)?.packages.get(pkId)?.isLoading;

  const checkInstalledPackage = (catId:string, pkId:string) => {
    const pk = packageSt.get(catId)?.packages.get(pkId);
    if (pk) {
      callPackageQuery(pk?.pkg).then((response) => {
        if (response.stdout) {
          const spStd = response.stdout.split(' ')[1];
          const cat = packageSt.get(catId);
          pk.isInstalled = true;
          pk.installedVersion = spStd;
          cat?.packages.set(pkId, pk);
          if (cat) {
            setPackageSt(new Map(packageSt.set(catId, cat)));
          }
        }
      });
    }
  };
  function setProcessToPkStore(catId: string, pkId: string, child:Child) {
    const pack = packageSt.get(catId)?.packages.get(pkId);
    const cat = packageSt.get(catId);
    if (pack) {
      pack.process = child;
      cat?.packages.set(pkId, pack);
      if (cat) {
        setPackageSt(new Map(packageSt.set(catId, cat)));
      }
    }
  }

  function setPackageLoading(catId: string, pkId: string, pk: Package, status:boolean) {
    const cat = packageSt.get(catId);
    const pkg = pk;
    pkg.isLoading = status;
    cat?.packages.set(pkId, pkg);

    if (cat) {
      setPackageSt(new Map(packageSt.set(catId, cat)));
    }
  }

  const cancelInstall = async (catId:string, pkId:string) => {
    const pk = packageSt.get(catId)?.packages.get(pkId);
    if (pk?.process) {
      pk.process.kill();
      setPackageLoading(catId, pkId, pk, false);
      checkInstalledPackage(catId, pkId);
    }
  };

  const installPackage = async (
    catId:string,
    pkId:string,
  ) => {
    const pk = packageSt.get(catId)?.packages.get(pkId);
    if (pk) {
      setPackageLoading(catId, pkId, pk, true);
      setCommandHistory(
        [ // with a new array
          ...commandHistory, // that contains all the old items
          `pamac install --no-confirm --no-upgrade ${pk.pkg}`, // and one new item at the end
        ],
      );
      const cmd = (await callPackageInstall(pk.pkg));
      cmd.on('close', (data) => {
        setPackageLoading(catId, pkId, pk, false);
        const isThereError = data.code === 1;
        callPackageWarning(
          isThereError ? t('installError') : t('installSuccess'),
          pk.pkg,
          isThereError,
        );
        checkInstalledPackage(catId, pkId);
      });
      const child = await cmd.spawn();
      setProcessToPkStore(catId, pkId, child);
    }
  };

  return {
    checkInstalledPackage, cancelInstall, installPackage, getPackageLoadingStatus,
  };
}
