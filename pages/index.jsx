import React, { useContext } from 'react';
import Head from 'next/head';
import styles from '../styles/daily-tasks.module.css';

import SideBar from '../components/ui/SideBar/SideBar';
import SideBarButton from '../components/ui/SideBarButton/SideBarButton';
import TasksContainer from '../components/ui/TaskKit/TasksContainer/TasksContainer';
import TaskSet from '../components/ui/TaskKit/TaskSet/TaskSet';
import TaskActForm from '../components/ui/TaskKit/TaskActForm/TaskActForm';
import DayActionCenter from '../components/daily-tasks-page/DayActionCenter/DayActionCenter';

// Global Stores
import TasksContext from '../store/daily-tasks/tasks-context';
import DaysContext from '../store/daily-tasks/days-context'; 


const DailyTasksPage = props => {
  const tasksCtx = useContext(TasksContext);
  const daysCtx = useContext(DaysContext);

  

  return (
    <div className={styles.DailyTasksPage}>
      <Head>
        <title>Daily Tasks</title>
        <meta name="description" content="Productivity app by bahaa mohammed" />
      </Head>

      <SideBar
        addBtnText="Add Day"
        onAddDayClicked={daysCtx.toggleAddingDay}
        isAddingDay={daysCtx.addingDay}
        onSubmitAddDayForm={daysCtx.addDay}
        >

        {/* ==== DAYs ==== */}
        {daysCtx.days.map(day => {
          return (
            <SideBarButton
              key={day.id}
              dayID={day.id}
              text={day.text}
              active={day.id === daysCtx.activeDay}
              click={daysCtx.selectDay}
               />
          );
        })}

      </SideBar>

      <TasksContainer>

        {/* ==== TASKs ==== */}
        {
          tasksCtx.tasks
            .filter(task => task.day === daysCtx.activeDay)
            .map(task => {
              return (
                <TaskSet
                  key={task.id}
                  taskID={task.id}
                  taskStatus={task.status}
                  isSubtasksShown={task.isSubtasksShown}
                  subtasks={task.subtasks}
                  addingSubtask={task.addingSubtask}
                  onTaskBodyClicked={tasksCtx.selectTask}
                  onSubtasksArrowClicked={tasksCtx.toggleSubtasksContainer}
                  onEditTaskClicked={tasksCtx.editTask}
                  onDeleteTaskClicked={tasksCtx.deleteTask}
                  onAddSubtaskClicked={tasksCtx.toggleAddingSubtask}
                  onSubtaskFormSubmitted={tasksCtx.addSubtask}
                  onSubtaskClicked={tasksCtx.markSubtask}
                  onDeleteSubtaskClicked={tasksCtx.deleteSubtask}
                  onCancelFormClicked={tasksCtx.toggleAddingSubtask}
                  >
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </TaskSet>
              );
            })
        }

        <TaskActForm
          editData={tasksCtx.editData}
          active={tasksCtx.actingTask}
          submit={(data) => { tasksCtx.submitTaskForm(data, daysCtx.activeDay) }}
          onCancelFormProcess={tasksCtx.closeTaskActForm}
          />

      </TasksContainer>
      
      <DayActionCenter
        onAddTaskClicked={tasksCtx.openTaskActForm}
        onDeleteActiveDayClicked={daysCtx.deleteActiveDay}
         />

    </div>
  )
}

export default DailyTasksPage;