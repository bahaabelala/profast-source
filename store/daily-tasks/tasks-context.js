import React, { useState, useEffect, useContext } from 'react';
import { setLocalStorage, getLocalStorage } from '../../utils/local-storage-util';
import NotificationContext from '../notification-context';
import * as tasksMethods from '../../utils/tasks-methods-util.js';

const TasksContext = React.createContext({
	tasks: new Array(),
	actingTask: false,
	editData: null,
	toggleActingTask: () => {},
	submitTaskForm: (taskData, activeDay) => {},
	selectTask: taskID => {},
	editTask: taskData => {},
	deleteTask: taskID => {},

	/* ========= SUBTASKs METHODs ========= */ 

	toggleSubtasksContainer: taskID => {},
	toggleAddingSubtask: taskID => {},
	addSubtask: (targetedTaskId, newSubtask) => {},
	markSubtask: (taskId, subtaskId) => {},
	deleteSubtask: (taskId, subtaskId) => {}
});

export const TasksContextProvider = props => {
	const notificationCtx = useContext(NotificationContext);
	const [tasks, setTasks] = useState(new Array()),
				[actingTask, setActingTask] = useState(false),
				[editData, setEditData] = useState(null);


	// =============== ON STARTUP ===============

	useEffect(() => {
		setTasks(getLocalStorage('dailyTasks') || new Array());
	}, [])

	// ================ METHODS =================

	// > By setting this, the new-task form is opened or closed
	const handleToggleActingTask = () => {
		
		setActingTask(prevState => {

			// To remove any data in the form fields before closing the form
			if (prevState)
				setEditData(null);

			return !prevState;

		});
	
	}

	// > Adding new task to the currently opened day
  // > OR editing some existing task
	const handleSubmitTaskForm = (taskData, activeDay) => {
		// 1. Checking if this task already exists, so that it will be edited
		const updatedTasks = tasksMethods.addOrEditTask(tasks, taskData, notificationCtx, activeDay);
		setEditData(null);

    // 2. Updating the state
    setTasks(updatedTasks);

    // 3. Updating the local storage
    setLocalStorage('dailyTasks', updatedTasks)
	} 

	// > Mark the selected (clicked) task as completed or uncompleted
	const handleSelectTask = taskID => {
		// mark the selected task
		const updatedTasks = tasksMethods.markTask(tasks, taskID);

    // Setting the new state
    setTasks(updatedTasks);

    // Updating the local storage
    setLocalStorage('dailyTasks', updatedTasks);
	}

	// > Handles editing task
	const handleEditTask = taskID => {
    // 1. Getting the data of the targetted task
    const taskObject = tasksMethods.getEditedTaskData(tasks, taskID);

    // 2. Passing the data to the task action form and let the form complete the process
    if (!actingTask) handleToggleActingTask();
    setEditData(taskObject);
  }

  // > Handles deleting task
  const handleDeleteTask = taskID => {
  	// 1. Removing the targetted task from the list of tasks
    const updatedTasks = tasksMethods.deleteTask(tasks, taskID);

    // 2. Updating the state
    setTasks(updatedTasks);

    // 3. Updating the local storage
    setLocalStorage('dailyTasks', updatedTasks)
  }

  // ===============================
  // == SUBTASKs SPECIFIC METHODs ==
  // ===============================

  // > Handles switching subtasks container (toggle it to open or close)
  const handleToggleSubtasksContainer = taskID => {
  	// 1. Toggling the state of the container in the targeted task by its id (taskID)
  	const updatedTasks = tasksMethods.toggleSubtasksContainer(tasks, taskID);

  	// 2. Updating the state
  	setTasks(updatedTasks);

  	// 3. Updating the local storage
  	setLocalStorage('dailyTasks', updatedTasks)
  }

  // > Handles switching subtask form
  const handleToggleAddingSubtask = taskID => {
  	const updatedTasks = [ ...tasks ];

  	// 1. Finding the targeted task
  	const targetedTaskIndex = updatedTasks.findIndex(task => task.id === taskID);

  	// 2. Toggling the boolean value of adding subtask form status
  	updatedTasks[targetedTaskIndex].addingSubtask = !updatedTasks[targetedTaskIndex].addingSubtask;

  	// 3. Show subtasks container (because it might be closed while adding-subtask form
  	// ...is opened)
  	updatedTasks[targetedTaskIndex].isSubtasksShown = true;

  	// 4. Updating the state
  	setTasks(updatedTasks);

  	// 5. Updating the local storage
  	setLocalStorage('dailyTasks', updatedTasks);
  }

  // > Adding new subtask to a targeted task
  const handleAddSubtask = (targetedTaskId, newSubtask) => {
  	const updatedTasks = [ ...tasks ];

  	// 1. Finding the targeted task
  	const targetedTaskIndex = updatedTasks.findIndex(task => task.id === targetedTaskId);

  	// 2. Adding the subtask to the targeted task by using its index
  	updatedTasks[targetedTaskIndex].subtasks.push(newSubtask);

  	// 3. Updating the state
  	setTasks(updatedTasks);

  	// 4. Updating the local storage
  	setLocalStorage('dailyTasks', updatedTasks);
  }

  // > Handles marking a subtask as done or non-done
  const handleMarkSubtask = (taskId, subtaskId) => {
  	const updatedTasks = [ ...tasks ];

  	// 1. Finding the targeted task
  	const targetedTaskIndex = updatedTasks.findIndex(task => task.id === taskId);

  	// 2. Finding the targeted subtask in the targeted task
  	const targetedSubtaskIndex =
  		updatedTasks[targetedTaskIndex].subtasks.findIndex(subtask => subtask.id === subtaskId);

  	// 3. Marking the targeted subtask
  	updatedTasks[targetedTaskIndex].subtasks[targetedSubtaskIndex].isDone =
  		!updatedTasks[targetedTaskIndex].subtasks[targetedSubtaskIndex].isDone;

  	// 4. Updating the state
  	setTasks(updatedTasks);

  	// 5. Updating the local storage
  	setLocalStorage('dailyTasks', updatedTasks);
  }

  // > Handles deleting a subtask
  const handleDeleteSubtask = (taskId, subtaskId) => {
  	const updatedTasks = [ ...tasks ];

  	// 1. Finding the targeted task
  	const targetedTaskIndex = updatedTasks.findIndex(task => task.id === taskId);

  	// 2. Finding the targeted subtask in the targeted task
  	const targetedSubtaskIndex =
  		updatedTasks[targetedTaskIndex].subtasks.findIndex(subtask => subtask.id === subtaskId);

  	// 3. Marking the targeted subtask
  	updatedTasks[targetedTaskIndex].subtasks.splice(targetedSubtaskIndex, 1);

  	// 4. Updating the state
  	setTasks(updatedTasks);

  	// 5. Updating the local storage
  	setLocalStorage('dailyTasks', updatedTasks);
  }

	// ==========================================


	// Setting the context data that is provided to the wrapped component
	const context = {
		tasks: tasks,
		actingTask: actingTask,
		editData: editData,
		toggleActingTask: handleToggleActingTask,
		submitTaskForm: handleSubmitTaskForm,
		selectTask: handleSelectTask,
		editTask: handleEditTask,
		deleteTask: handleDeleteTask,

		/* ========= SUBTASKs METHODs ========= */ 
		
		toggleSubtasksContainer: handleToggleSubtasksContainer,
		toggleAddingSubtask: handleToggleAddingSubtask,
		addSubtask: handleAddSubtask,
		markSubtask: handleMarkSubtask,
		deleteSubtask: handleDeleteSubtask
	};

	return (
		<TasksContext.Provider value={context}>
			{props.children}
		</TasksContext.Provider>
	);
}



export default TasksContext;