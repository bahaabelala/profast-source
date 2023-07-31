import React from 'react';
import styles from './SubtasksContainer.module.css';

const SubtasksContainer = (props) => {
  return (
    <ol className={styles.Main}>
    	{props.children}
    </ol>
  )
}

export default SubtasksContainer;