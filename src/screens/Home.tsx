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
import PackagesList from '../components/PackageRelated/Packages';
import ResultComponent from '../components/ResultComponent';
import SystemConfig from '../components/SystemConfig/SystemConfig';
import packageJson from '../../package.json';
import Nav from '../components/NavbarComponent';

const Home = (
  <Flex py={4}>
    <HomeContent />
  </Flex>
);
const Package = (
  <Flex py={4}>
    <PackagesList />
  </Flex>
);
const Config = (
  <Flex py={4}>
    <SystemConfig />
  </Flex>
);

const App: React.FC = () => {
  const { t } = useTranslation();
  const STEPCOUNT = 3;

  const steps = [
    { label: t('welcome'), icon: FiHome, content: Home },
    { label: t('configurations'), icon: GiSettingsKnobs, content: Config },
    { label: t('explorer'), icon: FiPackage, content: Package },
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
        <Suspense fallback={<CircularProgress mt={20} isIndeterminate color="green.300" />}>
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
        </Suspense>
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
              nextDisabled={false}
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
