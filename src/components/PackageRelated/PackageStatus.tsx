import {
  IconButton,
  useToast,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiInstallLine, RiCheckLine } from 'react-icons/ri';
import { Command } from '@tauri-apps/api/shell';

interface PackageStatusProps {
    isInstalled:boolean,
    catId:string,
    pkId:string,
    pkgName:string,
  }
const PackageStatus: React.FC<PackageStatusProps> = (props) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<Map<string, boolean>>();
  const installPackageWithName = async (
    catId:string,
    pkId:string,
    pkgName:string,
  ) => {
    setIsLoading(new Map(isLoading?.set(pkId, true)));
    const cmd = new Command('pamac', ['install', '--no-confirm', '--no-upgrade', pkgName]);
    const cmdResult = await cmd.execute();

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
      const desc = cmdResult.stdout.replaceAll('"', '').replaceAll('\\u{a0}', ' ').split('\\n').map((item, index) => (
        <span>
          {item}
          <br />
        </span>
      ));
      const colDesc = (
        <Text noOfLines={[1, 2, 3]}>
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
  };
  const {
    isInstalled, catId, pkId, pkgName,
  } = props;
  return (
    <div>
      {isInstalled ? (
        <IconButton aria-label="installed" disabled icon={<RiCheckLine />} colorScheme="gray" variant="solid" />
      ) : (
        <IconButton aria-label="install" icon={<RiInstallLine />} isLoading={isLoading?.get(pkId) || false} onClick={() => installPackageWithName(catId, pkId, pkgName)} colorScheme="green" variant="solid" />
      )}

    </div>
  );
};

export default PackageStatus;
