import React from 'react';
import {
  Box, Tag, Tooltip,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import useRemoteHook from './useRemoteHook';

type Props = {
    name:string,
    branch:string
}

const RemotePackageVersion = ({ name, branch }: Props) => {
  const { version } = useRemoteHook(name, branch);
  const { t } = useTranslation();
  switch (branch) {
    case 'unstable':
      return (
        <Tooltip label={t('unstableDesc')}>
          <Tag colorScheme="red">
            {t('unstableVersion')}
            {' '}
            :
            {' '}
            {version}
          </Tag>
        </Tooltip>
      );
    case 'testing':
      return (
        <Tooltip label={t('testingDesc')}>
          <Tag colorScheme="orange">
            {t('testingVersion')}
            {' '}
            :
            {' '}
            {version}
          </Tag>
        </Tooltip>
      );
    case 'stable':
      return (
        <Tooltip label={t('stableDesc')}>
          <Tag colorScheme="green">
            {t('stableVersion')}
            {' '}
            :
            {' '}
            {version}
          </Tag>
        </Tooltip>
      );
    default:
      return <Box />;
  }
};

export default RemotePackageVersion;
