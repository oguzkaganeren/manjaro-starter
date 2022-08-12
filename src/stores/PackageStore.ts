import {
  atom, selector, selectorFamily,
} from 'recoil';
import _ from 'lodash';
import { Command } from '@tauri-apps/api/shell';
import apps from '../data/apps.json';

export interface Package {
  id: string;
  name: string;
  icon: string;
  description: string,
  pkg: string,
  extra: Array<string>,
  isInstalled: boolean,
  installedVersion:string
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string,
  packages:Array<Package>
}

export const getPackageStatus = selectorFamily({
  key: 'getPackageStatus',
  get: (pkgName:string) => async () => {
    const cmd = new Command('version-control', ['-Qe', pkgName]);
    const cmdResult = await cmd.execute();
    return cmdResult.stdout;
  },
});
export const getPackages = selector({
  key: 'getPackages',
  get: async ({ get }) => {
    const cats = [] as Category[];
    apps.map((category) => {
      const packs = [] as Package[];
      category.apps.map((app) => {
        packs.push({
          id: _.uniqueId(),
          pkg: app.pkg,
          description: app.description,
          extra: app.extra,
          icon: app.icon,
          isInstalled: false,
          name: app.name,
          installedVersion: '',
        });
      });
      cats.push({
        id: _.uniqueId(),
        description: category.description,
        icon: category.icon,
        name: category.name,
        packages: packs,
      });
    });
    return cats;
  },
});

export const packageState = atom({
  key: 'packageState',
  default: getPackages,
});
