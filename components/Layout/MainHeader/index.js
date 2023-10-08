import Image from 'next/image';
import styles from './styles.module.css';

import Navigation from './Navigation/index';
import User from './User/index';
import SettingsIcon from '../../icons/SettingsIcon';


const MainHeader = props => {
  return (
    <header className={styles.MainHeader}>
      <Image src="/logo.png" alt="Productivity Logo" width="144" height="36" />
      <Navigation />
      <User />
      <div className={styles.settingsIconContainer}>
        <SettingsIcon />
      </div>
    </header>
  );
};

export default MainHeader;
