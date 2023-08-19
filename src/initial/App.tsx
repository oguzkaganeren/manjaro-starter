import React, { Suspense, lazy } from 'react';
import {
  Box, Center, Flex, Spinner, VStack,
} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { Routes, Route } from 'react-router-dom';
import EnvironmentStatusComponent from '../components/common/environment/EnvironmentStatusComponent';
import stepState from '../stores/StepStore';

const HomeScreen = lazy(() => import('../screens/HomeScreen'));
const PackageScreen = lazy(() => import('../screens/PackageScreen'));
const ConfigurationScreen = lazy(() => import('../screens/ConfigurationScreen'));
const FinalScreen = lazy(() => import('../screens/FinalScreen'));
function getCorrectScreen(activeStep:number) {
  switch (activeStep) {
    case 0:
      return <HomeScreen />;
    case 1:
      return <ConfigurationScreen />;
    case 2:
      return <PackageScreen />;
    default:
      return <FinalScreen />;
  }
}
const App: React.FC = () => {
  const { activeStep } = useRecoilValue(stepState);

  return (
    <VStack mt={63}>
      <Flex
        position="fixed"
        bg="#edf3f8"
        _dark={{ bg: '#1A202C' }}
        padding={5}
        w="100%"
      >
        <Routes>
          <Route
            index
            element={(
              <Suspense
                fallback={(
                  <Box w="100%">
                    <Center>
                      <Spinner mt={20} color="green.300" />
                    </Center>
                  </Box>
                )}
              >
                {getCorrectScreen(activeStep)}
              </Suspense>
            )}
          />
        </Routes>
        <Suspense
          fallback={(
            <Box w="100%">
              <Center>
                <Spinner mt={20} color="green.300" />
              </Center>
            </Box>
          )}
        >
          <EnvironmentStatusComponent />
        </Suspense>
      </Flex>
    </VStack>
  );
};

export default App;
