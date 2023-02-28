import {
  Button,
  ButtonGroup,
  IconButton,
} from '@chakra-ui/react';
import React from 'react';
import { RiInstallLine, RiCheckLine } from 'react-icons/ri';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from '@chakra-ui/icons';
import { connectionState } from '../../stores/ConnectionStore';

import commands from '../../assets/Commands';
import ConfirmPopComponent from '../common/ConfirmPopComponent';
import usePackageHook from './usePackageHook';

interface PackageStatusProps {
    isInstalled:boolean,
    catId:string,
    pkId:string,
    pkgName:string,
  }
const PackageStatus: React.FC<PackageStatusProps> = (props) => {
  const { t } = useTranslation();
  const isOnline = useRecoilValue(connectionState);
  const { installPackage, getPackageLoadingStatus, cancelInstall } = usePackageHook();

  const {
    isInstalled, catId, pkId, pkgName,
  } = props;
  return (
    <div>
      {isInstalled ? (
        <Button
          variant="ghost"
          size={['xs', 'xs', 'md', 'md']}
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
            handleClick={() => installPackage(catId, pkId)}
            isButtonDisabled={getPackageLoadingStatus(catId, pkId) || !isOnline}
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
              size={['xs', 'xs', 'md', 'md']}
              shadow="base"
              isDisabled={!isOnline || getPackageLoadingStatus(catId, pkId)}
              variant="ghost"
              leftIcon={<RiInstallLine />}
              isLoading={getPackageLoadingStatus(catId, pkId) || false}
              colorScheme="green"
            >
              {t('install')}
            </Button>
          </ConfirmPopComponent>
          {getPackageLoadingStatus(catId, pkId) && (
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
