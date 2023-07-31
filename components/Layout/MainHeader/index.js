import React from 'react';
import styles from './styles.module.css';

import Navigation from './Navigation/index';
import User from './User/index';
import SettingsIcon from '../../icons/SettingsIcon';


const MainHeader = props => {
  return (
    <header className={styles.MainHeader}>
      <h1 className={styles.mainTitle}>
        Pro<i>Fast</i>
      </h1>
      <Navigation />
      <User />
      <div className={styles.settingsIconContainer}>
        <SettingsIcon />
      </div>
    </header>
  );
};

export default MainHeader;
