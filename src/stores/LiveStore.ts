import {
  atom, selector,
} from 'recoil';
import { Command } from '@tauri-apps/plugin-shell';
import { invoke } from '@tauri-apps/api/core';
import commands from '../assets/Commands';

export const isLive = selector({
  key: 'isLive',
  get: async () => {
    // do not forget to change path

    const calamaresCont = Command.create(commands.getPacman.program, ['-Q', 'calamares']);
    return calamaresCont.execute().then((result) => {
      if (result.stdout) {
        return invoke('run_shell_command_with_result', { command: '[ -d "/run/miso/bootmnt/manjaro" ] && echo "true" || echo "false"' }).then((response) => {
          if ((response as string).indexOf('true') > 0) {
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
