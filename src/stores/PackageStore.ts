import { atom, selector } from 'recoil';
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
  get: async () => apps,
});

export const packageState = atom({
  key: 'packages',
  default: [] as Category[],
});
export const packageStatus = selector({
  key: 'packageStatus',
  get: ({ get }) => {
    get(packageState).map((category) => {
      category.packages.map((pk) => {
        try {
          invoke('run_shell_command', { command: `pacman -Qe ${pk.pkg}` }).then((response) => {
            if (response === 'true') {
              return true;
            }
            return false;
          });
        } catch (err) {
          console.log(err);
        }
      });
    });
  },
});
