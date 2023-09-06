import React, { useState, useEffect, useContext } from 'react';
import { setLocalStorage, getLocalStorage } from '../../utils/local-storage-util';
import NotificationContext from '../notification-context';
import * as tasksMethods from '../../utils/tasks-methods-util';

const TasksContext = React.createContext({
	tasks: new Array(),
	actingTask: false,
	editData: null,
	closeTaskActForm: () => {},
	openTaskActForm: () => {},
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


	// > Adding new task to the currently opened day
  // > OR editing some existing task
	const handleSubmitTaskForm = (taskData, activeDay) => {

		doTaskProcess(
			taskData.id, 
			tasksMethods.addOrEditTask, 
			[taskData, notificationCtx, activeDay]
		);
		setEditData(null);

	} 

	// > Mark the selected (clicked) task as completed or uncompleted
	const handleSelectTask = taskId => {
		
		doTaskProcess(taskId, tasksMethods.selectTask, []);

	}

	// > Handles editing task
	const handleEditTask = taskId => {
		// 1. Getting the data of the targetted task
	  const taskObject = tasksMethods.getEditedTaskData(taskId, tasks);

    // 2. Passing the data to the task action form and let the form complete the process
    if (!actingTask) handleOpenTaskActForm();
    setEditData(taskObject);
  }

  // > Handles deleting task
  const handleDeleteTask = taskId => {
  	
  	doTaskProcess(taskId, tasksMethods.deleteTask, []);

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
  	setLocalStorage('dailyTasks', updatedTasks);
	}

	// ==========================================


	// Setting the context data that is provided to the wrapped component
	const context = {
		tasks: tasks,
		actingTask: actingTask,
		editData: editData,
		closeTaskActForm: handleCloseTaskActForm,
		openTaskActForm: handleOpenTaskActForm,
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