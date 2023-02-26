import {
  atom, selector,
} from 'recoil';
import { Command } from '@tauri-apps/api/shell';
import { invoke } from '@tauri-apps/api/tauri';
import commands from '../assets/Commands';

export const isLive = selector({
  key: 'isLive',
  get: async () => {
    // do not forget to change path

    const calamaresCont = new Command(commands.getPacman.program, ['-Q', 'calamares']);
    return calamaresCont.execute().then((result) => {
      if (result.stdout) {
        return invoke('run_shell_command_with_result', { command: '[ -d "/run/miso/bootmnt/manjaro" ] && echo "true"' }).then((response) => {
          if (response === 'true') {
            return true;
          } return false;
        });
      }
      return false;
    });
  },
});

export const liveState = atom({
  key: 'liveState',
  default: isLive,
});
