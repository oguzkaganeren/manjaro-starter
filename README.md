[![CodeFactor](https://www.codefactor.io/repository/github/oguzkaganeren/manjaro-starter/badge)](https://www.codefactor.io/repository/github/oguzkaganeren/manjaro-starter) <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)<!-- ALL-CONTRIBUTORS-BADGE:END -->
[![codebeat badge](https://codebeat.co/badges/959539e5-bcdb-4e7c-9bce-97215bcb99dd)](https://codebeat.co/projects/github-com-oguzkaganeren-manjaro-starter-master)
![build](https://github.com/oguzkaganeren/manjaro-starter/actions/workflows/deploymentCheck.yml/badge.svg)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/oguzkaganeren/manjaro-starter">
    <img src="./public/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Manjaro Starter</h3>

  <p align="center">
    A tool providing access to documentation and support for new Manjaro users.
    <br />
    <br />
    <br />
    <a href="https://github.com/oguzkaganeren/manjaro-starter/">View Demo</a>
    ·
    <a href="https://github.com/oguzkaganeren/manjaro-starter/issues">Report Bug</a>
    ·
    <a href="https://github.com/oguzkaganeren/manjaro-starter/issues">Request Feature</a>
    ·
    <a href="https://github.com/oguzkaganeren/manjaro-starter/pulls">Send a Pull Request</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->
## About The Project

<p float="left"> 
<img src="./Screenshots/mainscreen.png" width="400"/>
<img src="./Screenshots/mainscreen2.png" width="400"/>
<img src="./Screenshots/systemDetails.png" width="400"/>
<img src="./Screenshots/packages.png" width="400"/>
</p>

## Features

* Showing System Details (System name-version, kernel info, host info, CPU, memory, swap, GPU)
* Command history
* Showing Mirror List
* Set fastest mirrors
* System updates status and update system
* Easy kernel installations
* Fstrim Timer Service Setting
* Install Drivers (using MSM drivers)
* Set date time (using MSM date-time)
* Install Language Packages (using MSM Language Packages)
* Gnome Layout Switcher
* Manjaro control panel [MCP](https://gitlab.com/LordTermor/msm-ng)
* Most used package list and install them easily
* Easy package searching (Thanks to [the manjaro search engine](https://blog.manjaro.org/new-manjaro-search-engine-is-available/))
* Searching for help (Thanks to [the manjaro search engine](https://blog.manjaro.org/new-manjaro-search-engine-is-available/))
* Translation Support (Thanks to many contributor supports)
* Launch at system start
* Dark and Light themes

<!-- USAGE EXAMPLES -->
## Installations

```sh
pamac install manjaro-starter
```
or
```sh
sudo pacman -S manjaro-starter
```

A PKGBUILD can be found on [Manjaro GitLab](https://gitlab.manjaro.org/packages/extra/manjaro-starter). Also, Binary files can be found to release page for each release.

## Dependencies

* gtk3
* webkit2gtk
* pacman-mirrors
* pamac-gtk
* papirus-icon-theme
* libayatana-appindicator

### Dependency(Optional)
* manjaro-settings-manager
* mcp-qt

### Used

* For app icons [Papirus](https://github.com/PapirusDevelopmentTeam/papirus-icon-theme)

### Built With

* [React](https://reactjs.org)
* [Tauri](https://tauri.studio)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

* yarn
* https://tauri.app/v1/guides/getting-started/prerequisites#setting-up-linux
* cargo

### Installation

1. Clone the repo
```sh
git clone https://github.com/oguzkaganeren/manjaro-starter.git
```
2. Install NPM packages
```sh
yarn install
```
3. Run debug mode
```sh
yarn tauri dev
```

#### Vscode
1. Install suggested vscode extensions(`.vscode/extensions.json`)
2. Press F5 or Run -> Start Debugging

## Logs location
`/home/<host>/.config/com.manjaro.starter`  

<!-- ROADMAP -->
## 🚧 Roadmap

See the [open issues](https://github.com/oguzkaganeren/manjaro-starter/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## 🤝 Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **extremely appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


### Translations

1. Save as `src/translations/en.json` with your local json name
2. Translate only values(do not change keys)
3. Import it at i18n.ts file and add it to resources variable
4. Run `yarn tauri dev` and check your changes
5. Commit all changes
6. Send pull request

or 
https://poeditor.com/join/project/E3GYwQeAVc

<!-- LICENSE -->
## 📝 License

Distributed under the GNU License. See `LICENSE.md` for more information.



<!-- CONTACT -->
## 📫 Contact

Oguz Kagan EREN - [@oguzkagan](https://forum.manjaro.org/u/oguzkagan/summary)

Project Link: [https://github.com/oguzkaganeren/manjaro-starter](https://github.com/oguzkaganeren/manjaro-starter)



<!-- ACKNOWLEDGEMENTS -->
## Contributors


<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://oguzkaganeren.github.io/"><img src="https://avatars.githubusercontent.com/u/5963437?v=4?s=100" width="100px;" alt="Oğuz Kağan EREN"/><br /><sub><b>Oğuz Kağan EREN</b></sub></a><br /><a href="https://github.com/oguzkaganeren/manjaro-starter/commits?author=oguzkaganeren" title="Code">💻</a> <a href="#maintenance-oguzkaganeren" title="Maintenance">🚧</a> <a href="https://github.com/oguzkaganeren/manjaro-starter/commits?author=oguzkaganeren" title="Documentation">📖</a> <a href="#design-oguzkaganeren" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dai5m5iq"><img src="https://avatars.githubusercontent.com/u/111610689?v=4?s=100" width="100px;" alt="dai5m5iq"/><br /><sub><b>dai5m5iq</b></sub></a><br /><a href="https://github.com/oguzkaganeren/manjaro-starter/commits?author=dai5m5iq" title="Documentation">📖</a> <a href="https://github.com/oguzkaganeren/manjaro-starter/issues?q=author%3Adai5m5iq" title="Bug reports">🐛</a> <a href="#ideas-dai5m5iq" title="Ideas, Planning, & Feedback">🤔</a> <a href="#translation-dai5m5iq" title="Translation">🌍</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Tuxman2"><img src="https://avatars.githubusercontent.com/u/23556606?v=4?s=100" width="100px;" alt="Tuxman2"/><br /><sub><b>Tuxman2</b></sub></a><br /><a href="https://github.com/oguzkaganeren/manjaro-starter/issues?q=author%3ATuxman2" title="Bug reports">🐛</a> <a href="https://github.com/oguzkaganeren/manjaro-starter/commits?author=Tuxman2" title="Documentation">📖</a> <a href="#ideas-Tuxman2" title="Ideas, Planning, & Feedback">🤔</a> <a href="#translation-Tuxman2" title="Translation">🌍</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://root.nix.dk/"><img src="https://avatars.githubusercontent.com/u/22748698?v=4?s=100" width="100px;" alt="Frede H"/><br /><sub><b>Frede H</b></sub></a><br /><a href="#translation-fhdk" title="Translation">🌍</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://manjaro.org/"><img src="https://avatars.githubusercontent.com/u/5437803?v=4?s=100" width="100px;" alt="Mark Wagie"/><br /><sub><b>Mark Wagie</b></sub></a><br /><a href="https://github.com/oguzkaganeren/manjaro-starter/commits?author=yochananmarqos" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tomektom"><img src="https://avatars.githubusercontent.com/u/57803202?v=4?s=100" width="100px;" alt="tomektom"/><br /><sub><b>tomektom</b></sub></a><br /><a href="#translation-tomektom" title="Translation">🌍</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[forks-shield]: https://img.shields.io/github/forks/oguzkaganeren/manjaro-starter?style=for-the-badge
[forks-url]: https://github.com/oguzkaganeren/manjaro-starter/network/members
[stars-shield]: https://img.shields.io/github/stars/oguzkaganeren/manjaro-starter?style=for-the-badge
[stars-url]: https://github.com/oguzkaganeren/manjaro-starter/stargazers
[issues-shield]: https://img.shields.io/github/issues/oguzkaganeren/manjaro-starter?style=for-the-badge
[issues-url]: https://github.com/oguzkaganeren/manjaro-starter/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/roshan-lamichhane
