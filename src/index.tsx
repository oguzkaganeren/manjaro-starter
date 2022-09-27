import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme, useColorModeValue } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import { RecoilRoot } from 'recoil';
import { TourProvider } from '@reactour/tour';
import { t } from 'i18next';
import App from './screens/Home';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container!);
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  components: {
    Steps,
  },
});
const steps = [
  {
    selector: '.first-step',
    content: t('tourStepOne'),
  },
];
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <TourProvider
          showBadge={false}
          showDots={false}
          showNavigation={false}
          showPrevNextButtons={false}
          position="top"
          styles={{
            popover: (base) => ({
              ...base,
              borderRadius: 5,
              padding: 30,
              backgroundColor: useColorModeValue(
                'rgba(255, 255, 255, 0.8)',
                'rgba(26, 32, 44, 0.8)',
              ),
            }),
          }}
          steps={steps}
        >
          <App />
        </TourProvider>
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
