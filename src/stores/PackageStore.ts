import { atom, selector, selectorFamily } from 'recoil';
import { invoke } from '@tauri-apps/api/tauri';
import apps from '../data/apps.json';

export interface Package {
  id?: string;
  name: string;
  icon: string;
  description: string,
  pkg: string,
  extra: Array<string>,
  isInstalled: boolean,
}

export interface Category {
  id?: string;
  name: string;
  icon: string;
  description: string,
  packages:Array<Package>
}
export const getPackages = selector({
  key: 'getPackages',
  get: async () => {
    const cats = [] as Category[];
    apps.map((category) => {
      const packs = [] as Package[];
      category.apps.map((app) => {
        packs.push({
          pkg: app.pkg,
          description: app.description,
          extra: app.extra,
          icon: app.icon,
          isInstalled: false,
          name: app.name,
        });
      });
      cats.push({
        description: category.description,
        icon: category.icon,
        name: category.name,
        packages: packs,
      });
    });
    return cats;
  },
});

export const getPackageStatus = selectorFamily({
  key: 'getPackageStatus',
  get: (pkgName:string) => async () => {
    const result = await invoke('run_shell_command', { command: `pacman -Qe ${pkgName}` });
    return result;
  },
});

export const installPackage = selectorFamily({
  key: 'installPackage',
  get: (pkgName:string) => async () => {
    const result:string = await invoke('run_shell_command_with_result', { command: `pamac install -d --no-confirm ${pkgName}` });
    return result;
  },
});

export const packageState = atom({
  key: 'packageState',
  default: getPackages,
});
