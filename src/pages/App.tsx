import React, { Suspense } from 'react';
import {
  Text, Flex, VStack, CircularProgress, useColorMode, Button, useColorModeValue,
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { FiPackage, FiHome } from 'react-icons/fi';
import { GiSettingsKnobs } from 'react-icons/gi';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import StepButtonsComponent from '../components/StepButtonsComponent';
import HomePage from './HomePage';
import ExplorerPage from './ExplorerPage';
import packageJson from '../../package.json';
import SettingPage from './SettingPage';
import FinalPage from './FinalPage';

interface AppProps {
}

const homeContent = (
  <Flex py={4}>
    <HomePage />
  </Flex>
);
const PackageContent = (
  <Flex py={4}>
    <Suspense fallback={<CircularProgress isIndeterminate color="green.300" />}>

      <ExplorerPage />
    </Suspense>
  </Flex>
);
const settingContent = (
  <Flex py={4}>
    <Suspense fallback={<CircularProgress isIndeterminate color="green.300" />}>

      <SettingPage />
    </Suspense>
  </Flex>
);

const App: React.FC<AppProps> = (props) => {
  const STEPCOUNT = 3;
  const steps = [
    { label: 'Welcome', icon: FiHome, content: homeContent },
    { label: 'Explorer', icon: FiPackage, content: <ExplorerPage /> },
    { label: 'Settings', icon: GiSettingsKnobs, content: settingContent },
  ];
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const {
    nextStep, prevStep, reset, activeStep,
  } = useSteps({
    initialStep: 0,
  });
  return (
    <VStack>

      <VStack width="100%">

        <Steps
          bg={bg}
          position="fixed"
          padding={5}
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
        <FinalPage onReset={reset} />
      ) : (
        <Flex
          position="fixed"
          padding={5}
          bg={bg}
          bottom={0}
          w="100%"
        >
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>

          <StepButtonsComponent
            {...{ nextStep, prevStep }}
            prevDisabled={activeStep === 0}
            isLast={activeStep === STEPCOUNT - 1}
          />
          <Text position="absolute" ml={3} fontSize="xs" mt={10} color="gray.500">
            {packageJson.version}
          </Text>

        </Flex>
      )}

    </VStack>

  );
};

export default App;
