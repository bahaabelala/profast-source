import React, { useState, useRef, useContext } from 'react';
import styles from './TaskBody.module.css';

import DragIcon from '../../../icons/DragIcon';
import MoreIcon from '../../../icons/MoreIcon';
import EditIcon from '../../../icons/EditIcon';
import DeleteIcon from '../../../icons/DeleteIcon';
import AddIcon from '../../../icons/AddIcon';
import useClickOutside from '../../../../hooks/useClickOutside';
import TasksContext from '../../../../store/daily-tasks/tasks-context';


const TaskBody = (props) => {
  const [isDropActive, setIsDropActive] = useState(false);
  const dropdownRef = useRef(null);
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

  // Toggling task more-icon dropdown to edit or delete
  const handleActivateDropdown = () => {
    setIsDropActive(prevState => !prevState);
  }

  // Handle Clicking outside the dropdown container ( + more-icon container )
  useClickOutside(dropdownRef, e => {
    if (!e.target.closest(`.${props.taskID}`)) {
      setIsDropActive(false)
    } 
  });


  return (
    <div className={[
      styles.TaskBody,
      styles[props.taskStatus],
      props.isSubtasksShown ? styles.withSubtasksShown : ''
        ].join(' ')}>
      <div className={styles.dragIconContainer}>
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

      {/* ===== Subtasks Arrow ===== */}

      <i
        className={[
          "ri-play-circle-line",
          styles.subtasksArrow,
          props.isSubtasksShown ? styles.active : ''
        ].join(' ')}
        onClick={() => { props.onSubtasksArrowClicked(props.taskID) }}
        ></i>

      {/* ========================== */}

      <div
        className={[
            styles.moreIconContainer,
            /* note: this class is for this element to be unique (NOT for styling) */
            /* ==> for handling clicking outside */
            props.taskID
          ].join(' ')}
        onClick={handleActivateDropdown}
        >
        <MoreIcon />
      </div>



      {/* ============================ */}
      {/* ======== DROPDOWN ========== */}
      {/* ============================ */}


      <div
        className={[styles.moreDropdown, isDropActive ? styles.activeDropdown : ''].join(' ')}
        ref={dropdownRef}
        >
        <a onClick={() => {
          props.onEditTaskClicked(props.taskID);
          setIsDropActive(false);
          }} className={styles.editButton}>
          <EditIcon /> Edit
        </a>
        <a onClick={() => { props.onDeleteTaskClicked(props.taskID) }} className={styles.deleteButton}>
          <i className="ri-close-circle-line"></i> Delete
        </a>
        <a onClick={() => {
            props.onAddSubtaskClicked(props.taskID);
            setIsDropActive(false);
          }} className={styles.addSubtaskButton}>
          <AddIcon /> Add Subtask
        </a>
      </div>

    </div>
  )
}

export default TaskBody;