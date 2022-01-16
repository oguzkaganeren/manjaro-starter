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

export const packageState = atom({
  key: 'packageState',
  default: getPackages,
});
