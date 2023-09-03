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
	deleteAllTasks: () => {},

	/* ========= SUBTASKs METHODs ========= */ 

	toggleSubtasksContainer: taskID => {},
	toggleAddingSubtask: taskID => {},
	addSubtask: (targetedTaskId, newSubtask) => {},
	markSubtask: (taskId, subtaskId) => {},
	deleteSubtask: (taskId, subtaskId) => {}	
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
    const taskObject = tasksMethods.getEditedTaskData(taskId, tasks);

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

	// ===============================
  // == SUBTASKs SPECIFIC METHODs ==
  // ===============================

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
		toggleActingTask: handleToggleActingTask,
		selectTask: handleSelectTask,
		deleteAllTasks: handleDeleteAllTasks,

		/* ========= SUBTASKs METHODs ========= */ 
		
		toggleSubtasksContainer: handleToggleSubtasksContainer,
		toggleAddingSubtask: handleToggleAddingSubtask,
		addSubtask: handleAddSubtask,
		markSubtask: handleMarkSubtask,
		deleteSubtask: handleDeleteSubtask
	};

	return (
		<TodoContext.Provider value={context}>
			{props.children}
		</TodoContext.Provider>
	);
}


export default TodoContext;