import {
  atom,
} from 'recoil';

const expertState = atom({
  key: 'expertState',
  default: false as boolean,
});
export default expertState;
