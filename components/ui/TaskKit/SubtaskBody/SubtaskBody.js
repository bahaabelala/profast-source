import React, { Fragment, useContext, useState, useEffect } from 'react';
import styles from './SubtaskBody.module.css';
import TasksContext from '../../../../store/daily-tasks/tasks-context';
import { handleDragStart, handleDragEnd } from '../../../../utils/drag-util.js';

import SubtaskAddForm from '../SubtaskAddForm/SubtaskAddForm';



const SubtaskBody = (props) => {
	const mainStyles = [styles.Main];
  let subtaskStatusBadge = "ri-checkbox-blank-circle-line";
	if (props.done) {
    mainStyles.push(styles.done);
    subtaskStatusBadge = "ri-checkbox-circle-fill";
  };

  // These for updating the store and local storage to save the new subtasks order resulting from dragging
  const [startDragPosition, setStartDragPosition] = useState(-1),
        [endDragPosition, setEndDragPosition] = useState(-1);

  useEffect(() => {
    if (startDragPosition !== -1 && endDragPosition !== -1) {
      props.onDragSubtask(props.taskId, startDragPosition, endDragPosition);
      setStartDragPosition(-1);
      setEndDragPosition(-1);
    }
  }, [endDragPosition]);
  


  return props.isForm ?
          <li className={mainStyles.join(' ')}>
            <SubtaskAddForm
              addingSubtask={props.addingSubtask}
              taskId={props.taskId}
              onSubtaskFormSubmitted={props.onSubtaskFormSubmitted}
              onCancelFormClicked={props.onCancelFormClicked}
              />
          </li>
          : (
              <li
                className={mainStyles.join(' ')}
                onDragStart={e => {
                  setStartDragPosition(handleDragStart(e.target, 'dragging'));
                  e.stopPropagation();
                }}
                onDragEnd={e => {
                  setEndDragPosition(handleDragEnd(e.target, 'dragging'));
                  e.stopPropagation();
                }}
                draggable
                >
                <i
                  className={[styles.subtaskStatusBadge, subtaskStatusBadge].join(' ')}
                  onClick={() => { props.onSubtaskClicked(props.taskId, props.subtaskId) }}
                  ></i>
                <p
                  className={styles.subtaskContent}
                  onClick={() => { props.onSubtaskClicked(props.taskId, props.subtaskId) }}
                  >
                  {props.children}
                </p>
                <i
                  className={[styles.deleteIcon, "ri-close-circle-line"].join(' ')}
                  onClick={() => { props.onDeleteSubtaskClicked(props.taskId, props.subtaskId) }}
                  ></i>
              </li>
          );
}

export default SubtaskBody;