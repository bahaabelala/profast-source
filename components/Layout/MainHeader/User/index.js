import React from 'react';
// import Image from 'next/image';

import styles from './styles.module.css';


const User = props => {
  return (
    <div className={styles.User}>
      <img
        src='https://randomuser.me/api/portraits/men/60.jpg'
        alt='user'
        className={styles.userImage}
        />
      <span className={styles.downTriangle}></span>
    </div>
  );
};

export default User;
