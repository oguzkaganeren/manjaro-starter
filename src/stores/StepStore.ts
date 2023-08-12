import {
  atom,
} from 'recoil';

export interface StepType {
    setActiveStep: (step: number) => void;
    activeStep: number;
    count:number;
}

const stepState = atom({
  key: 'stepState',
  default: { activeStep: 0 } as StepType,
});
export default stepState;
