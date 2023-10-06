"use client";

import React, { useRef } from 'react';
import styles from './TasksContainer.module.css';
import subtasksContainerClasses from '../SubtasksContainer/SubtasksContainer.module.css';

import { handleDragOver } from '../../../../utils/drag-util';

const TasksContainer = (props) => {

  return (
    <section
      className={styles.TasksContainer}
      onDragOver={e => {
        handleDragOver(e, styles.TasksContainer, subtasksContainerClasses.active);
      }}
      >
    	{props.children}
    </section>
  )
}

export default TasksContainer;