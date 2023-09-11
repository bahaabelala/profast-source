import React, { useState, useRef, useContext } from 'react';
import styles from './TaskBody.module.css';
import taskSetClasses from '../TaskSet/TaskSet';

import DragIcon from '../../../icons/DragIcon';
import MoreIcon from '../../../icons/MoreIcon';
import EditIcon from '../../../icons/EditIcon';
import DeleteIcon from '../../../icons/DeleteIcon';
import AddIcon from '../../../icons/AddIcon';
import useClickOutside from '../../../../hooks/useClickOutside';
import TasksContext from '../../../../store/daily-tasks/tasks-context';


const TaskBody = (props) => {
  const [isActionCenterActive, setIsActionCenterActive] = useState(false);
  const actionCenterRef = useRef(null);
  const taskStatusIconClass = (
      props.taskStatus === 'done' ? "ri-checkbox-circle-fill"
      : props.taskStatus === 'doing' ? "ri-time-fill" : "ri-checkbox-blank-circle-line"
  );

  // This event is fired when the task content is clicked
  const handleClickedTask = e => {
    const taskEl = e.target.closest(`.${styles.TaskBody}`);

    // 1. handling the click event (changing the status of the task)
    props.onTaskBodyClicked(props.taskID);

    // 2. Style this task as todo, doing, or done
    taskEl.classlist = Array.from(taskEl.classList).pop();
    taskEl.classList.add(styles[props.taskStatus]);
  }

  // Toggling task more-icon action center to edit or delete
  const handleToggleActionCenter = () => {
    setIsActionCenterActive(prevState => !prevState);
  }

  // Handle Clicking outside the action center container ( + more-icon container )
  useClickOutside(actionCenterRef, e => {
    if (!e.target.closest(`.${props.taskID}`)) {
      setIsActionCenterActive(false)
    } 
  });


  return (
    <div className={[
      styles.TaskBody,
      styles[props.taskStatus],
      props.isSubtasksShown ? styles.withSubtasksShown : ''
        ].join(' ')}>

      <div
        className={styles.dragIconContainer}
        onMouseDown={props.onMakeDraggable}
        onMouseLeave={props.onMakeUndraggable}
        >
        <DragIcon />
      </div>

      {/* ===== Task-Status Badge ===== */}

      <i
        className={[styles.taskStatusBadge, taskStatusIconClass].join(' ')}
        onClick={handleClickedTask}
        ></i>

      {/* ============================= */}


      <div className={styles.taskContent} onClick={handleClickedTask}>
        {props.children}
      </div>

      {/* =============================================== */}
      {/* ==== Subtasks Buttons (Arrow & Add Button) ==== */}
      {/* =============================================== */}

      <div className={styles.subtasksBtnsContainer}>

        {
          props.isThereSubtasks ?
            <i
              className={[
                "ri-play-circle-line",
                styles.subtasksArrow,
                props.isSubtasksShown ? styles.active : ''
              ].join(' ')}
              onClick={() => { props.onSubtasksArrowClicked(props.taskID) }}
              title={props.isSubtasksShown ? "Hide Subtasks" : "Show Subtasks"}
              >  
            </i>
            : null
        }

        <a
          onClick={() => {
              props.onAddSubtaskClicked(props.taskID);
              setIsActionCenterActive(false);
            }}
          className={styles.addSubtaskButton}
          title="Add a Subtask"
          >
          <AddIcon />
        </a>
      </div>

      {/* ========================== */}

      {
        !isActionCenterActive ?
          <div
            className={[
                styles.moreIconContainer,
                /* note: this class is for this element to be unique (NOT for styling) */
                /* ==> for handling clicking outside */
                props.taskID
              ].join(' ')}
            onClick={handleToggleActionCenter}
            >
            <MoreIcon />
          </div>
          : null
      }
    

      {/* ====================================== */}
      {/* ======== TASK ACTION CENTER ========== */}
      {/* ====================================== */}


      {
        isActionCenterActive ?
          <div
            className={styles.actionCenter}
            ref={actionCenterRef}
            >
            <a
              onClick={() => {
                  props.onEditTaskClicked(props.taskID);
                  setIsActionCenterActive(false);
                }}
              className={styles.editButton}
              title="Edit Task"
              >
              <EditIcon />
            </a>
            <a
              onClick={() => { props.onDeleteTaskClicked(props.taskID) }}
              className={styles.deleteButton}
              title="Delete Task"
              >
              <i className="ri-close-circle-line"></i>
            </a>
          </div>
          : null
      }
      

    </div>
  )
}

export default TaskBody;