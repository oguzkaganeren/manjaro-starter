import {
  chakra,
  Card,
  CardBody,
  CardFooter,
  Divider,
  ButtonGroup,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { connectionState } from '../../../stores/ConnectionStore';
import ActiveBranchComponent from './activeBranch/ActiveBranchComponent';
import FastestMirrorComponent from './fastest/FastestMirrorComponent';
import ShowRepoDetails from './repo/ShowRepoDetails';
import MirrorList from './showing/ShowMirrorListComponent';

const MirrorMainComponent: React.FC = () => {
  const { t } = useTranslation();
  const isOnline = useRecoilValue(connectionState);
  return (
    <Card minH="2xs" variant="filled">
      <CardBody>
        <Flex mt={-2} mb={5} justifyContent="flex-end">
          <ActiveBranchComponent />
        </Flex>
        <chakra.p fontSize="sm">{t('mirrorDesc')}</chakra.p>
        <chakra.p fontSize="sm" mt={2}>
          {t('pacmanMirrors')}
        </chakra.p>
        <chakra.p fontSize="sm" mt={2}>
          {t('fastestMirrorWords')}
        </chakra.p>
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
        <ButtonGroup spacing="2">
          <MirrorList />
          <FastestMirrorComponent />
          {isOnline && <ShowRepoDetails />}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
export default MirrorMainComponent;
