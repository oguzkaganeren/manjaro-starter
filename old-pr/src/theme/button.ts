import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const solid = defineStyle({
  shadow: 'base',
});

const buttonTheme = defineStyleConfig({
  variants: { solid },
});
export default buttonTheme;
