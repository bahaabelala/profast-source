import React from 'react';
import styles from './TasksContainer.module.css';
import { handleDragOver } from '../../../../utils/drag-util';

const TasksContainer = (props) => {

  return (
    <section
      className={styles.TasksContainer}
      onDragOver={e => { handleDragOver(e, styles.TasksContainer) }}
      >
    	{props.children}
    </section>
  )
}

export default TasksContainer;