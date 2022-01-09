import './home.css';
import React, { Suspense } from 'react';
import {
  Text, Flex, VStack, CircularProgress,
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { FiPackage, FiHome } from 'react-icons/fi';
import { GiSettingsKnobs } from 'react-icons/gi';
import ResetPrompt from '../components/ResetPrompt';
import StepButtons from '../components/StepButtons';
import HomeContent from '../components/HomeContent';
import PackagesView from '../components/Packages';

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
  const steps = [
    { label: 'Welcome', icon: FiHome, content: homeContent },
    { label: 'Explorer', icon: FiPackage, content: <Suspense fallback={<CircularProgress isIndeterminate color="green.300" />}><PackageContent /></Suspense> },
    { label: 'More', icon: GiSettingsKnobs, content: moreContent },
  ];
  const {
    nextStep, prevStep, reset, activeStep,
  } = useSteps({
    initialStep: 0,
  });
  return (
    <VStack width="100%" p={5} marginTop={5}>
      <Steps activeStep={activeStep}>
        {steps.map(({ label, content, icon }) => (
          <Step label={label} key={label} icon={icon}>
            {content}
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </VStack>
  );
};

export default App;
