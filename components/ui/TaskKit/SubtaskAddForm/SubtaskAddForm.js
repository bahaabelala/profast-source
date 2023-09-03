import React, { useRef, useState, useContext, useEffect } from 'react';
import styles from './SubtaskAddForm.module.css';
import { Subtask } from '../../../../utils/classes-util';
import TasksContext from '../../../../store/daily-tasks/tasks-context';

import Button from '../../Button/Button';


const SubtaskAddForm = props => {
	const [subtaskContent, setSubtaskContent] = useState('');
	const subtaskFormInput = useRef(null);
	

	useEffect(() => {
		if (props.addingSubtask) subtaskFormInput.current.focus()
	}, [ props.addingSubtask ])

	// > Changing the data of the subtask while typing in the form input
	const handleChangeSubtaskContent = e => {
		setSubtaskContent(e.target.value);
	}

	// > Submitting the form data
	const handleSubmitData = e => {
		e.preventDefault();

		if (subtaskContent === '') return;

		// 1. Creating unique new subtask id
		const newSubtaskId = `subtask_${new Date().valueOf()}`;

		// 2. Creating new subtask object
		const newSubtask = new Subtask(newSubtaskId, subtaskContent);

		// 3. Submitting (Adding) the new subtask
		props.onSubtaskFormSubmitted(props.taskId, newSubtask);

		// 4. Preparing for new subtask
		setSubtaskContent('');
	}

	return (
		<form
			className={styles.main} 
			onSubmit={handleSubmitData}
			onKeyDown={e => {
		    if (e.key === 'Escape') props.onCancelFormClicked(props.taskId);
		  }}
			>
      <input
        type="text"
        placeholder="Type subtask content"
        className={styles.subtaskContentInput}
        ref={subtaskFormInput}
        onChange={handleChangeSubtaskContent}
        value={subtaskContent}
         />
      <Button>
        Done
      </Button>
    </form>
	);
}

export default SubtaskAddForm;