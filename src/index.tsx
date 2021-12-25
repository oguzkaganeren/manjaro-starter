import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme, ThemeProvider } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import App from './screens/Home';
import reportWebVitals from './reportWebVitals';
import { CategoryStore } from './stores/CategoryStore';

const categories = CategoryStore.create();
categories.loadCat();
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
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
