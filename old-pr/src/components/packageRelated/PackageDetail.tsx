import React from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Command } from '@tauri-apps/plugin-shell';
import DOMPurify from 'dompurify';
import { AtSignIcon } from '@chakra-ui/icons';
import { useRecoilValue } from 'recoil';
import PackageStatus from './PackageStatus';
import commands from '../../assets/Commands';
import RemotePackagePopover from '../common/remotePackage/RemotePackagePopover';
import { connectionState } from '../../stores/ConnectionStore';
import { PackageDetailProps } from './PackageDetailTypes';
import usePkIconHook from './usePkIconHook';

function header(
  iconSrc: string,
  pkg: string,
  title: string,
  installedVersion: string,
  isOnline: boolean,
) {
  return (
    <CardHeader>
      <Flex>
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          {iconSrc && iconSrc !== 'Unable to read file' ? (
            <div
            // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(iconSrc),
              }}
            />
          ) : (
            <AtSignIcon />
          )}

          <Box>
            <Heading size="sm">
              <Button
                variant="link"
                whiteSpace="initial"
                size="sm"
                maxW={{
                  sm: '10em',
                  md: '10em',
                  lg: '24em',
                  xl: '20em',
                  '2xl': '80em',
                }}
                onClick={() => {
                  const cmd = Command.create(commands.getPamacManager.program, [
                    `--details=${pkg}`,
                  ]);
                  cmd.execute();
                }}
              >
                {title}
              </Button>
            </Heading>
            <Text
              display={{
                base: 'none',
                md: 'inline-flex',
              }}
              fontSize="xs"
            >
              {installedVersion}

            </Text>
          </Box>
        </Flex>
        {isOnline && <RemotePackagePopover name={pkg} />}
      </Flex>
    </CardHeader>
  );
}

const PackageDetail: React.FC<PackageDetailProps> = (props) => {
  const {
    icon, title, catId, uniqueId, pkg, isInstalled, installedVersion, children,
  } = props;
  const iconSrc = usePkIconHook(icon);
  const isOnline = useRecoilValue(connectionState);

  return (
    <Card minH={['none', 'none', '2xs', '2xs']} variant="filled">
      {header(iconSrc, pkg, title, installedVersion, isOnline)}

      <CardBody display={{
        base: 'none',
        md: 'inline-flex',
      }}
      >
        <Text fontSize="sm">{children}</Text>
      </CardBody>

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
      >
        <PackageStatus
          catId={catId}
          pkId={uniqueId}
          pkgName={pkg}
          isInstalled={isInstalled}
        />
      </CardFooter>
    </Card>
  );
};
export default PackageDetail;
