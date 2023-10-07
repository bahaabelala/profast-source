import Image from 'next/image';
import styles from './styles.module.css';

import Navigation from './Navigation/index';
import User from './User/index';
import SettingsIcon from '../../icons/SettingsIcon';


const MainHeader = props => {
  return (
    <header className={styles.MainHeader}>
      <Image src="/logo.svg" alt="Productivity Logo" width="120" height="30" />
      <Navigation />
      <User />
      <div className={styles.settingsIconContainer}>
        <SettingsIcon />
      </div>
    </header>
  );
};

export default MainHeader;
