import { Fragment, useContext } from 'react';
import '../styles/globals.css';
import 'remixicon/fonts/remixicon.css';

import MainHeader from '../components/MainHeader/MainHeader';

import { TasksContextProvider } from '../store/daily-tasks/tasks-context';
import { DaysContextProvider } from '../store/daily-tasks/days-context';
import { NotificationContextProvider } from '../store/notification-context';
import { TodoContextProvider } from '../store/todo-context';




export default function RootLayout({ children }) {

 return (
    <html lang="en">
      <head>
        <title>Daily Tasks</title>
        <meta name="description" content="Productivity app by bahaa mohammed" />
        <meta name="viewport" content= "width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/productivity.png" />
      </head>
      <body>

          <MainHeader />

          <main>

            <NotificationContextProvider>
            <TasksContextProvider>
            <DaysContextProvider>
            <TodoContextProvider>
                  
              {children}

            </TodoContextProvider>
            </DaysContextProvider>
            </TasksContextProvider>
            </NotificationContextProvider>

          </main>

      </body>
    </html>
  )
}
