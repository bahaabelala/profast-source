import React from 'react';
import styles from './TaskSet.module.css';
import subtasksContainerStyles from '../SubtasksContainer/SubtasksContainer.module.css';

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
        isThereSubtasks={props.subtasks.length > 0}
        onTaskBodyClicked={props.onTaskBodyClicked}
        onSubtasksArrowClicked={props.onSubtasksArrowClicked}
        onEditTaskClicked={props.onEditTaskClicked}
        onDeleteTaskClicked={props.onDeleteTaskClicked}
        onAddSubtaskClicked={props.onAddSubtaskClicked}
    		>
    		{props.children}
    	</TaskBody>

    	{/* ================================ */}

    	{/* ========= THE SUBTASKS ========= */}

    	<SubtasksContainer isActive={props.isSubtasksShown}>
        
        {props.subtasks.map(subtask => {
          return (
            <SubtaskBody
              key={subtask.id}  
              subtaskId={subtask.id}
              done={subtask.isDone}
              taskId={props.taskID}
              onSubtaskClicked={props.onSubtaskClicked}
              onDeleteSubtaskClicked={props.onDeleteSubtaskClicked}
              >
              {subtask.content}
            </SubtaskBody>
          );
        })}

        {
          props.addingSubtask ? 
            <SubtaskBody
              isForm
              taskId={props.taskID} 
              addingSubtask={props.addingSubtask}
              onSubtaskFormSubmitted={props.onSubtaskFormSubmitted}
              onCancelFormClicked={props.onCancelFormClicked}
              /> 
            : null
        }
    	
      </SubtasksContainer>

    	{/* ================================ */}

    </div>
  )
}

export default TaskSet;