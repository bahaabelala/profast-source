import React from 'react';
import styles from './TaskSet.module.css';

import TaskBody from '../TaskBody/TaskBody';
import SubtasksContainer from '../SubtasksContainer/SubtasksContainer';
import SubtaskBody from '../SubtaskBody/SubtaskBody';

const TaskSet = (props) => {
  return (
    <div className={styles.Main}>

			{/* ======== THE MAIN TASK ========= */}

    	<TaskBody
    		taskID={props.taskID}
        click={props.onClicked}
        editTaskClicked={props.onEditTaskClicked}
        deleteTaskClicked={props.onDeleteTaskClicked}
        taskStatus={props.taskStatus}
    		>
    		{props.children}
    	</TaskBody>

    	{/* ================================ */}

    	{/* ========= THE SUBTASKS ========= */}

    	<SubtasksContainer>
    		<SubtaskBody>Enim dolor minim velit.</SubtaskBody>
    		<SubtaskBody done>In sint exercitation.</SubtaskBody>
        <SubtaskBody isForm />
    	</SubtasksContainer>

    	{/* ================================ */}

    </div>
  )
}

export default TaskSet;