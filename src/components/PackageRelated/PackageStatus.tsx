import {
  IconButton,
  useToast,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { RiInstallLine, RiCheckLine } from 'react-icons/ri';
import {
  useRecoilCallback,
} from 'recoil';
import _ from 'lodash';
import { Command } from '@tauri-apps/api/shell';
import {
  getPackageStatus, packageState,
} from '../../stores/PackageStore';

interface PackageStatusProps {
    isInstalled:boolean,
    catId:string,
    pkId:string,
    pkgName:string,
  }
const PackageStatus: React.FC<PackageStatusProps> = (props) => {
  const toast = useToast();
  const packageStatusUpdate = useRecoilCallback(({ snapshot, set }) => async (
    catId:string,
    pkId:string,
  ) => {
    const packages = await snapshot.getPromise(packageState);
    const cats = _.cloneDeep(packages);
    const catIndex = cats.findIndex((element) => element.id === catId);
    const pkIndex = cats[catIndex].packages.findIndex((element) => element.id === pkId);
    const updatedPk = cats[catIndex].packages[pkIndex];
    const packageStatus = await snapshot.getPromise(getPackageStatus(updatedPk.pkg));
    updatedPk.isInstalled = packageStatus === 'true';
    set(packageState, (prev) => prev.map((item, index) => {
      if (index !== catIndex) {
        return item;
      }
      return {
        ...item,
        packages: item.packages.map((pk, index2) => (pkIndex !== index2 ? pk : updatedPk)),
      };
    }));
  }, []);
  const installPackageWithName = async (catId:string,
    pkId:string,
    pkgName:string) => {
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
        <>
          <Text noOfLines={[1, 2, 3]}>
            {desc}
          </Text>
        </>
      );
      packageStatusUpdate(catId, pkId);
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
        <IconButton aria-label="install" icon={<RiInstallLine />} onClick={() => installPackageWithName(catId, pkId, pkgName)} colorScheme="green" variant="solid" />
      )}

    </div>
  );
};

export default PackageStatus;
