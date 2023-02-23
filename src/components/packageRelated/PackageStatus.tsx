import {
  Button,
  ButtonGroup,
  IconButton,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiInstallLine, RiCheckLine } from 'react-icons/ri';
import { Command } from '@tauri-apps/api/shell';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import { info, error } from 'tauri-plugin-log-api';
import { CloseIcon } from '@chakra-ui/icons';
import {
  packageState,
} from '../../stores/PackageStore';
import { connectionState } from '../../stores/ConnectionStore';
import commandState from '../../stores/CommandStore';
import commands from '../../assets/Commands';
import ConfirmPopComponent from '../common/ConfirmPopComponent';
import useToastCustom from '../../hooks/useToastCustom';

interface PackageStatusProps {
    isInstalled:boolean,
    catId:string,
    pkId:string,
    pkgName:string,
  }
const PackageStatus: React.FC<PackageStatusProps> = (props) => {
  const { callPackageWarning } = useToastCustom();
  const { t } = useTranslation();
  const isOnline = useRecoilValue(connectionState);
  const [commandHistory, setCommandHistory] = useRecoilState(commandState);
  const [packageSt, setPackageSt] = useRecoilState(packageState);
  const [isLoadingPackage, setIsLoadingPackage] = useState<Map<string, boolean>>(new Map());

  const packageInstallStatusControl = async (catId:string, pkId:string) => {
    const pack = packageSt.get(catId)?.packages.get(pkId);
    const pkName = pack?.pkg || '';
    const cmdVersion = new Command(commands.getPacman.program, ['-Q', pkName]);
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

  const cancelInstall = async (
    catId:string,
    pkId:string,
  ) => {
    const pack = packageSt.get(catId)?.packages.get(pkId);
    if (pack?.process) {
      pack.process.kill();
      setIsLoadingPackage(new Map(isLoadingPackage?.set(pkId, false)));
      packageInstallStatusControl(catId, pkId);
    }
  };
  const installPackageWithName = async (
    catId:string,
    pkId:string,
    pkgName:string,
  ) => {
    setIsLoadingPackage(new Map(isLoadingPackage?.set(pkId, true)));
    setCommandHistory(
      [ // with a new array
        ...commandHistory, // that contains all the old items
        `pamac install --no-confirm --no-upgrade ${pkgName}`, // and one new item at the end
      ],
    );
    const cmd = new Command(commands.getPamac.program, [
      'install',
      '--no-confirm',
      '--no-upgrade',
      pkgName,
    ]);
    cmd.on('close', (data) => {
      info(`command finished with code ${data.code} and signal ${data.signal}`);
      if (isLoadingPackage.get(pkId)) {
        const isThereError = data.code === 1;
        callPackageWarning(
          isThereError ? t('installError') : t('installSuccess'),
          pkgName,
          isThereError,
        );
        setIsLoadingPackage(new Map(isLoadingPackage?.set(pkId, false)));
      }
      packageInstallStatusControl(catId, pkId);
    });
    cmd.on('error', (errorst) => {
      error(errorst);
    });
    cmd.stdout.on('data', (line) => {
      info(`command stdout: "${line}"`);
    });
    cmd.stderr.on('data', (line) => {
      error(`command stderr: "${line}"`);
    });
    const child = await cmd.spawn();
    const pack = packageSt.get(catId)?.packages.get(pkId);
    const cat = packageSt.get(catId);
    if (pack) {
      pack.process = child;
      cat?.packages.set(pkId, pack);
      if (cat) {
        setPackageSt(new Map(packageSt.set(catId, cat)));
      }
    }
    info(`pid:${child.pid}`);
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
          isDisabled
          leftIcon={<RiCheckLine />}
          colorScheme="gray"
        >
          {t('installed')}
        </Button>
      ) : (
        <ButtonGroup size="sm" isAttached variant="ghost">
          <ConfirmPopComponent
            confirmationDesc="confirmDesc"
            handleClick={() => installPackageWithName(catId, pkId, pkgName)}
            isButtonDisabled={isLoadingPackage?.get(pkId) || !isOnline}
            commands={[
              (
                [
                  commands.getPamac.program,
                  'install',
                  '--no-confirm',
                  '--no-update',
                  pkgName,
                ] as Array<string>
              )
                .map((text) => `${text}`)
                .join(' '),
            ]}
          >
            <Button
              aria-label="install"
              flex="1"
              shadow="base"
              isDisabled={!isOnline || isLoadingPackage?.get(pkId)}
              variant="ghost"
              leftIcon={<RiInstallLine />}
              isLoading={isLoadingPackage?.get(pkId) || false}
              colorScheme="green"
            >
              {t('install')}
            </Button>
          </ConfirmPopComponent>
          {isLoadingPackage?.get(pkId) && (
            <IconButton
              aria-label="Cancel"
              icon={<CloseIcon />}
              onClick={() => cancelInstall(catId, pkId)}
            />
          )}
        </ButtonGroup>
      )}
    </div>
  );
};

export default PackageStatus;
