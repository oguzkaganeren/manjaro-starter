import React, { useEffect } from 'react';
import {
  VStack,
  useSteps,
  Stepper,
  Step,
  StepStatus,
} from '@chakra-ui/react';
import { GoDot, GoDotFill } from 'react-icons/go';
import { useSetRecoilState } from 'recoil';
import stepState from '../../stores/StepStore';

const StepperComponent = () => {
  const STEP_COUNT = 3;
  const setGlobalStep = useSetRecoilState(stepState);

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: STEP_COUNT,
  });
  useEffect(() => {
    setGlobalStep({
      activeStep,
      setActiveStep,
      count: STEP_COUNT,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);
  return (
    <VStack width="100%" mt={2}>
      <Stepper index={activeStep}>
        {[...Array(STEP_COUNT)].map((x, i) => (
          <Step key={`step-${i}`} onClick={() => setActiveStep(i)}>
            <StepStatus
              complete={<GoDotFill />}
              incomplete={<GoDot color="gray" />}
              active={<GoDot />}
            />
          </Step>
        ))}
      </Stepper>
    </VStack>
  );
};

export default StepperComponent;
