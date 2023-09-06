import React from 'react';
import styles from './SubtasksContainer.module.css';
import { handleDragOver } from '../../../../utils/drag-util';

const SubtasksContainer = (props) => {

  return (
    <ol
      className={[styles.Main, !props.isActive ? styles.closed : ''].join(' ')}
      >
    	{props.children}
    </ol>
  )
}

export default SubtasksContainer;