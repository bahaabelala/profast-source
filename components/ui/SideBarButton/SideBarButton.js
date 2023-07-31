import React from 'react';
import styles from './SideBarButton.module.css';

const SideBarButton = (props) => {
  return (
    <button
      className={[styles.SideBarButton, props.active ? styles.active : ''].join(' ')}
      onClick={() => { props.click(props.dayID) }}
      >
    	{props.text}
    </button>
  )
}

export default SideBarButton;