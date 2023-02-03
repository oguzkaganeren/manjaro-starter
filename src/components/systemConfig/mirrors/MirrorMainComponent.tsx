import {
  chakra,
  Card,
  CardBody,
  CardFooter,
  Divider,
  ButtonGroup,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FastestMirrorComponent from './FastestMirrorComponent';
import MirrorList from './MirrorListComponent';

const MirrorMainComponent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Card minH="2xs" variant="filled">
      <CardBody>
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
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
export default MirrorMainComponent;
