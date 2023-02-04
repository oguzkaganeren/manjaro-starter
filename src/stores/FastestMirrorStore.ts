import {
  atom,
} from 'recoil';

export interface MirrorProp {
  isProcessing: boolean,
}

export const mirrorState = atom({
  key: 'mirrorState',
  default: { isProcessing: false } as MirrorProp,
});
