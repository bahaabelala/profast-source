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
	deleteTask: taskID => {}
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
  	// Removing the targetted task from the list of tasks
    const updatedTasks = tasksMethods.deleteTask(tasks, taskID);

    // Updating the state
    setTasks(updatedTasks);

    // Updating the local storage
    setLocalStorage('dailyTasks', updatedTasks)
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
		deleteTask: handleDeleteTask
	};

	return (
		<TasksContext.Provider value={context}>
			{props.children}
		</TasksContext.Provider>
	);
}



export default TasksContext;