import React, { Fragment, useContext } from 'react';
import styles from './SubtaskBody.module.css';
import TasksContext from '../../../../store/daily-tasks/tasks-context';

import SubtaskAddForm from '../SubtaskAddForm/SubtaskAddForm';



const SubtaskBody = (props) => {
	const mainStyles = [styles.Main];
  let subtaskStatusBadge = "ri-checkbox-blank-circle-line";
	if (props.done) {
    mainStyles.push(styles.done);
    subtaskStatusBadge = "ri-checkbox-circle-fill";
  };


  return (
    <li className={mainStyles.join(' ')}>
    {
      props.isForm ?
        <SubtaskAddForm
          addingSubtask={props.addingSubtask}
          taskId={props.taskId}
          onSubtaskFormSubmitted={props.onSubtaskFormSubmitted}
          />
        : (
          <Fragment>
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
          </Fragment>
        )
    }
    </li>
  );
}

export default SubtaskBody;