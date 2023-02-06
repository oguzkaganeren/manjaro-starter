import { info, error } from 'tauri-plugin-log-api';
import { Command } from '@tauri-apps/api/shell';

export default function commandLogger(command:Command) {
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
