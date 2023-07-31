import { TASK_STATUSES } from './tasks-constants-util';


// > add or edit task
export const addOrEditTask = (tasksList, taskData, notificationCtx, activeDay = -1) => {
	const updatedTasks = [ ...tasksList ];

  const taskIndex = updatedTasks.findIndex(task => task.id === taskData.id);

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
  const taskIndex = updatedTasks.findIndex(task => task.id === taskID);

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
  const taskIndex = tasks.findIndex(task => task.id === taskID);

  // 2. Getting the targeted task from the list of tasks by its id
  const taskObject = { ...tasks[taskIndex] }

  return taskObject;
}

// > delete task
export const deleteTask = (tasksList, taskID) => {
	const updatedTasks = [ ...tasksList ];

  // Finding the index the targeted (clicked) task
  const taskIndex = updatedTasks.findIndex(task => task.id === taskID);

  // Removing the targeted task from the list of tasks
  updatedTasks.splice(taskIndex, 1);

  return updatedTasks;
}