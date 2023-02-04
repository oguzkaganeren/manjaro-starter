interface SpawnOptions {
    /** Current working directory. */
    cwd?: string;
    /** Environment variables. set to `null` to clear the process env. */
    env?: {
        [name: string]: string;
    };
    encoding?: string;
}
export interface commandType{
    program: string, args?: string | string[], options?: SpawnOptions
}
const fastestMirror = {
  program: 'pkexec',
  args: ['pacman-mirrors', '--fasttrack', '5'],
} as commandType;

const getActiveBranch = {
  program: 'pacman-mirrors',
  args: ['--get-branch'],
} as commandType;

const commands = {
  fastestMirror,
  getActiveBranch,
};
export default commands;
