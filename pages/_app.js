import { Fragment, useContext } from 'react';
import '../styles/globals.css';

import Head from 'next/head';

import Layout from '../components/Layout/Layout';
import NotificationContext from '../store/notification-context';
import { TasksContextProvider } from '../store/daily-tasks/tasks-context';
import { DaysContextProvider } from '../store/daily-tasks/days-context';
import { NotificationContextProvider } from '../store/notification-context';
import { TodoContextProvider } from '../store/todo-context';



function MyApp({ Component, pageProps }) {
  const notificationCtx = useContext(NotificationContext);

  return (
    <Fragment>
      
      {/* ==== GENERAL HEAD TAGs ==== */}

      <Head>
        <meta name="viewport" content= "width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/productivity.png" />
      </Head>

      {/* =========================== */}

      <NotificationContextProvider>

        <Layout>
        
          {/* ==== CURRENT PAGE ==== */}

          <TasksContextProvider>
            <DaysContextProvider>
              <TodoContextProvider>
              
                <Component {...pageProps} />

              </TodoContextProvider>
            </DaysContextProvider>
          </TasksContextProvider>

          {/* ====================== */}

        </Layout>
        
      </NotificationContextProvider>  

    </Fragment>
  );
}


export default MyApp
