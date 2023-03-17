/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { tabsAnatomy } from '@chakra-ui/anatomy';

const {
  definePartsStyle,
  defineMultiStyleConfig,
} = createMultiStyleConfigHelpers(tabsAnatomy.keys);
// define a custom variant
const baseStyle = definePartsStyle(() => ({
  tab: {
    px: '4',
    mx: '2',
    py: '3',
    rounded: 'md',
    color: 'gray.700',
    transition: '.15s ease',
    _hover: {
      bg: 'gray.400',
      _dark: {
        bg: 'gray.900',
        color: 'white',
      },
      color: 'gray.900',
      rounded: 'md',
    },
    _dark: {
      color: 'gray.400',
    },
    justifyContent: 'flex-start',
    fontWeight: 'semibold',
    // use colorScheme to change background color with dark and light mode options
    _selected: {
      bg: 'green.600',
      rounded: 'md',
      _dark: {
        bg: 'green.500',
        color: 'white',
      },
      color: 'white',
    },
  },
  tabpanel: {
    pt: 0,
  },
}));

const tabsTheme = defineMultiStyleConfig({ baseStyle });
export default tabsTheme;
