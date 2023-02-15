import { Button, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import stepState from '../stores/StepStore';

const StepButtons = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    activeStep, nextStep, prevStep, stepCount,
  } = useRecoilValue(stepState);
  const prevDisabled = activeStep === 0;
  const isLast = activeStep === stepCount - 1;
  const nextButtonText = () => {
    if (prevDisabled) {
      return t('start');
    }
    if (isLast) {
      return t('finish');
    }
    return t('next');
  };
  return (
    <Flex width="100%" justify="flex-end">
      <Button
        mr={4}
        variant="ghost"
        size="sm"
        onClick={prevStep}
        hidden={prevDisabled}
      >
        {t('prev')}
      </Button>

      <Button isDisabled={false} colorScheme={prevDisabled ? 'green' : 'gray'} size="sm" onClick={nextStep}>
        { nextButtonText()}
      </Button>
    </Flex>
  );
};

export default StepButtons;
