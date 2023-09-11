import React, { useState } from 'react';
import styles from './TaskSet.module.css';

import TaskBody from '../TaskBody/TaskBody';
import SubtasksContainer from '../SubtasksContainer/SubtasksContainer';
import SubtaskBody from '../SubtaskBody/SubtaskBody';
import {
  handleDragStart,
  handleDragEnd
} from '../../../../utils/drag-util.js';

const TaskSet = (props) => {
  // This state property is for dragging by the drag icon
  const [isDraggable, setIsDraggable] = useState(false);

  return (
    <div
      className={styles.Main}
      onDragStart={e => { handleDragStart(e.target, 'dragging') }}
      onDragEnd={e => { handleDragEnd(e.target, 'dragging') }}
      draggable={isDraggable}
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
        onMakeDraggable={() => { setIsDraggable(true) }}
        onMakeUndraggable={() => { setIsDraggable(false) }}
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