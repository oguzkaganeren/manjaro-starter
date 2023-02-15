import {
  atom,
} from 'recoil';

export interface StepType {
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
    setStep: (step: number) => void;
    activeStep: number;
    stepCount:number;
}

const stepState = atom({
  key: 'stepState',
  default: {} as StepType,
});
export default stepState;
