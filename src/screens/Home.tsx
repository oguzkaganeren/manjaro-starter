import React, { Suspense, useEffect } from 'react';
import {
  Text,
  Flex,
  VStack,
  useColorModeValue,
  CircularProgress,
  Tooltip,
  Badge,
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { FiPackage, FiHome, FiCheckCircle } from 'react-icons/fi';
import { GiSettingsKnobs } from 'react-icons/gi';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import StepButtons from '../components/StepButtons';
import HomeContent from '../components/Home/HomeContent';
import PackagesList from '../components/PackageRelated/Packages';
import ResultComponent from '../components/ResultComponent';
import SystemConfig from '../components/SystemConfig/SystemConfig';
import packageJson from '../../package.json';
import Nav from '../components/NavbarComponent';
import Changelog from '../components/common/ChangelogToast';
import { liveState } from '../stores/LiveStore';
import { connectionState } from '../stores/ConnectionStore';

const Home = (
  <Flex py={4}>
    <HomeContent />
  </Flex>
);
const Package = (
  <Flex py={4}>
    <Suspense fallback={<CircularProgress mt={20} isIndeterminate color="green.300" />}>
      <PackagesList />
    </Suspense>
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
  const steps = [
    {
      label: t('welcome'),
      icon: FiHome,
      content: Home,
    },
    {
      label: t('configurations'),
      description: t('confDescription'),
      icon: GiSettingsKnobs,
      content: Config,
    },
    {
      label: t('explorer'),
      description: t('explorerDescription'),
      icon: FiPackage,
      content: Package,
    },
  ];
  const {
    nextStep, prevStep, reset, activeStep, setStep,
  } = useSteps({
    initialStep: 0,
  });
  return (
    <>
      <Nav />
      <VStack mt={63}>
        <VStack width="100%">
          <Steps
            checkIcon={FiCheckCircle}
            position="fixed"
            padding={5}
            onClickStep={(step) => setStep(step)}
            zIndex={998}
            css={{
              backdropFilter: 'saturate(180%) blur(5px)',
              backgroundColor: useColorModeValue(
                'rgba(255, 255, 255, 0.8)',
                'rgba(26, 32, 44, 0.8)',
              ),
            }}
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
            bottom={0}
            w="100%"
            css={{
              backdropFilter: 'saturate(180%) blur(5px)',
              // eslint-disable-next-line react-hooks/rules-of-hooks
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
        <Changelog />
      </VStack>
    </>
  );
};

export default App;
