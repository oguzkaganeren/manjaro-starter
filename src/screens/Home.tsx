import './home.css';
import { invoke } from '@tauri-apps/api/tauri';
import { Text, Flex, VStack } from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { FiPackage, FiHome } from 'react-icons/fi';
import { GiSettingsKnobs } from 'react-icons/gi';
import ResetPrompt from '../components/ResetPrompt';
import StepButtons from '../components/StepButtons';
import HomeContent from '../components/HomeContent';

const homeContent = (
  <Flex py={4}>
    <HomeContent />
  </Flex>
);
const packageContent = (
  <Flex py={4}>
    <Text>Test</Text>
  </Flex>
);
const moreContent = (
  <Flex py={4}>
    <Text>Test</Text>
  </Flex>
);

const steps = [
  { label: 'Welcome', icon: FiHome, content: homeContent },
  { label: 'Explorer', icon: FiPackage, content: packageContent },
  { label: 'More', icon: GiSettingsKnobs, content: moreContent },
];
function App() {
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
}

export default App;
