"use client";

import { createContext, useState, useContext, useEffect } from 'react';
import NotificationContext from './notification-context';
import { setLocalStorage, getLocalStorage } from '../utils/local-storage-util';
import * as tasksMethods from '../utils/tasks-methods-util.js';

const TodoContext = createContext({
	tasks: new Array(),
	actingTask: false,
	editData: null,
	closeTaskActForm: () => {},
	openTaskActForm: () => {},
	submitTaskForm: taskContent => {},
	selectTask: taskID => {},
	editTask: (taskID, newTaskData) => {},
	deleteTask: taskID => {},
	deleteAllTasks: () => {},
	dragTask: (startPosition, endPosition) => {},

	/* ========= SUBTASKs METHODs ========= */ 

	toggleSubtasksContainer: taskID => {},
	toggleAddingSubtask: taskID => {},
	addSubtask: (targetedTaskId, newSubtask) => {},
	markSubtask: (taskId, subtaskId) => {},
	deleteSubtask: (taskId, subtaskId) => {},
	dragSubtask: (taskId, startPosition, endPosition) => {}	
});

export const TodoContextProvider = props => {
	const notificationCtx = useContext(NotificationContext);
	const	[tasks, setTasks] = useState(new Array()),
				[actingTask, setActingTask] = useState(false),
				[editData, setEditData] = useState(null);


	// =============== ON STARTUP ===============

	useEffect(() => {
		setTasks(getLocalStorage('todoTasks') || new Array());
	}, [])

	// ================ METHODS =================

	// > By setting this, the task-action form is closed
	const handleCloseTaskActForm = () => {
		
		setActingTask(prevState => {

			// To remove any data in the form fields before closing the form
			if (prevState)
				setEditData(null);

			return false;

		});
	
	}

	// > Tp open the task-action form
	const handleOpenTaskActForm = () => {
		setActingTask(true)
	}


	// > Adding task procedure
	const handleSubmitTaskForm = taskData => {

		doTaskProcess(taskData.id, tasksMethods.addOrEditTask, [taskData, notificationCtx]);
		setEditData(null);
	
	}

	// > Mark the selected (clicked) task as completed or uncompleted
	const handleSelectTask = taskId => {

		doTaskProcess(taskId, tasksMethods.selectTask, []);

	}

	// > Deleting task procedure
	const handleDeleteTask = taskId => {

		doTaskProcess(taskId, tasksMethods.deleteTask, []);
	
	}

	// > Editing task procedure
	const handleEditTask = taskId => {
		// 1. Getting the data of the targetted task
    const taskObject = tasksMethods.getEditedData(taskId, tasks);

    // 2. Passing the data to the task action form and let the form complete the process
    if (!actingTask) handleOpenActingTask();
    setEditData(taskObject);
	}

	// > Deleting all tasks
	const handleDeleteAllTasks = () => {
		// .. Closing the form of acting task (if it is opened)
		if (actingTask) handleToggleActingTask();

		// 1. Confirming that the user already want to delete all the todo-tasks
		const confirmation = window.confirm("Are you sure, you want to delete ALL todo tasks?\nYou are going to delete them permenantly!!");
		if (!confirmation) return;

		// 2. Delete all todo-tasks from the store
		setTasks(new Array());

		// 3. Delete all todo-tasks from the Local Storage
		setLocalStorage('todoTasks', new Array());
	}

	// > Handles Changing the position of task due to drag and drop effect
  const handleDragTask = (startPosition, endPosition) => {
  	const tasksList = [ ...tasks ];

  	// 1. Getting the new tasks list after dragging
  	const updatedTasks = tasksMethods.moveItemFromTo(tasksList, startPosition, endPosition);

  	// 2. Updating the state
  	setTasks(updatedTasks);

  	// 3. Updating the local storage
  	setLocalStorage('todoTasks', updatedTasks);
  }



	// =============================================================================
  // ========================= SUBTASKs SPECIFIC METHODs =========================
  // =============================================================================

  // > Handles switching subtasks container (toggle it to open or close)
  const handleToggleSubtasksContainer = taskId => {

	  doTaskProcess(taskId, tasksMethods.toggleSubtasksContainer, []);
	  
  }

  // > Handles switching subtask form
  const handleToggleAddingSubtask = taskId => {

  	doTaskProcess(taskId, tasksMethods.toggleAddingSubtask, []);

  }

  // > Adding new subtask to a targeted task
  const handleAddSubtask = (taskId, newSubtask) => {

  	doTaskProcess(taskId, tasksMethods.addSubtask, [newSubtask]);
  	
  }

  // > Handles marking a subtask as done or non-done
  const handleMarkSubtask = (taskId, subtaskId) => {

  	doTaskProcess( taskId, tasksMethods.markSubtask, [subtaskId]);

  }

  // > Handles deleting a subtask
  const handleDeleteSubtask = (taskId, subtaskId) => {

  	doTaskProcess( taskId, tasksMethods.deleteSubtask, [subtaskId]);

  }

  // > Handles Changing the position of task due to drag and drop effect
  const handleDragSubtask = (taskId, startPosition, endPosition) => {
  	const updatedTasks = [ ...tasks ];

  	// 1. Finding the targeted task
  	const targetedTaskIndex = updatedTasks.findIndex(task => task.id === taskId);

  	// 2. Getting the new subtasks list after dragging
  	const updatedSubtasks = tasksMethods.moveItemFromTo(
  		updatedTasks[targetedTaskIndex].subtasks,
  		startPosition,
  		endPosition
  	);

  	// 3. Updating the task that has the updated subtasks
  	updatedTasks[targetedTaskIndex].subtasks = updatedSubtasks;

  	// 4. Updating the state
  	setTasks(updatedTasks);

  	// 5. Updating the local storage
  	setLocalStorage('todoTasks', updatedTasks);
  }




	// > This is for finding the targeted task and pass what-to-do-with-it as a function
  // > You have to return the updated tasks in the processFunc
	const doTaskProcess = (taskId, processFunc, processFuncArgs) => {
		const processTasks = [ ...tasks ];

  	// 1. Finding the targeted task
  	const targetedTaskIndex = processTasks.findIndex(task => task.id === taskId);

  	// 2. Do the needed process with the targeted task
  	// --------

  	const updatedTasks = processFunc(processTasks, targetedTaskIndex, ...processFuncArgs);

  	// --------

  	// 3. Updating the state
  	setTasks(updatedTasks);

  	// 4. Updating the local storage
  	setLocalStorage('todoTasks', updatedTasks);
	}

	// ==========================================


	// Setting the context data that is provided to the wrapped component
	const context = {
		tasks,
		actingTask,
		editData,
		submitTaskForm: handleSubmitTaskForm,
		deleteTask: handleDeleteTask,
		editTask: handleEditTask,
		closeTaskActForm: handleCloseTaskActForm,
		openTaskActForm: handleOpenTaskActForm,
		selectTask: handleSelectTask,
		deleteAllTasks: handleDeleteAllTasks,
		dragTask: handleDragTask,

		/* ========= SUBTASKs METHODs ========= */ 
		
		toggleSubtasksContainer: handleToggleSubtasksContainer,
		toggleAddingSubtask: handleToggleAddingSubtask,
		addSubtask: handleAddSubtask,
		markSubtask: handleMarkSubtask,
		deleteSubtask: handleDeleteSubtask,
		dragSubtask: handleDragSubtask
	};

	return (
		<TodoContext.Provider value={context}>
			{props.children}
		</TodoContext.Provider>
	);
}


export default TodoContext;