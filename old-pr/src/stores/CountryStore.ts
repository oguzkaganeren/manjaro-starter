import {
  atom,
} from 'recoil';

const countryState = atom({
  key: 'countryState',
  default: new Map(),
});
export default countryState;
