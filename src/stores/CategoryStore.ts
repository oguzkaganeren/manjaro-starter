import { values } from 'mobx';
import {
  types, getParent, flow, splitJsonPath,
} from 'mobx-state-tree';
import { invoke } from '@tauri-apps/api/tauri';
import apps from '../data/apps.json';

export const Package = types.model('Package', {
  id: types.optional(types.identifier, () => Math.random().toString()),
  name: types.string,
  icon: types.string,
  description: types.string,
  pkg: types.string,
  extra: types.array(types.string),
  isInstalled: types.optional(types.boolean, false),
})
  .actions((self) => ({
    // note the star, this a generator function!
    fetchInstalled: flow(function* fetchInstalled() {
      try {
        const response = yield invoke('run_shell_command', { command: `pacman -Qe ${self.pkg}` });
        if (response === 'true') {
          self.isInstalled = true;
        } else {
          self.isInstalled = false;
        }
      } catch (err) {
        console.log(err);
      }
    }),

  }));

export const Category = types.model('Category', {
  id: types.optional(types.identifier, () => Math.random().toString()),
  name: types.string,
  icon: types.string,
  description: types.string,
  apps: types.optional(types.array(Package), []),
});

export const CategoryStore = types
  .model('CategoryStore', {
    isLoading: true,
    categories: types.array(Category),
  })
  .views((self) => ({
    get categories() {
      return self.categories;
    },
  }))
  .actions((self) => {
    function markLoading(loading:boolean) {
      self.isLoading = loading;
    }

    function addApps() {
      apps.forEach((appJson) => {
        self.categories.push({
          name: appJson.name,
          description: appJson.description,
          icon: appJson.icon,
          apps: appJson.apps,
        });
      });
    }
    const loadInstalled = flow(function* checkAppsInstalled() {
      self.categories.forEach((cat) => {
        cat.apps.forEach((app) => {
          app.fetchInstalled();
        });
      });
    });
    const loadCat = flow(function* loadCat() {
      try {
        addApps();
        markLoading(false);
      } catch (err) {
        console.error('Failed to load books ', err);
      }
    });

    return {
      loadCat,
      loadInstalled,
    };
  });
