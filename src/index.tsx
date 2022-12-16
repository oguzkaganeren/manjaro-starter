import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme, useColorModeValue } from '@chakra-ui/react';
import { StepsStyleConfig } from 'chakra-ui-steps';
import { RecoilRoot } from 'recoil';

import App from './screens/Home';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container!);

const CustomSteps = {
  ...StepsStyleConfig,
  baseStyle: (props:any) => ({
    ...StepsStyleConfig.baseStyle(props),
    stepIconContainer: {
      ...StepsStyleConfig.baseStyle(props).stepIconContainer,
      _activeStep: {
        bg: useColorModeValue('white.800', 'white.500'),
      },
    },
  }),
};
const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: false,
  },
  components: {
    Steps: CustomSteps,
  },
});
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
