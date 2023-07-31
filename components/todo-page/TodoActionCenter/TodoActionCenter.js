import React from 'react';
import styles from './TodoActionCenter.module.css';
import AddIcon from '../../icons/AddIcon';
import DeleteIcon from '../../icons/DeleteIcon';


const TodoActionCenter = props => {
  return (
    <div className={styles.Main}>

    	<div
        className={styles.addTaskIconCont}
        title="Add new todo task"
        onClick={props.onAddTaskClicked}
        >
        <AddIcon />
      </div>

      <div
        className={styles.deleteDayIconCont}
        title="Delete all todo tasks"
        onClick={props.onDeleteAllTasksClicked}
        >
        <DeleteIcon />
      </div>

    </div>
  )
}

export default TodoActionCenter;