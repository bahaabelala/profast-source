import { TASK_STATUSES } from './tasks-constants-util';


// > ADD or EDIT Task
const addOrEditTask = (tasks, targetedTaskIndex, taskData, notificationCtx, activeDay = -1) => {

			// ADD or EDIT
			if (targetedTaskIndex === -1) {
		    if (activeDay === -1) {
		      tasks.push(taskData);
		    } else {
		      taskData.day = activeDay;
		      tasks.push(taskData);
		    }
		  } else {
		  	tasks.splice(targetedTaskIndex, 1, taskData);
		    notificationCtx.showNotification('Edited successfully!', 'success');
		  }

		  return tasks;

}

// > Handles selecting a task
const selectTask = (tasks, targetedTaskIndex) => {

	// Make the targeted task's status todo, doing, or done
  switch (tasks[targetedTaskIndex].status) {

    case TASK_STATUSES.todo:
      tasks[targetedTaskIndex].status = TASK_STATUSES.doing;
      break;

    case TASK_STATUSES.doing:
      tasks[targetedTaskIndex].status = TASK_STATUSES.done;
      break;

    default:
      tasks[targetedTaskIndex].status = TASK_STATUSES.todo;
      break;

	}

	return tasks;

}

// > Handles editing a task
const getEditedData = (itemId, list) => {
	const itemsList = [ ...list ]

	// 1. Finding the index of the targeted task
  const targetedItemIndex = itemsList.findIndex(item => item.id === itemId);

  // 2. Getting the targeted item from the list of items by its id
  const itemObject = { ...itemsList[targetedTaskIndex] }

  return itemObject;

}

// > Handles deleting task
const deleteTask = (tasks, targetedTaskIndex) => {

	// Removing the targeted task from the list of tasks
	tasks.splice(targetedTaskIndex, 1);

	return tasks;

}

// > Handles deleting day-specific tasks
const deleteDayTasks = (tasks, deletedDayId) => {
	const updatedTasks = [ ...tasks ];

	// Removing the day-specific tasks from the list of tasks
	for (let i = 0; i < updatedTasks.length; i++) {
		if (updatedTasks[i].day === deletedDayId) {
			updatedTasks.splice(i, 1);
			i--;
		}
	}

	return updatedTasks;

}




// ==================================================
// ================ SUBTASKs METHODs ================
// ==================================================

// > Handles Toggling Subtasks Container to open or close
const toggleSubtasksContainer = (tasks, targetedTaskIndex) => {

	// 1. Close all tasks' subtasks-container and all tasks' subtasks-forms
	tasks.forEach(task => {
		if (task.id !== tasks[targetedTaskIndex].id) {	
			task.isSubtasksShown = false;
		}
		task.addingSubtask = false;
	})

	// 2. Changing the state of the subtasks container
  // ...by changing the isSubtasksShown Property
  tasks[targetedTaskIndex].isSubtasksShown =
  	!tasks[targetedTaskIndex].isSubtasksShown;

  return tasks;

}

// > Handles toggling adding-subtask state
const toggleAddingSubtask = (tasks, targetedTaskIndex) => {

	// 1. Close all tasks' subtasks-container and all tasks' subtasks-forms
	tasks.forEach(task => {
		if (task.id !== tasks[targetedTaskIndex].id) {	
			task.addingSubtask = false;
			task.isSubtasksShown = false;
		}
	})

	// 2. Toggling the boolean value of adding subtask form status
	tasks[targetedTaskIndex].addingSubtask = !tasks[targetedTaskIndex].addingSubtask;

	// 3. Show subtasks container (because it might be closed while adding-subtask form
	// ...is opened)
	// NOTE: If there are NOT any subtasks, the subtasks container will hide with the form;
	// ...not to make the container opened with no subtasks in it!
	tasks[targetedTaskIndex].isSubtasksShown =
		tasks[targetedTaskIndex].subtasks.length === 0 ?
			tasks[targetedTaskIndex].addingSubtask
			: true;

	return tasks;

}

// > Handles Adding subtask
const addSubtask = (tasks, targetedTaskIndex, newSubtask) => {

	// Adding the subtask to the targeted task by using its index
	tasks[targetedTaskIndex].subtasks.push(newSubtask);

	return tasks;

}

// > Handles marking subtask
const markSubtask = (tasks, targetedTaskIndex, subtaskId) => {

	// 1. Finding the targeted subtask in the targeted task
	const targetedSubtaskIndex =
		tasks[targetedTaskIndex].subtasks.findIndex(subtask => subtask.id === subtaskId);

	// 2. Marking the targeted subtask
	tasks[targetedTaskIndex].subtasks[targetedSubtaskIndex].isDone =
		!tasks[targetedTaskIndex].subtasks[targetedSubtaskIndex].isDone;	

	return tasks;

}

// > Handles deleting subtask
const deleteSubtask = (tasks, targetedTaskIndex, subtaskId) => {

	// 1. Finding the targeted subtask in the targeted task
	const targetedSubtaskIndex =
		tasks[targetedTaskIndex].subtasks.findIndex(subtask => subtask.id === subtaskId);

	// 2. Marking the targeted subtask
	tasks[targetedTaskIndex].subtasks.splice(targetedSubtaskIndex, 1);

	// 3. Close Subtasks Container if there are NOT any more subtasks
	// ...not to make the container opened with no subtasks in it!
	if (tasks[targetedTaskIndex].subtasks.length === 0)
		toggleSubtasksContainer(tasks, targetedTaskIndex);

	return tasks;

}

export {
	addOrEditTask,
	selectTask,
	getEditedData,
	deleteTask,
	deleteDayTasks,
	toggleSubtasksContainer,
	toggleAddingSubtask,
	addSubtask,
	markSubtask,
	deleteSubtask
};