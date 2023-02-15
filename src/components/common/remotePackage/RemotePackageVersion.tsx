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
const VerComp = (tooldesc: string, label: string, version: string) => (
  <Tooltip label={tooldesc}>
    <Tag mt={2} colorScheme="cyan">
      {label}
      {' '}
      :
      {' '}
      {version}
    </Tag>
  </Tooltip>
);
const RemotePackageVersion = ({ name, branch }: Props) => {
  const { version } = useRemoteHook(name, branch);
  const { t } = useTranslation();

  switch (branch) {
    case 'unstable':
      return VerComp(t('unstableDesc'), t('unstableVersion'), version);
    case 'testing':
      return VerComp(t('testingDesc'), t('testingVersion'), version);
    case 'stable':
      return VerComp(t('stableDesc'), t('stableVersion'), version);
    default:
      return <Box />;
  }
};

export default RemotePackageVersion;
