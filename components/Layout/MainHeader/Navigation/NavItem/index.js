import React from 'react';
import styles from './styles.module.css';
import Link from 'next/link';

const NavItem = props => {
  return (
    <Link
      href={props.linkURL}
      className={[
          styles.NavItem,
          props.active ? styles.active : '',
          props.disabled ? styles.disabled : ''
        ].join(' ')}
      onClick={props.click}
      >
      {props.children}
    </Link> 
  );
};

export default NavItem;
