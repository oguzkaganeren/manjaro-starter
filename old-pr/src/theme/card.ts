import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const {
  definePartsStyle,
  defineMultiStyleConfig,
} = createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    bg: 'white',
    _dark: {
      bg: '#171923',
    },
    shadow: 'lg',
    rounded: 'lg',
  },
});

export const cardTheme = defineMultiStyleConfig({ baseStyle });
