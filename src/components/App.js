import React, { Fragment, useEffect } from 'react';
import { get } from 'utils/requests';

import { Counter } from 'components/counter/Counter';
import Titlebar from 'components/titlebar/Titlebar';

import logo from 'logo.svg';
import styles from 'components/App.module.scss';
import SimpleSidebar from './SideMenu';

function App() {


  return (
    <Fragment>
      <Titlebar />
      <SimpleSidebar></SimpleSidebar>
    </Fragment>
  );
}

export default App;
