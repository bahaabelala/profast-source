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
const getEditedTaskData = (taskId, tasksList) => {
	const tasks = [ ...tasksList ]

	// 1. Finding the index of the targeted task
  const targetedTaskIndex = tasks.findIndex(task => task.id === taskId);

  // 2. Getting the targeted task from the list of tasks by its id
  const taskObject = { ...tasks[targetedTaskIndex] }

  return taskObject;

}

// > Handles deleting task
const deleteTask = (tasks, targetedTaskIndex) => {

	// Removing the targeted task from the list of tasks
	tasks.splice(targetedTaskIndex, 1);

	return tasks;

}

// > Handles Toggling Subtasks Container to open or close
const toggleSubtasksContainer = (tasks, targetedTaskIndex) => {

	// Changing the state of the subtasks container
  // ...by changing the isSubtasksShown Property
  tasks[targetedTaskIndex].isSubtasksShown =
  	!tasks[targetedTaskIndex].isSubtasksShown;

  return tasks;

}

// > Handles toggling adding-subtask state
const toggleAddingSubtask = (tasks, targetedTaskIndex) => {

	// 1. Toggling the boolean value of adding subtask form status
	tasks[targetedTaskIndex].addingSubtask = !tasks[targetedTaskIndex].addingSubtask;

	// 2. Show subtasks container (because it might be closed while adding-subtask form
	// ...is opened)
	tasks[targetedTaskIndex].isSubtasksShown = true;

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

	return tasks;

}

export {
	addOrEditTask,
	selectTask,
	getEditedTaskData,
	deleteTask,
	toggleSubtasksContainer,
	toggleAddingSubtask,
	addSubtask,
	markSubtask,
	deleteSubtask
};