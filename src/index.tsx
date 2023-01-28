import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsTheme } from 'chakra-ui-steps';
import { RecoilRoot } from 'recoil';

import App from './screens/App';
import reportWebVitals from './reportWebVitals';
import RootDetector from './components/common/RootDetector';

const container = document.getElementById('root');
const root = createRoot(container!);

function disableContextMenuOnRelease() {
  if (window.location.hostname !== 'localhost') {
    return;
  }

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });
}

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  components: {
    Steps: StepsTheme,
  },
});
root.render(
  <ChakraProvider theme={theme}>
    <RootDetector />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ChakraProvider>,
);
disableContextMenuOnRelease();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
