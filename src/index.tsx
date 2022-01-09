import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import { RecoilRoot } from 'recoil';
import App from './screens/Home';
import reportWebVitals from './reportWebVitals';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  components: {
    Steps,
  },
});
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}> 
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
