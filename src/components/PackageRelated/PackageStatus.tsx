import {
  useToast, Text, Tooltip, Button,
} from '@chakra-ui/react';
import React, { ReactNode, useState } from 'react';
import { RiInstallLine, RiCheckLine } from 'react-icons/ri';
import { Command } from '@tauri-apps/api/shell';
import { useRecoilState } from 'recoil';
import { info, error } from 'tauri-plugin-log-api';
import { useTranslation } from 'react-i18next';
import {
  packageState,
} from '../../stores/PackageStore';

interface PackageStatusProps {
    isInstalled:boolean,
    catId:string,
    pkId:string,
    pkgName:string,
  }
const PackageStatus: React.FC<PackageStatusProps> = (props) => {
  const toast = useToast();
  const { t } = useTranslation();
  const [packageSt, setPackageSt] = useRecoilState(packageState);
  const [isLoadingPackage, setIsLoadingPackage] = useState<Map<string, boolean>>(new Map());

  const packageInstallStatusControl = async (catId:string, pkId:string) => {
    const pack = packageSt.get(catId)?.packages.get(pkId);
    const pkName = pack?.pkg || '';
    const cmdVersion = new Command('version-control', ['-Q', pkName]);
    const cmdVersionResult = await cmdVersion.execute();
    if (cmdVersionResult.stdout) {
      const spStd = cmdVersionResult.stdout.split(' ')[1];
      const cat = packageSt.get(catId);
      if (pack) {
        pack.isInstalled = true;
        pack.installedVersion = spStd;
        cat?.packages.set(pkId, pack);
        if (cat) {
          setPackageSt(new Map(packageSt.set(catId, cat)));
        }
      }
    }
  };

  const installPackageWithName = async (
    catId:string,
    pkId:string,
    pkgName:string,
  ) => {
    setIsLoadingPackage(new Map(isLoadingPackage?.set(pkId, true)));
    const cmd = new Command('pamac', ['install', '--no-confirm', '--no-upgrade', pkgName]);
    const cmdResult = await cmd.execute();
    setIsLoadingPackage(new Map(isLoadingPackage?.set(pkId, false)));
    info(cmdResult.stdout);
    error(cmdResult.stderr);
    function showMsg(msg:string | ReactNode, pkName:string, isError:boolean) {
      toast({
        title: `${pkName}`,
        description: msg,
        status: isError ? 'error' : 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
    if (cmdResult.stderr || cmdResult.stdout.toUpperCase().indexOf('ERROR') > 0) {
      const msg = cmdResult.stderr ? cmdResult.stderr : cmdResult.stdout;
      const desc = (
        <Text maxH={200} overflow="scroll">
          {msg}
        </Text>
      );
      showMsg(desc, pkgName, cmdResult.stdout.toUpperCase().indexOf('ERROR') > 0);
    } else {
      const desc = cmdResult.stdout.replaceAll('"', '').replaceAll('\\u{a0}', ' ').split('\\n').map((item) => (
        <span>
          {item}
          <br />
        </span>
      ));
      const colDesc = (
        <Text maxH={200} overflow="scroll">
          {desc}
        </Text>
      );
      showMsg(colDesc, pkgName, true);
    }
    packageInstallStatusControl(catId, pkId);
  };
  const {
    isInstalled, catId, pkId, pkgName,
  } = props;
  return (
    <div>
      {isInstalled ? (
        <Button
          flex="1"
          variant="ghost"
          aria-label="installed"
          disabled
          leftIcon={<RiCheckLine />}
          colorScheme="gray"
        >
          {t('installed')}
        </Button>
      ) : (
        <Tooltip label="Install package">
          <Button
            aria-label="install"
            flex="1"
            variant="ghost"
            leftIcon={<RiInstallLine />}
            isLoading={isLoadingPackage?.get(pkId) || false}
            onClick={() => installPackageWithName(catId, pkId, pkgName)}
            colorScheme="green"
          >
            {t('install')}
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

export default PackageStatus;
