import React, { Suspense, useEffect } from 'react';
import {
  Text,
  Flex,
  VStack,
  Spinner,
  Tooltip,
  Badge,
  Box,
  Center,
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { FiPackage, FiHome, FiCheckCircle } from 'react-icons/fi';
import { GiSettingsKnobs } from 'react-icons/gi';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import StepButtons from '../components/StepButtons';
import HomeScreen from './HomeScreen';
import PackageScreen from './PackageScreen';
import FinalScreen from './FinalScreen';
import ConfigurationScreen from './Configuration/ConfigurationScreen';
import packageJson from '../../package.json';
import Nav from '../components/NavbarComponent';
import { liveState } from '../stores/LiveStore';
import { connectionState } from '../stores/ConnectionStore';
import useWindowDimensions from '../hooks/useWindowDimensions';

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
  const { height, width } = useWindowDimensions();
  const STEPCOUNT = 3;
  const isLive = useRecoilValue(liveState);
  const [isOnline, setIsOnline] = useRecoilState(connectionState);

  useEffect(() => {
  // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener('online', handleStatusChange);

    // Listen to the offline status
    window.addEventListener('offline', handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);

  const {
    nextStep, prevStep, reset, activeStep, setStep,
  } = useSteps({
    initialStep: 0,
  });
  const steps = [
    {
      label: t('welcome'),
      icon: FiHome,
      content: <HomeScreen nextStep={nextStep} />,
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
      <>
        <Nav />
        <HomeScreen nextStep={nextStep} />
      </>
    );
  }
  return (
    <>
      <Nav />
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
          <FinalScreen onReset={reset} />
        ) : (
          <Flex position="fixed" padding={5} bottom={0} w="100%">
            <StepButtons
              {...{ nextStep, prevStep }}
              prevDisabled={activeStep === 0}
              isLast={activeStep === STEPCOUNT - 1}
              nextDisabled={false}
            />
            <Text
              position="absolute"
              ml={3}
              fontSize="xs"
              mt={2}
              color="gray.500"
            >
              {packageJson.version}
              {isLive && (
                <Tooltip label={t('liveTooltip')}>
                  <Badge ml="1" size="sm" colorScheme="purple">
                    {t('live')}
                  </Badge>
                </Tooltip>
              )}
              {!isOnline && (
                <Tooltip label={t('offlineTooltip')}>
                  <Badge ml="1" size="sm" colorScheme="red">
                    {t('offline')}
                  </Badge>
                </Tooltip>
              )}
            </Text>
          </Flex>
        )}
      </VStack>
    </>
  );
};

export default App;
