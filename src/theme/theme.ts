import { extendTheme } from '@chakra-ui/react';
import { StepsTheme } from 'chakra-ui-steps';
import { cardTheme } from './card';
import buttonTheme from './button';
import tabsTheme from './tab';

const theme = extendTheme(
  {
    styles: {
      global: {
        body: {
          bg: '#edf3f8', _dark: { bg: '#1A202C' },
        },
      },
    },
    config: {
      initialColorMode: 'system',
      useSystemColorMode: true,
    },
    components: {
      Steps: StepsTheme,
      Card: cardTheme,
      Button: buttonTheme,
      Tabs: tabsTheme,
    },
  },
);
export default theme;
