import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from './TaskActForm.module.css';
import Button from '../../Button/Button';
import { TASK_STATUSES } from '../../../../utils/tasks-constants-util';
import NotificationContext from '../../../../store/notification-context';


const TaskActForm = (props) => {
  const notificationCtx = useContext(NotificationContext);
  const titleInput = useRef(null),
        descriptionInput = useRef(null);
  const [data, setData] = useState({
      id: '',
      title: '',
      description: '',
      status: TASK_STATUSES.todo,
      subtasks: new Array()
    });


  useEffect(() => {

    if (props.active) {

      (props.isTodoTask ? descriptionInput : titleInput).current.focus()
      
      if (props.editData)
        setData({ ...props.editData });
    
    }

  }, [ props.active, props.editData ])


  // > Changing state data when input field's value is mutated
  const handleChangeValue = (e, fieldChanged) => {
    const newData = {
      ...data,
      [fieldChanged]: e.target.value
    }

    setData(newData);
  }


  // > Submitting the data of the new task
  const handleSubmitData = e => {
    e.preventDefault();

    // 1. Confirming that description is NOT empty
    if (!data.description) {
      
      // Knowing if the description input field is focussed or not
      if (descriptionInput.current === document.activeElement) {
        notificationCtx.showNotification(`The task must has a ${props.isTodoTask ? 'content' : 'description'}!`, 'error');
      } else {
        descriptionInput.current.focus();
      }

      return;
    };

    // ( /\s/g ) targets all whitespaces of the string
    // 2. Creating a unique id for the new task
    const taskID =
      props.editData ?
      data.id : ('task_' + new Date().valueOf());

    const modifiedData = {
      ...data,
      id: taskID,
      title: data.title || 'untitled',
      description: data.description || (props.isTodoTask ? 'without content' : 'without description')
    }

    // 3. Submiting new task data
    props.submit(modifiedData);

    // 4. Preparing for another new task
    setData({
      id: '',
      title: '',
      description: '',
      status: TASK_STATUSES.todo,
      subtasks: new Array()
    });
    (props.isTodoTask ? descriptionInput : titleInput).current.focus();
  }


  // > Cancelling the process of add or edit
  function handleCancelProcess() {

    // 1. To set the state to NOT actingTask
    props.onCancelFormProcess();

    // 2. Blurring from the form input fields after cancelling it
    if (!props.isTodoTask) titleInput.current.blur();
    descriptionInput.current.blur();

    // 3. Resetting the form data
    setData({
      id: '',
      title: '',
      description: '',
      status: TASK_STATUSES.todo,
      subtasks: new Array()
    });
  }


  return (
    <form
      className={[styles.TaskActForm, props.active ? styles.active : ''].join(' ')}
      onSubmit={handleSubmitData}
      onKeyDown={e => {
        if (e.key === 'Escape') handleCancelProcess();
      }}
      >
    	{
        !props.isTodoTask ?
          <input
            type="text"
            placeholder="Title"
            className={styles.title}
            value={data.title}
            onChange={e => { handleChangeValue(e, 'title') }}
            ref={titleInput}
            />
          : null
      }
      
    	<input
        type="text"
        placeholder={props.isTodoTask ? "ToDo task" : "Short description"}
        className={styles.description}
        value={data.description}
        onChange={e => { handleChangeValue(e, 'description') }}
        ref={descriptionInput}
        />
    	 
       <Button>Done</Button>

      {/* ======== Cancel Button ======== */}

      <span className={styles.cancelBtn} onClick={handleCancelProcess}>
      x
      </span>

    </form>
  )
}

export default TaskActForm;