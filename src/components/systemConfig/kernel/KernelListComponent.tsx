import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  TagLabel,
  chakra,
  TagLeftIcon,
  Tag,
  IconButton,
  Tooltip,
  Spinner,
  Wrap,
} from '@chakra-ui/react';
import { FaLinux } from 'react-icons/fa';
import { RiInstallLine } from 'react-icons/ri';
import { MdOutlineDownloadDone } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import useKernelHook from './useKernelHook';
import { connectionState } from '../../../stores/ConnectionStore';
import ConfirmPopComponent from '../../common/ConfirmPopComponent';

type tagProps = {
  text: string;
  color: string;
};

const TagComponent = (props: tagProps) => {
  const { text, color } = props;
  return (
    <chakra.span
      px={2}
      py={1}
      ml="10px"
      fontSize="xs"
      fontWeight="bold"
      lineHeight="none"
      textColor="whiteAlpha.900"
      bg={color}
      rounded="full"
    >
      {text}
    </chakra.span>
  );
};

const KernelListComponent = () => {
  const isOnline = useRecoilValue(connectionState);
  const { t } = useTranslation();
  const {
    kernelList, installKernel, isLoadingKernel, currentKernel,
  } = useKernelHook();
  return (
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
            {currentKernel === kernel.name && (
              <TagComponent text={t('running')} color="green.600" />
            )}
            {kernel.remoteVersion.indexOf('rc') > 0 && (
              <TagComponent text={t('experimental')} color="orange.600" />
            )}
            {kernel.remoteVersion.indexOf('rt') > 0 && (
              <TagComponent text={t('realtime')} color="blue.600" />
            )}
            {!kernel.isInstalled ? (

              <ConfirmPopComponent
                confirmationDesc="confirmDesc"
                handleClick={() => installKernel(kernel.name)}
                isButtonDisabled={
                    isLoadingKernel?.get(kernel.name) || !isOnline
                  }
              >
                <Tooltip label={t('installKernel')}>
                  <IconButton
                    ml={5}
                    mr={-2}
                    isDisabled={isLoadingKernel?.get(kernel.name) || !isOnline}
                    isLoading={isLoadingKernel?.get(kernel.name) || false}
                    aria-label=""
                    icon={<RiInstallLine />}
                  />
                </Tooltip>
              </ConfirmPopComponent>
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
  );
};

export default KernelListComponent;
