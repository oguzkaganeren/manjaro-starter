import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  TagLabel,
  chakra,
  TagLeftIcon,
  Tag,
  Spinner,
  Wrap,
  Button,
} from '@chakra-ui/react';
import { FaLinux } from 'react-icons/fa';
import { RiInstallLine } from 'react-icons/ri';
import { MdOutlineDownloadDone } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import useKernelHook from './useKernelHook';
import { connectionState } from '../../../stores/ConnectionStore';
import ConfirmPopComponent from '../../common/ConfirmPopComponent';
import commands from '../../../assets/Commands';

type tagProps = {
  text: string;
  color: string;
};
type kernelSubProps = {
  name: string;
};

const TagComponent = (props: tagProps) => {
  const { text, color } = props;
  return (
    <chakra.span
      pos="absolute"
      top="-6px"
      left="-10px"
      px={2}
      py={1}
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
const InstallButton = (props: kernelSubProps) => {
  const { installKernel, isLoadingKernel } = useKernelHook();
  const isOnline = useRecoilValue(connectionState);
  const { t } = useTranslation();
  const { name } = props;
  return (
    <ConfirmPopComponent
      confirmationDesc="confirmDesc"
      handleClick={() => installKernel(name)}
      isButtonDisabled={isLoadingKernel?.get(name) || !isOnline}
      commands={[
        (
            [
              commands.getPamac.program,
              'install',
              '--no-confirm',
              '--no-update',
              name,
            ] as Array<string>
        )
          .map((text) => `${text}`)
          .join(' '),
      ]}
    >
      <Button
        ml={5}
        mr={-2}
        size="sm"
        isDisabled={isLoadingKernel?.get(name) || !isOnline}
        isLoading={isLoadingKernel?.get(name) || false}
        leftIcon={<RiInstallLine />}
      >
        {t('installKernel')}

      </Button>
    </ConfirmPopComponent>
  );
};
const KernelListComponent = () => {
  const { t } = useTranslation();
  const {
    kernelList, currentKernel,
  } = useKernelHook();

  return (
    <Wrap pb={4} pt={4} pl={4}>
      {kernelList === undefined ? (
        <Spinner />
      ) : (
        kernelList.map((kernel) => (
          <chakra.span pos="relative" display="inline-block">
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
                <InstallButton name={kernel.name} />
              ) : (
                <Button
                  ml={5}
                  mr={-2}
                  size="sm"
                  isDisabled
                  leftIcon={<MdOutlineDownloadDone />}
                >
                  {t('installed')}
                </Button>
              )}
            </Tag>
            {currentKernel === kernel.name && (
            <TagComponent text={t('running')} color="green.600" />
            )}
            {kernel.remoteVersion.indexOf('rc') > 0 && (
              <TagComponent text={t('experimental')} color="orange.600" />
            )}
            {kernel.remoteVersion.indexOf('rt') > 0 && (
              <TagComponent text={t('realtime')} color="blue.600" />
            )}
          </chakra.span>

        ))
      )}
    </Wrap>
  );
};

export default KernelListComponent;
