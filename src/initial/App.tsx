import React, { Suspense, useEffect } from 'react';
import {
  Flex,
  VStack,
  Spinner,
  Box,
  Center,
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { FiPackage, FiHome, FiCheckCircle } from 'react-icons/fi';
import { GiSettingsKnobs } from 'react-icons/gi';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import StepButtons from '../components/StepButtons';
import HomeScreen from '../screens/HomeScreen';
import PackageScreen from '../screens/PackageScreen';
import FinalScreen from '../screens/FinalScreen';
import ConfigurationScreen from '../screens/ConfigurationScreen';

import useWindowDimensions from '../hooks/useWindowDimensions';
import EnvironmentStatusComponent from '../components/common/environment/EnvironmentStatusComponent';
import stepState from '../stores/StepStore';

const Package = (
  <Suspense
    fallback={(
      <Box w="100%">
        <Center>
          <Spinner mt={20} color="green.300" />
        </Center>
      </Box>
    )}
  >
    <PackageScreen />
  </Suspense>
);

const App: React.FC = () => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const STEPCOUNT = 3;
  const setGlobalStep = useSetRecoilState(stepState);
  const {
    nextStep, prevStep, reset, activeStep, setStep,
  } = useSteps({
    initialStep: 0,
  });
  useEffect(() => {
    setGlobalStep({
      nextStep,
      prevStep,
      reset,
      activeStep,
      setStep,
      stepCount: STEPCOUNT,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);
  const steps = [
    {
      label: t('welcome'),
      icon: FiHome,
      content: <HomeScreen />,
    },
    {
      label: t('configurations'),
      description: t('confDescription'),
      icon: GiSettingsKnobs,
      content: <ConfigurationScreen />,
    },
    {
      label: t('explorer'),
      description: t('explorerDescription'),
      icon: FiPackage,
      content: Package,
    },
  ];
  if (activeStep === 0) {
    return (
      <HomeScreen />
    );
  }
  return (
    <VStack mt={63}>
      <VStack width="100%">
        <Steps
          checkIcon={FiCheckCircle}
          position="fixed"
          padding={5}
          size={width > 900 ? 'md' : 'sm'}
          onClickStep={(step) => setStep(step)}
          zIndex={998}
          activeStep={activeStep}
        >
          {steps.map(({
            label, content, icon, description,
          }) => (
            <Step
              label={label}
              key={label}
              description={description}
              icon={icon}
            >
              <Flex w="100%" py={4}>
                {content}
              </Flex>
            </Step>
          ))}
        </Steps>
      </VStack>
      {activeStep === STEPCOUNT ? (
        <FinalScreen />
      ) : (
        <Flex position="fixed" padding={5} bottom={0} w="100%">
          <StepButtons />
          <EnvironmentStatusComponent />
        </Flex>
      )}
    </VStack>
  );
};

export default App;
