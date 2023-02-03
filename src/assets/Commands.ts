interface SpawnOptions {
    /** Current working directory. */
    cwd?: string;
    /** Environment variables. set to `null` to clear the process env. */
    env?: {
        [name: string]: string;
    };
    encoding?: string;
}
interface cmd{
    program: string, args?: string | string[], options?: SpawnOptions
}
const fastestMirror = {
  program: 'pkexec',
  args: ['pacman-mirrors', '--fasttrack', '5'],
} as cmd;

const commands = {
  fastestMirror,
};
export default commands;
