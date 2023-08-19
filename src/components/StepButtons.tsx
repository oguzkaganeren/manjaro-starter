import { IconButton, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import stepState from '../stores/StepStore';
import StepperComponent from './common/StepperComponent';

const StepButtons = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    activeStep, setActiveStep, count,
  } = useRecoilValue(stepState);
  const prevDisabled = activeStep === 0;
  const isLast = activeStep === count;
  return (
    <Flex justify="flex-end">
      <IconButton
        mr={4}
        size="sm"
        aria-label="back"
        icon={<BsChevronLeft />}
        onClick={() => setActiveStep(activeStep - 1)}
        isDisabled={prevDisabled}
      />
      <StepperComponent />
      <IconButton
        ml={4}
        isDisabled={isLast}
        aria-label="next"
        colorScheme={prevDisabled ? 'green' : 'gray'}
        size="sm"
        icon={<BsChevronRight />}
        onClick={() => setActiveStep(activeStep + 1)}
      />
    </Flex>
  );
};

export default StepButtons;
