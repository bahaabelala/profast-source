import React, { useContext } from 'react';
import styles from './Notification.module.css';

import NotificationContext from '../../../store/notification-context';

const Notification = (props) => {
  const notificationCtx = useContext(NotificationContext);
  const mainStyles = [styles.Main];
  if (props.active) mainStyles.push(styles.active);
  if (props.type === 'error') {
    mainStyles.push(styles.red);
  } else if (props.type === 'alert') {
    mainStyles.push(styles.yellow);
  } else if (props.type === 'success') {
    mainStyles.push(styles.green);
  }

  return (
    <div className={mainStyles.join(' ')} onClick={notificationCtx.hideNotification}>
      {props.children}
    </div>
  )
}

export default Notification;