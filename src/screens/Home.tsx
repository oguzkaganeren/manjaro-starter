import './home.css';
import React, { Suspense, useState } from 'react';
import {
  Text, Flex, VStack, CircularProgress, useColorMode,
  Button, useColorModeValue, ButtonGroup,
  Switch, FormControl, FormLabel,
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { FiPackage, FiHome } from 'react-icons/fi';
import { GiSettingsKnobs } from 'react-icons/gi';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import StepButtons from '../components/StepButtons';
import HomeContent from '../components/HomeContent';
import PackagesView from '../components/Packages';
import ResultComponent from '../components/ResultComponent';
import SystemSettings from '../components/SystemSettings';
import packageJson from '../../package.json';
import LocalData from '../assets/LocalData.json';
import AboutComponent from '../components/AboutComponent';
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

      <SystemSettings />
    </Suspense>
  </Flex>
);

const App: React.FC<AppProps> = (props) => {
  const STEPCOUNT = 3;
  const [launch, setLaunch] = useState(LocalData.launchAtStart);
  const handleLaunchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLaunch(event.target.checked);
  };
  const steps = [
    { label: 'Welcome', icon: FiHome, content: homeContent },
    { label: 'Explorer', icon: FiPackage, content: <PackageContent /> },
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
            <FormControl display="flex" alignItems="center" ml={2}>
              <FormLabel htmlFor="launch-start" mb="0" fontSize="sm">
                Launch at start
              </FormLabel>
              <Switch isChecked={launch} onChange={handleLaunchChange} id="launch-start" />
            </FormControl>
            <ButtonGroup variant="outline" spacing="2">

              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <AboutComponent />

            </ButtonGroup>

            <StepButtons
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
    </>

  );
};

export default App;
