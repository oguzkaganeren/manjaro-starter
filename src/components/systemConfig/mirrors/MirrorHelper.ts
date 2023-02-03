import { info, error } from 'tauri-plugin-log-api';
import { Command } from '@tauri-apps/api/shell';
import commands from '../../../assets/Commands';

const fastestMirrorRunner = async () => {
  const cmd = new Command(
    commands.fastestMirror.program,
    commands.fastestMirror.args,
    commands.fastestMirror.options,
  );
  let returnVal = false;
  cmd.on('close', (data) => {
    info(
      `command finished with code ${data.code} and signal ${data.signal}`,
    );
    const isThereError = data.code !== 0;
    returnVal = !isThereError;
  });
  cmd.on('error', (errors) => {
    error(errors);
    returnVal = false;
  });
  cmd.stdout.on('data', (line) => {
    info(`command stdout: "${line}"`);
  });
  cmd.stderr.on('data', (line) => {
    error(`command stderr: "${line}"`);
  });
  return cmd.spawn().then((child) => {
    info(`pid:${child.pid}`);
    return returnVal;
  });
};

export default fastestMirrorRunner;
