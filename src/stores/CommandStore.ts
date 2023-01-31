import {
  atom,
} from 'recoil';

const commandState = atom({
  key: 'commandState',
  default: [''],
});
export default commandState;
