import {
  atom, selector,
} from 'recoil';
import _ from 'lodash';
import { Command } from '@tauri-apps/api/shell';
import apps from '../data/apps.json';

export interface Package {
  id: string,
  name: string,
  icon: string,
  description: string,
  pkg: string,
  extra: Array<string>,
  isInstalled: boolean,
  installedVersion:string
}

export interface Category {
  id: string,
  name: string,
  icon: string,
  description: string,
  packages:Map<string, Package>
}

export const getPackages = selector({
  key: 'getPackages',
  get: async () => {
    const categories = new Map<string, Category>();
    const pks = await Promise.all(apps.map(async (category) => {
      const packs = new Map<string, Package>();
      const cateId = _.uniqueId();
      categories.set(cateId, {
        id: cateId,
        description: category.description,
        icon: category.icon,
        name: category.name,
        packages: packs,
      });
      await Promise.all(category.apps.map(async (app) => {
        const id = _.uniqueId();
        let pkInstalled = false;
        let pkVer = '';
        const cmdVersion = new Command('version-control', ['-Q', app.pkg]);
        const cmdVersionResult = await cmdVersion.execute();
        if (cmdVersionResult.stdout) {
          const spStd = cmdVersionResult.stdout.split(' ')[1];
          pkVer = spStd;
          pkInstalled = true;
        }
        packs.set(id, {
          id,
          pkg: app.pkg,
          description: app.description,
          extra: app.extra,
          icon: app.icon,
          isInstalled: pkInstalled,
          name: app.name,
          installedVersion: pkVer,
        });
      }));
    })).then(() => categories);
    return pks;
  },
});

export const packageState = atom({
  key: 'packageState',
  default: getPackages,
});
