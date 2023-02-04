import { info, error } from 'tauri-plugin-log-api';
import { Command } from '@tauri-apps/api/shell';
import { invoke } from '@tauri-apps/api/tauri';
import commands from '../../../assets/Commands';

function commandLogger(command:Command) {
  command.on('close', (data) => {
    info(
      `command finished with code ${data.code} and signal ${data.signal}`,
    );
  });
  command.on('error', (errors) => {
    error(errors);
  });
  command.stdout.on('data', (line) => {
    info(`command stdout: "${line}"`);
  });
  command.stderr.on('data', (line) => {
    error(`command stderr: "${line}"`);
  });
  return command;
}
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
