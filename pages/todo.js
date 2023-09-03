import React, { useContext } from 'react';
import styles from '../styles/todo.module.css';
import Head from 'next/head';

import TaskSet from '../components/ui/TaskKit/TaskSet/TaskSet';
import TaskActForm from '../components/ui/TaskKit/TaskActForm/TaskActForm';
import TasksContainer from '../components/ui/TaskKit/TasksContainer/TasksContainer';
import TodoActionCenter from '../components/todo-page/TodoActionCenter/TodoActionCenter';
import TodoContext from '../store/todo-context';


const TodoPage = props => {
	const todoCtx = useContext(TodoContext);


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
					onCancelFormProcess={todoCtx.toggleActingTask} />
			</TasksContainer>


			<TodoActionCenter
				onAddTaskClicked={todoCtx.toggleActingTask}
				onDeleteAllTasksClicked={todoCtx.deleteAllTasks} />


		</div>
	);
}

export default TodoPage;
