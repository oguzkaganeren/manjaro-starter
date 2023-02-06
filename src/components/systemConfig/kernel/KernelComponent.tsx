import {
  chakra,
  Card,
  Divider,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import KernelListComponent from './KernelListComponent';

const KernelComponent: React.FC = () => {
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
        overflow="scroll"
        maxH="240px"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <KernelListComponent />
      </CardFooter>
    </Card>
  );
};
export default KernelComponent;
