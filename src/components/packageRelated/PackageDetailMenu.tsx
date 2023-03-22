import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Portal,
} from '@chakra-ui/react';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import { t } from 'i18next';
import { useRecoilValue } from 'recoil';
import RemotePackagePopover from '../common/remotePackage/RemotePackagePopover';
import { PackageDetailMenuProps } from './PackageDetailTypes';
import { connectionState } from '../../stores/ConnectionStore';
import ConfirmPopComponent from '../common/ConfirmPopComponent';
import usePackageHook from './usePackageHook';
import commands from '../../assets/Commands';

const PackageDetailMenu: React.FC<PackageDetailMenuProps> = (props:PackageDetailMenuProps) => {
  const {
    installedVersion, pkg, isInstalled, catId, pkId,
  } = props;
  const isOnline = useRecoilValue(connectionState);
  const { installPackage, getPackageLoadingStatus } = usePackageHook();
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <Portal>
        <MenuList>

          {isInstalled && (
          <MenuItem
            display={{
              base: 'inline-flex',
              md: 'none',
            }}
            isDisabled
          >
            {installedVersion}
          </MenuItem>
          )}
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
                  pkg,
                ] as Array<string>
              )
                .map((text) => `${text}`)
                .join(' '),
            ]}
          >
            <MenuItem
              isDisabled={!isOnline || getPackageLoadingStatus(catId, pkId)}
              display={{
                base: 'inline-flex',
                md: 'none',
              }}
              icon={<AddIcon />}
            >
              {t('install')}
            </MenuItem>
          </ConfirmPopComponent>

          {isOnline && <RemotePackagePopover name={pkg} />}
        </MenuList>
      </Portal>
    </Menu>
  );
};
export default PackageDetailMenu;
