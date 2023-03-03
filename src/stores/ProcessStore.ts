import {
  atom,
} from 'recoil';
import { Child } from '@tauri-apps/api/shell';

export enum ProcessTypes {
  Package,
  Mirror,
  Kernel,
}

export enum ProcessStatues {
  Waiting,
  Processing,
  Failed,
}

export interface Process {
  type:ProcessTypes,
  status:ProcessStatues,
  child:Child
}

const processes: Map<string, Process> = new Map<string, Process>();
const processState = atom({
  key: 'processState',
  default: processes,
});
export default processState;
