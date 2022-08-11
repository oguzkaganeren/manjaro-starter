import './home.css';
import React, { Suspense, useEffect, useState } from 'react';
import {
  Text, Flex, VStack, CircularProgress, useColorMode,
  Button, useColorModeValue, ButtonGroup,

} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { FiPackage, FiHome } from 'react-icons/fi';
import { GiSettingsKnobs } from 'react-icons/gi';
import { useTranslation } from 'react-i18next';

import StepButtons from '../components/StepButtons';
import HomeContent from '../components/HomeContent';
import PackagesView from '../components/PackageRelated/Packages';
import ResultComponent from '../components/ResultComponent';
import SystemConfig from '../components/SystemConfig/SystemConfig';
import packageJson from '../../package.json';
import Nav from '../components/NavbarComponent';

interface AppProps {
}

const homeContent = (
  <Flex py={4}>
    <HomeContent />
  </Flex>
);
const PackageContent: React.FC<AppProps> = (props) => (
  <Flex py={4}>
    <Suspense fallback={<CircularProgress isIndeterminate color="green.300" />}>

      <PackagesView />
    </Suspense>
  </Flex>
);
const settingContent = (
  <Flex py={4}>
    <Suspense fallback={<CircularProgress isIndeterminate color="green.300" />}>

      <SystemConfig />
    </Suspense>
  </Flex>
);

const App: React.FC<AppProps> = (props) => {
  const { t } = useTranslation();
  const STEPCOUNT = 3;

  const steps = [
    { label: t('welcome'), icon: FiHome, content: homeContent },
    { label: t('explorer'), icon: FiPackage, content: <PackageContent /> },
    { label: t('configurations'), icon: GiSettingsKnobs, content: settingContent },
  ];
  const bg = useColorModeValue('white', 'gray.800');
  const {
    nextStep, prevStep, reset, activeStep,
  } = useSteps({
    initialStep: 0,
  });
  return (
    <>
      <Nav />
      <VStack mt={63}>
        <VStack width="100%">

          <Steps
            bg={bg}
            position="fixed"
            padding={5}
            boxShadow="sm"
            css={{
              backdropFilter: 'saturate(180%) blur(5px)',
              backgroundColor: useColorModeValue(
                'rgba(255, 255, 255, 0.8)',
                'rgba(26, 32, 44, 0.8)',
              ),
            }}
            activeStep={activeStep}
          >

            {steps.map(({ label, content, icon }) => (
              <Step label={label} key={label} icon={icon}>
                {content}
              </Step>
            ))}
          </Steps>

        </VStack>

        {activeStep === STEPCOUNT ? (
          <ResultComponent onReset={reset} />
        ) : (
          <Flex
            position="fixed"
            padding={5}
            bg={bg}
            bottom={0}
            w="100%"
            css={{
              backdropFilter: 'saturate(180%) blur(5px)',
              backgroundColor: useColorModeValue(
                'rgba(255, 255, 255, 0.8)',
                'rgba(26, 32, 44, 0.8)',
              ),
            }}
          >

            <StepButtons
              {...{ nextStep, prevStep }}
              prevDisabled={activeStep === 0}
              isLast={activeStep === STEPCOUNT - 1}
            />
            <Text position="absolute" ml={3} fontSize="xs" mt={2} color="gray.500">
              {packageJson.version}
            </Text>

          </Flex>
        )}

      </VStack>
    </>

  );
};

export default App;
