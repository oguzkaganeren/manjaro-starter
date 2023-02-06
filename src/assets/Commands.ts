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

const getWhoami = {
  program: 'whoami',
} as commandType;

const getPamacManager = {
  program: 'pamac-manager',
} as commandType;

const getCalamaresPolkit = {
  program: 'calamares_polkit',
} as commandType;

const getPacman = {
  program: 'pacman',
} as commandType;

const getPamac = {
  program: 'pamac',
} as commandType;

const getGLM = {
  program: 'gnome-layout-switcher',
} as commandType;

const getLspci = {
  program: 'lspci',
} as commandType;

const getMSM = {
  program: 'manjaro-settings-manager',
} as commandType;

const getMCP = {
  program: 'mcp',
} as commandType;

const getRunningKernel = {
  program: 'uname',
} as commandType;

const commands = {
  fastestMirror,
  getActiveBranch,
  getWhoami,
  getPamacManager,
  getCalamaresPolkit,
  getPacman,
  getPamac,
  getGLM,
  getLspci,
  getMSM,
  getMCP,
  getRunningKernel,
};
export default commands;
