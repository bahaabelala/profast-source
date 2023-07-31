import React, { useState, useRef, useEffect } from 'react';
import styles from './SideBar.module.css';

import Button from '../../ui/Button/Button';
import AddIcon from '../../icons/AddIcon';


const SideBar = (props) => {
  const [dayText, setDayText] = useState(new Date().toISOString().slice(0, 10));
  const datePicker = useRef(null);

  useEffect(() => {
    const today = new Date();

    // Setting the minimum of the date picker input to today's date
    datePicker.current.setAttribute('min', today.toISOString().slice(0, 10));
  }, []);

  // > Handling add new tasks-day
  const handleAddDay = e => {
    e.preventDefault();

    props.onSubmitAddDayForm(dayText);
  }


  return (
    <aside className={styles.SideBar}>

      {props.children}

      <form
        className={[styles.dateForm, props.isAddingDay ? styles.active : ''].join(' ')}
        onSubmit={handleAddDay}
        >
        <input
          type="date"
          value={dayText}
          onChange={e => { setDayText(e.target.value) }}
          ref={datePicker}
          />
        <Button>Done</Button>
      </form>

      <Button type='outlined' click={props.onAddDayClicked}>
        <AddIcon />
        {props.addBtnText}
      </Button>

      <div className={styles.flexWhitespace}></div>
    </aside>
  );
}

export default SideBar;