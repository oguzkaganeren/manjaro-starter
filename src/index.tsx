import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import Nav from './components/NavbarComponent';
import App from './initial/App';
import RootDetector from './components/common/RootDetector';
import theme from './theme/theme';

const container = document.getElementById('root') as Element;
const root = createRoot(container);

function disableContextMenuOnRelease() {
  if (window.location.hostname !== 'localhost') {
    return;
  }

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });
}

root.render(
  <ChakraProvider theme={theme}>
    <RootDetector />
    <RecoilRoot>
      <Nav />
      <App />
    </RecoilRoot>
  </ChakraProvider>,
);
disableContextMenuOnRelease();
