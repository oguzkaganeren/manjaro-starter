import {
  TagLabel,
  chakra,
  TagLeftIcon,
  Tag,
  IconButton,
  Tooltip,
  Card,
  Divider,
  CardBody,
  CardFooter,
  Spinner,
  Wrap,
} from '@chakra-ui/react';
import React from 'react';
import { FaLinux } from 'react-icons/fa';
import { RiInstallLine } from 'react-icons/ri';
import { MdOutlineDownloadDone } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { connectionState } from '../../../stores/ConnectionStore';
import ConfirmPopComponent from '../../common/ConfirmPopComponent';
import useKernelHook from './useKernelHook';

const KernelComponent: React.FC = () => {
  const isOnline = useRecoilValue(connectionState);
  const { kernelList, installKernel, isLoadingKernel } = useKernelHook();
  const { t } = useTranslation();

  return (
    <Card minH="2xs" variant="filled">
      <CardBody>
        <chakra.p mt={2}>{t('kernelDesc')}</chakra.p>
      </CardBody>
      <Divider />
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Wrap pb={4}>
          {kernelList === undefined ? (
            <Spinner />
          ) : (
            kernelList.map((kernel) => (
              <Tag
                mr={2}
                mt={2}
                shadow="base"
                key={kernel.id}
                colorScheme={kernel.isInstalled ? 'whatsapp' : 'gray'}
              >
                <TagLeftIcon boxSize="12px" as={FaLinux} />
                <TagLabel>
                  Linux
                  {' '}
                  {kernel.remoteVersion}
                </TagLabel>
                {!kernel.isInstalled ? (
                  <Tooltip label="Install Kernel">
                    <ConfirmPopComponent
                      confirmationDesc="confirmDesc"
                      handleClick={() => installKernel(kernel.name)}
                      isButtonDisabled={
                        isLoadingKernel?.get(kernel.name) || !isOnline
                      }
                    >
                      <IconButton
                        ml={5}
                        mr={-2}
                        isDisabled={
                          isLoadingKernel?.get(kernel.name) || !isOnline
                        }
                        isLoading={isLoadingKernel?.get(kernel.name) || false}
                        aria-label=""
                        icon={<RiInstallLine />}
                      />
                    </ConfirmPopComponent>
                  </Tooltip>
                ) : (
                  <IconButton
                    ml={5}
                    mr={-2}
                    isDisabled
                    aria-label=""
                    icon={<MdOutlineDownloadDone />}
                  />
                )}
              </Tag>
            ))
          )}
        </Wrap>
      </CardFooter>
    </Card>
  );
};
export default KernelComponent;
