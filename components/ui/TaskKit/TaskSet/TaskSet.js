import React from 'react';
import styles from './TaskSet.module.css';

import TaskBody from '../TaskBody/TaskBody';
import SubtasksContainer from '../SubtasksContainer/SubtasksContainer';
import SubtaskBody from '../SubtaskBody/SubtaskBody';
import {
  handleDragStart,
  handleDragEnd
} from '../../../../utils/drag-util.js';

const TaskSet = (props) => {
  return (
    <div
      className={styles.Main}
      onDragStart={e => { handleDragStart(e, 'dragging') }}
      onDragEnd={e => { handleDragEnd(e, 'dragging') }}
      draggable
      >

			{/* ======== THE MAIN TASK ========= */}

    	<TaskBody
    		taskID={props.taskID}
        taskStatus={props.taskStatus}
        isSubtasksShown={props.isSubtasksShown}
        addingSubtask={props.addingSubtask}
        click={props.onClicked}
        editTaskClicked={props.onEditTaskClicked}
        deleteTaskClicked={props.onDeleteTaskClicked}
    		>
    		{props.children}
    	</TaskBody>

    	{/* ================================ */}

    	{/* ========= THE SUBTASKS ========= */}

    	<SubtasksContainer isActive={props.isSubtasksShown}>
        
        {props.subtasks.map(subtask => {
          return (
            <SubtaskBody key={subtask.id} subtaskId={subtask.id} done={subtask.isDone} taskId={props.taskID}>
              {subtask.content}
            </SubtaskBody>
          );
        })}

        {props.addingSubtask ? <SubtaskBody isForm taskId={props.taskID} addingSubtask={props.addingSubtask} /> : null}
    	
      </SubtasksContainer>

    	{/* ================================ */}

    </div>
  )
}

export default TaskSet;