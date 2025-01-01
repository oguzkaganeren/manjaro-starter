import {
  atom,
} from 'recoil';

const commands: Array<string> = [];
const commandState = atom({
  key: 'commandState',
  default: commands,
});
export default commandState;
