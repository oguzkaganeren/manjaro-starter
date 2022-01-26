import './home.css';
import React, { Suspense } from 'react';
import {
  Text, Flex, VStack, CircularProgress, useColorMode, Button, useColorModeValue,
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { FiPackage, FiHome } from 'react-icons/fi';
import { RiCopyrightLine } from 'react-icons/ri';
import { GiSettingsKnobs, GiDonerKebab } from 'react-icons/gi';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import StepButtons from '../components/StepButtons';
import HomeContent from '../components/HomeContent';
import PackagesView from '../components/Packages';
import ResultComponent from '../components/ResultComponent';

interface AppProps {
}

const homeContent = (
  <Flex py={4}>
    <HomeContent />
  </Flex>
);
const PackageContent: React.FC<AppProps> = (props) => (
  <Flex py={4}>
    <PackagesView />
  </Flex>
);
const moreContent = (
  <Flex py={4}>
    <Text>Test</Text>
  </Flex>
);

const App: React.FC<AppProps> = (props) => {
  const STEPCOUNT = 4;
  const steps = [
    { label: 'Welcome', icon: FiHome, content: homeContent },
    { label: 'Explorer', icon: FiPackage, content: <Suspense fallback={<CircularProgress isIndeterminate color="green.300" />}><PackageContent /></Suspense> },
    { label: 'Settings', icon: GiSettingsKnobs, content: moreContent },
    { label: 'More', icon: GiDonerKebab, content: moreContent },
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
        <ResultComponent onReset={reset} />
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
          <StepButtons
            {...{ nextStep, prevStep }}
            prevDisabled={activeStep === 0}
            isLast={activeStep === STEPCOUNT - 1}
          />
        </Flex>
      )}

    </VStack>

  );
};

export default App;
