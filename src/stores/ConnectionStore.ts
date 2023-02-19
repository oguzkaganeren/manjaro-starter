import {
  atom,
} from 'recoil';

const connectionState = atom({
  key: 'connectionState',
  default: navigator.onLine,
});

export default connectionState;
