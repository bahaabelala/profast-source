"use client";

import React, { useContext } from 'react';
import Head from 'next/head';
import styles from '../../styles/todo.module.css';

import TaskSet from '../../components/ui/TaskKit/TaskSet/TaskSet';
import TaskActForm from '../../components/ui/TaskKit/TaskActForm/TaskActForm';
import TasksContainer from '../../components/ui/TaskKit/TasksContainer/TasksContainer';
import TodoActionCenter from '../../components/todo-page/TodoActionCenter/TodoActionCenter';
import Notification from '../../components/ui/Notification/Notification';

import TodoContext from '../../store/todo-context';
import NotificationContext from '../../store/notification-context';


const TodoPage = props => {
	const todoCtx = useContext(TodoContext);
	const notificationCtx = useContext(NotificationContext);


	return (
		<div className={styles.TodoPage}>
			<Head>
				<title>ToDo</title>
				<meta name="description" content="Make your today's todo list and increase your productivity" />
			</Head>


			<TasksContainer>
				{
					todoCtx.tasks.map(task => (
						<TaskSet
							key={task.id}
              taskID={task.id}
              taskStatus={task.status}
              isSubtasksShown={task.isSubtasksShown}
              subtasks={task.subtasks}
              addingSubtask={task.addingSubtask}
              onTaskBodyClicked={todoCtx.selectTask}
              onSubtasksArrowClicked={todoCtx.toggleSubtasksContainer}
              onEditTaskClicked={todoCtx.editTask}
              onDeleteTaskClicked={todoCtx.deleteTask}
              onAddSubtaskClicked={todoCtx.toggleAddingSubtask}
              onSubtaskFormSubmitted={todoCtx.addSubtask}
              onSubtaskClicked={todoCtx.markSubtask}
              onDeleteSubtaskClicked={todoCtx.deleteSubtask}
              onCancelFormClicked={todoCtx.toggleAddingSubtask}
              onDragTask={todoCtx.dragTask}
              onDragSubtask={todoCtx.dragSubtask}
							>
							{task.description}
						</TaskSet>
					))
				}

				<TaskActForm
					isTodoTask
					editData={todoCtx.editData}
					active={todoCtx.actingTask}
					submit={todoCtx.submitTaskForm}
					onCancelFormProcess={todoCtx.closeTaskActForm} />
			</TasksContainer>


			<TodoActionCenter
				onAddTaskClicked={todoCtx.openTaskActForm}
				onDeleteAllTasksClicked={todoCtx.deleteAllTasks} />

			<Notification type={notificationCtx.type} active={notificationCtx.isActive}>
				{notificationCtx.message}
			</Notification>

		</div>
	);
}

export default TodoPage;
