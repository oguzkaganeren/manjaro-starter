import { info, error } from 'tauri-plugin-log-api';
import { Command } from '@tauri-apps/api/shell';
import { invoke } from '@tauri-apps/api/tauri';
import commands from '../../../assets/Commands';

const fastestMirrorRunner = async () => {
  const cmd = new Command(
    commands.fastestMirror.program,
    commands.fastestMirror.args,
    commands.fastestMirror.options,
  );
  cmd.on('close', (data) => {
    info(
      `command finished with code ${data.code} and signal ${data.signal}`,
    );
  });
  cmd.on('error', (errors) => {
    error(errors);
  });
  cmd.stdout.on('data', (line) => {
    info(`command stdout: "${line}"`);
  });
  cmd.stderr.on('data', (line) => {
    error(`command stderr: "${line}"`);
  });
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
export default fastestMirrorRunner;
