import {
  IconButton,
  useToast,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiInstallLine, RiCheckLine } from 'react-icons/ri';
import { Command } from '@tauri-apps/api/shell';
import { useRecoilState } from 'recoil';
import { info, error } from 'tauri-plugin-log-api';

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

    if (cmdResult.stderr) {
      toast({
        title: `${pkgName}`,
        description: cmdResult.stderr,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
    } else {
      const desc = cmdResult.stdout.replaceAll('"', '').replaceAll('\\u{a0}', ' ').split('\\n').map((item) => (
        <span>
          {item}
          <br />
        </span>
      ));
      const colDesc = (
        <Text>
          {desc}
        </Text>
      );
      toast({
        title: `${pkgName}`,
        description: colDesc,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
    packageInstallStatusControl(catId, pkId);
  };
  const {
    isInstalled, catId, pkId, pkgName,
  } = props;
  return (
    <div>
      {isInstalled ? (
        <IconButton aria-label="installed" disabled icon={<RiCheckLine />} colorScheme="gray" variant="solid" />
      ) : (
        <Tooltip label="Install package">
          <IconButton aria-label="install" icon={<RiInstallLine />} isLoading={isLoadingPackage?.get(pkId) || false} onClick={() => installPackageWithName(catId, pkId, pkgName)} colorScheme="green" variant="solid" />
        </Tooltip>
      )}

    </div>
  );
};

export default PackageStatus;
