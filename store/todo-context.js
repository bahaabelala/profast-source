import { createContext, useState, useContext, useEffect } from 'react';
import NotificationContext from '../store/notification-context';
import { setLocalStorage, getLocalStorage } from '../utils/local-storage-util';
import * as tasksMethods from '../utils/tasks-methods-util.js';

const TodoContext = createContext({
	tasks: new Array(),
	actingTask: false,
	editData: null,
	toggleActingTask: () => {},
	submitTaskForm: taskContent => {},
	selectTask: taskID => {},
	editTask: (taskID, newTaskData) => {},
	deleteTask: taskID => {},
	deleteAllTasks: () => {}
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

	// > To open or close the form
	const handleToggleActingTask = () => {

		setActingTask(prevState => {

			if (prevState)
				setEditData(null);

			return !prevState;

		});
		
	}


	// > Adding task procedure
	const handleSubmitTaskForm = taskData => {
		// 1. Checking if this process is editing an existing task or adding new task,
		//			then doing the proper process
		const updatedTasks = tasksMethods.addOrEditTask(tasks, taskData, notificationCtx);
		setEditData(null);

		// 2. updating the list in the state
		setTasks(updatedTasks);

		// 3. update the local storage
		setLocalStorage('todoTasks', updatedTasks)
	}

	// > Mark the selected (clicked) task as completed or uncompleted
	const handleSelectTask = taskID => {
		// 1. mark the selected task
		const updatedTasks = tasksMethods.markTask(tasks, taskID);

    // 2. Setting the new state
    setTasks(updatedTasks);

    // 3. Updating the local storage
    setLocalStorage('todoTasks', updatedTasks)
	}

	// > Deleting task procedure
	const handleDeleteTask = taskID => {
		// 1. Removing the targetted task from the list of tasks
    const updatedTasks = tasksMethods.deleteTask(tasks, taskID);

    // 2. Updating the state
    setTasks(updatedTasks);

    // 3. Updating the local storage
    setLocalStorage('todoTasks', updatedTasks);
	}

	// > Editing task procedure
	const handleEditTask = taskID => {
		// 1. Getting the data of the targetted task
    const taskObject = tasksMethods.getEditedTaskData(tasks, taskID);

    // 2. Passing the data to the task action form and let the form complete the process
    if (!actingTask) handleToggleActingTask();
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


	// ==========================================


	// Setting the context data that is provided to the wrapped component
	const context = {
		tasks,
		actingTask,
		editData,
		submitTaskForm: handleSubmitTaskForm,
		deleteTask: handleDeleteTask,
		editTask: handleEditTask,
		toggleActingTask: handleToggleActingTask,
		selectTask: handleSelectTask,
		deleteAllTasks: handleDeleteAllTasks
	};

	return (
		<TodoContext.Provider value={context}>
			{props.children}
		</TodoContext.Provider>
	);
}


export default TodoContext;