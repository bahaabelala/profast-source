import { TASK_STATUSES } from './tasks-constants-util';


// > add or edit task
export const addOrEditTask = (tasksList, taskData, notificationCtx, activeDay = -1) => {
	const updatedTasks = [ ...tasksList ];

  const taskIndex = getTargetedTask(updatedTasks, taskData.id);

	if (taskIndex === -1) {
    if (activeDay === -1) {
      updatedTasks.push(taskData);
    } else {
      taskData.day = activeDay;
      updatedTasks.push(taskData);
    }
  } else {
  	updatedTasks.splice(taskIndex, 1, taskData);
    notificationCtx.showNotification('Edited successfully!', 'success');
  }

  return updatedTasks;
}

// > mark task
export const markTask = (tasksList, taskID) => {
	const updatedTasks = [ ...tasksList ];

  // Finding the index the targeted (clicked) task
  const taskIndex = getTargetedTask(updatedTasks, taskID);

  // Make the targeted task's status todo, doing, or done
  switch (updatedTasks[taskIndex].status) {

    case TASK_STATUSES.todo:
      updatedTasks[taskIndex].status = TASK_STATUSES.doing;
      break;

    case TASK_STATUSES.doing:
      updatedTasks[taskIndex].status = TASK_STATUSES.done;
      break;

    default:
      updatedTasks[taskIndex].status = TASK_STATUSES.todo;
      break;

  }

  return updatedTasks;
}

// > get edited task data
export const getEditedTaskData = (tasksList, taskID) => {
	const tasks = [ ...tasksList ];

  // 1. Finding the index of the targeted task
  const taskIndex = getTargetedTask(tasks, taskID);

  // 2. Getting the targeted task from the list of tasks by its id
  const taskObject = { ...tasks[taskIndex] }

  return taskObject;
}

// > delete task
export const deleteTask = (tasksList, taskID) => {
	const updatedTasks = [ ...tasksList ];

  // 1. Finding the index the targeted (clicked) task
  const taskIndex = getTargetedTask(updatedTasks, taskID);

  // 2. Removing the targeted task from the list of tasks
  updatedTasks.splice(taskIndex, 1);

  return updatedTasks;
}

// > toggle subtasks container to open or close
export const toggleSubtasksContainer = (tasksList, taskID) => {
  const updatedTasks = [ ...tasksList ];

  // 1. Finding the index of the targeted task
  const targetedTaskIndex = getTargetedTask(updatedTasks, taskID);

  // 2. Changing the state of the subtasks container
  // ...by changing the isSubtasksShown Property
  updatedTasks[targetedTaskIndex].isSubtasksShown = !updatedTasks[targetedTaskIndex].isSubtasksShown

  // 3. Returning the updated tasks list
  return updatedTasks;
}

// > Finding a targeted task from list of tasks
// > Accepts: the list of tasks and the id of targeted task
// > Returns: the index of the targeted task in its the list
const getTargetedTask = (tasksList, taskID) => {
  // 1. Finding the index the targeted task
  const targetedTaskIndex = tasksList.findIndex(task => task.id === taskID);

  // 2. Returning the targeted task index
  return targetedTaskIndex;
}