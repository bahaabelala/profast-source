import React, { useContext } from 'react';
import styles from './DayActionCenter.module.css';
import DaysContext from '../../../store/daily-tasks/days-context';

import DeleteIcon from '../../icons/DeleteIcon';
import AddIcon from '../../icons/AddIcon';

const DayActionCenter = (props) => {
  const daysCtx = useContext(DaysContext);
  const mainStyles = [styles.Main];

  if (daysCtx.activeDay === -1) mainStyles.push(styles.disabled);

  return (
    <div className={mainStyles.join(' ')}>
      <div
        className={styles.addTaskIconCont}
        title="Add Task to Current Day"
        onClick={props.onAddTaskClicked}
        >
        <AddIcon />
      </div>
      <div
        className={styles.deleteDayIconCont}
        title="Delete Current Day"
        onClick={props.onDeleteActiveDayClicked}
        >
        <DeleteIcon />
      </div>
    </div>
  )
}

export default DayActionCenter;