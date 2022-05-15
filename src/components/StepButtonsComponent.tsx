import { Button, Flex } from '@chakra-ui/react';

type StepButtonsProps = {
  nextStep?: () => void;
  prevStep?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  isLast?: boolean;
};

const StepButtonsComponent = ({
  nextStep,
  prevStep,
  prevDisabled,
  nextDisabled,
  isLast,
}: StepButtonsProps): JSX.Element => (
  <Flex width="100%" justify="flex-end">
    <Button
      mr={4}
      variant="ghost"
      size="sm"
      onClick={prevStep}
      isDisabled={prevDisabled}
    >
      Prev
    </Button>
    <Button isDisabled={nextDisabled} size="sm" onClick={nextStep}>
      {isLast ? 'Finish' : 'Next'}
    </Button>
  </Flex>
);

export default StepButtonsComponent;
