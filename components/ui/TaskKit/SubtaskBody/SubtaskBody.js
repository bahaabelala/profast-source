import React from 'react';
import styles from './SubtaskBody.module.css';

import Button from '../../Button/Button';

const SubtaskBody = (props) => {
	const mainStyles = [styles.Main];
  let subtaskStatusBadge = "ri-checkbox-blank-circle-line";
	if (props.done) {
    mainStyles.push(styles.done);
    subtaskStatusBadge = "ri-checkbox-circle-fill";
  };


  return props.isForm ? (
    <li className={mainStyles.join(' ')}>
      <form className={styles.subtaskForm}>
        <input type="text" placeholder="Type subtask content" className={styles.subtaskContentInput} />
        <Button>
          Done
        </Button>
      </form>
    </li>
  ) : (
    <li className={mainStyles.join(' ')}>
      <i className={[styles.subtaskStatusBadge, subtaskStatusBadge].join(' ')}></i>
      <p className={styles.subtaskContent}>
        {props.children}
      </p>
      <i className={[styles.deleteIcon, "ri-close-circle-line"].join(' ')}></i>
    </li>
  );

}

export default SubtaskBody;