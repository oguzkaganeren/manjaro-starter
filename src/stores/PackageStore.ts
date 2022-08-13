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
  packages:Map<string, Package>
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
    const categories = new Map<string, Category>();
    apps.map((category) => {
      const packs = new Map<string, Package>();
      Promise.all(category.apps.map(async (app) => {
        const id = _.uniqueId();
        let pkInstalled = false;
        let pkVer = '';
        const cmd = new Command('installed-control', [app.pkg]);
        const cmdResult = await cmd.execute();
        if (cmdResult.stdout) {
          pkInstalled = true;
          const cmdVersion = new Command('version-control', ['-Qe', app.pkg]);
          const cmdVersionResult = await cmdVersion.execute();
          if (cmdVersionResult.stdout) {
            const spStd = cmdVersionResult.stdout.split(' ')[1];
            pkVer = spStd;
          }
        }
        packs.set(id, {
          id: _.uniqueId(),
          pkg: app.pkg,
          description: app.description,
          extra: app.extra,
          icon: app.icon,
          isInstalled: pkInstalled,
          name: app.name,
          installedVersion: pkVer,
        });
      }));
      const cateId = _.uniqueId();
      categories.set(cateId, {
        id: _.uniqueId(),
        description: category.description,
        icon: category.icon,
        name: category.name,
        packages: packs,
      });
    });
    return categories;
  },
});

export const packageState = atom({
  key: 'packageState',
  default: getPackages,
});
