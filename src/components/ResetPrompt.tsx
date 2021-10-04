import {
  Button, Flex, FlexProps, Heading,
} from '@chakra-ui/react';
import { motion, MotionProps } from 'framer-motion';

type ResetPromptProps = Omit<FlexProps, keyof MotionProps> & {
  onReset: () => void;
};

const MotionFlex = motion<FlexProps>(Flex);

const ResetPrompt = ({ onReset, ...rest }: ResetPromptProps): JSX.Element => (
  <MotionFlex
    px={4}
    py={4}
    width="100%"
    flexDirection="column"
    animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    {...rest}
  >
    <Heading fontSize="xl">Woohoo! All steps completed!</Heading>
    <Button mt={6} size="sm" onClick={onReset}>
      Reset
    </Button>
  </MotionFlex>
);

export default ResetPrompt;

ResetPrompt.defaultProps = {
  justifyContent: 'center',
  alignItems: 'center',
};
