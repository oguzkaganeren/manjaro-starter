import { Command } from '@tauri-apps/api/shell';
import { invoke } from '@tauri-apps/api/tauri';
import commands from '../../../assets/Commands';
import commandLogger from '../../common/CommandHelper';

const fastestMirrorRunner = async () => {
  const cmd = new Command(
    commands.fastestMirror.program,
    commands.fastestMirror.args,
    commands.fastestMirror.options,
  );
  commandLogger(cmd);
  return cmd.execute();
};

export const getMirrorList = () => invoke('run_shell_command_with_result', {
  command: 'cat /etc/pacman.d/mirrorlist',
}).then((response) => {
  if (response) {
    const responseRp = (response as string)
      .replaceAll('"', '');

    return responseRp;
  }
});

export const getActiveBranch = async () => {
  const cmd = new Command(
    commands.getActiveBranch.program,
    commands.getActiveBranch.args,
    commands.getActiveBranch.options,
  );
  commandLogger(cmd);
  return cmd.execute();
};
export default fastestMirrorRunner;
