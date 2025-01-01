import React from 'react';
import {
  Box, Spinner, Tag,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import useRemoteHook from './useRemoteHook';

type Props = {
    name:string,
    branch:string
}
const VerComp = (label: string, version: string) => {
  if (version) {
    return (
      <Tag mt={1} colorScheme="cyan">
        {label}
        :
        {' '}
        {version}
      </Tag>
    );
  }
  return (<Spinner />);
};
const RemotePackageVersion = ({ name, branch }: Props) => {
  const { version } = useRemoteHook(name, branch);
  const { t } = useTranslation();

  switch (branch) {
    case 'unstable':
      return VerComp(t('unstableVersion'), version);
    case 'testing':
      return VerComp(t('testingVersion'), version);
    case 'stable':
      return VerComp(t('stableVersion'), version);
    default:
      return <Box />;
  }
};

export default RemotePackageVersion;
