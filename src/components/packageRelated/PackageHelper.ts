import { Command } from '@tauri-apps/api/shell';
import commands from '../../assets/Commands';
import isDev from '../../utils/DevHelper';
import commandLogger from '../common/CommandHelper';

const callPackageQuery = async (pkName:string) => {
  const cmdVersion = new Command(commands.getPacman.program, ['-Q', pkName]);
  return cmdVersion.execute();
};

export const callPackageInstall = async (pkName:string) => {
  const dryRun = isDev() ? '--dry-run' : '';
  const cmdVersion = new Command(commands.getPamac.program, [
    'install',
    '--no-confirm',
    '--no-upgrade',
    dryRun,
    pkName,
  ]);
  commandLogger(cmdVersion);
  return cmdVersion;
};

export default callPackageQuery;
