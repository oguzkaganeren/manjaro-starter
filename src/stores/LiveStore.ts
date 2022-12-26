import {
  atom, selector,
} from 'recoil';
import { Command } from '@tauri-apps/api/shell';

export const isLive = selector({
  key: 'isLive',
  get: async () => {
    // do not forget to change path
    const pathCont = new Command('run_shell_command_with_result', ['[ -d \\"/var/\\" ] && echo \\"true\\"']);
    const calamaresCont = new Command('version-control', ['-Q', 'calamares']);
    const cmdVersionResult = await calamaresCont.execute();
    if (cmdVersionResult.stdout) {
      pathCont.execute().then((response) => {
        if (response.stdout === 'true') {
          return true;
        }
      });
    }
    return false;
  },
});

export const liveState = atom({
  key: 'liveState',
  default: isLive,
});
