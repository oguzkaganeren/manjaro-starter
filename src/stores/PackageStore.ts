import { values } from 'mobx';
import { types, getParent, flow } from 'mobx-state-tree';
import { invoke } from '@tauri-apps/api/tauri';

export const Package = types.model('Package', {
  name: types.string,
  icon: types.string,
  description: types.string,
  pkg: types.string,
  extra: types.array(types.string),
  isInstalled: false,
});

export const PackageStore = types
  .model('PackageStore', {
    package: types.reference(Package),
  })
  .views((self) => ({
  }))
  .actions((self) => {
    async function fetchInstalled() {
      try {
        invoke('run_shell_command', { command: `pacman -Qe ${self.package.pkg}` }).then((message) => {
          if (message === 'true') {
            self.package.isInstalled = true;
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
    const loadAppDetail = flow(function* loadAppDetail() {
      fetchInstalled();
    });

    return {
      loadAppDetail,
    };
  });
