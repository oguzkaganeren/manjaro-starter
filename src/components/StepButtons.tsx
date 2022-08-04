import { Button, Flex } from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';

type StepButtonsProps = {
  nextStep?: () => void;
  prevStep?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  isLast?: boolean;
};

const StepButtons = ({
  nextStep,
  prevStep,
  prevDisabled,
  nextDisabled,
  isLast,
}: StepButtonsProps): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Flex width="100%" justify="flex-end">
      <Button
        mr={4}
        variant="ghost"
        size="sm"
        onClick={prevStep}
        isDisabled={prevDisabled}
      >
        {t('prev')}
      </Button>
      <Button isDisabled={nextDisabled} size="sm" onClick={nextStep}>
        {isLast ? t('finish') : t('next')}
      </Button>
    </Flex>
  );
};

export default StepButtons;
