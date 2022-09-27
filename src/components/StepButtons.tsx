import { Button, Flex } from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';

type StepButtonsProps = {
  nextStep: () => void;
  prevStep: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
  isLast: boolean;
};

const StepButtons = ({
  nextStep,
  prevStep,
  prevDisabled,
  nextDisabled,
  isLast,
}: StepButtonsProps): JSX.Element => {
  const { t } = useTranslation();
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

      <Button isDisabled={nextDisabled} colorScheme={prevDisabled ? 'green' : 'gray'} size="sm" onClick={nextStep}>
        { nextButtonText()}
      </Button>
    </Flex>
  );
};

export default StepButtons;
