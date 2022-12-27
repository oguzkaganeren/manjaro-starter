import {
  atom,
} from 'recoil';

export const connectionState = atom({
  key: 'connectionState',
  default: navigator.onLine,
});
