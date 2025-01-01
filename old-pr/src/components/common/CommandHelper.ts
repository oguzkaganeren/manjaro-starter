import { info, error } from '@tauri-apps/plugin-log';
import { Command } from '@tauri-apps/plugin-shell';

export default function commandLogger(command:Command<any>) {
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
