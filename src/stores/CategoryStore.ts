import { values } from 'mobx';
import {
  types, getParent, flow, splitJsonPath,
} from 'mobx-state-tree';
import { Package } from './PackageStore';
import apps from '../data/apps.json';

export const Category = types.model('Category', {
  name: types.string,
  icon: types.string,
  description: types.string,
  apps: types.array(Package),
});

export const CategoryStore = types
  .model('CategoryStore', {
    isLoading: true,
    categories: types.array(Category),
  })
  .views((self) => ({
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
    function loadAppDetail() {
      self.categories.forEach((category) => {
        category.apps.forEach((app) => {
          app.loadAppDetail();
        });
      });
    }
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
    };
  });
