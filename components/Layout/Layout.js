import React, { Fragment, useContext } from 'react';
import NotificationContext from '../../store/notification-context';

import MainHeader from './MainHeader/index';
import Notification from '../ui/Notification/Notification';

const Layout = (props) => {
	const notificationCtx = useContext(NotificationContext);

  return (
    <Fragment>
    	
	    <MainHeader />

	    <main>{props.children}</main>

	    <Notification type={notificationCtx.type} active={notificationCtx.isActive}>
        {notificationCtx.message}
      </Notification>

    </Fragment>
  )
}

export default Layout;