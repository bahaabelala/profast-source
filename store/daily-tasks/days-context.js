import React, { useState, useEffect, useContext } from 'react';
import getFormattedDay from '../../utils/format-date-util';
import { setLocalStorage, getLocalStorage } from '../../utils/local-storage-util';
import NotificationContext from '../notification-context';
import TasksContext from './tasks-context';

const DaysContext = React.createContext({
  days: new Array(),
  activeDay: -1,
	addingDay: false,
	selectDay: dayID => {},
	toggleAddingDay: () => {},
	addDay: dayText => {},
	deleteActiveDay: () => {}
});


export const DaysContextProvider = props => {
	const notificationCtx = useContext(NotificationContext),
				dailyTasksCtx = useContext(TasksContext);
	const [days, setDays] = useState(new Array()),
				[activeDay, setActiveDay] = useState(-1),
				[addingDay, setAddingDay] = useState(false);


	// =============== ON STARTUP ===============

	useEffect(() => {
		const storedDays = getLocalStorage('days') || new Array();

		// Correcting the days's texts on the startup of the app
		const updatedDays = storedDays.map(day => {
			const formattedCorrectDay = getFormattedDay(day.value);
			return {
				...day,
				text: formattedCorrectDay.text
			};
		});

		setDays(updatedDays);

	}, [])

	// ============= METHODS =============

	// > To Go To the selected day
	const handleSelectDay = dayID => {
		setActiveDay(dayID);
	}

	// > To activate the form of adding tasks day or de-activate it
	const handleToggleAddingDay = () => {
		setAddingDay(prevState => !prevState);
	}

	// > To Add the new tasks day
	const handleAddDay = dayText => {
		const updatedDays = [ ...days ];

		// To limit the number of days components in the sidebar
    if (updatedDays.length >= 7) {
    	notificationCtx.showNotification('You reached the muximum number of days! (7 days)')
    	return;
    }

    // Changing date format for the UI
    const formattedNewDay = getFormattedDay(dayText);

    // Setting the id of the day to its date.value
    formattedNewDay.id = formattedNewDay.value;

    // Adding the new day to the list (IF it doesn't exist) 
    const dayIndex = updatedDays.findIndex(day => day.value === formattedNewDay.value);
    if (dayIndex !== -1) {
    	notificationCtx.showNotification('This day already exists!', 'error');
    	return;
    }

    // Adding the new day to the list of days
    updatedDays.push(formattedNewDay)

    // Sorting days ascendingly
    updatedDays.sort((a, b) => a.value - b.value);

    // Setting the state with the new day date
    setDays(updatedDays);

    // Updating the local storage with the new data
    setLocalStorage('days', updatedDays);
	}

	// > To delete a whole day
	const handleDeleteActiveDay = () => {
		// .. Do NOT do anything if there is NOT an active day
		if (activeDay === -1) return;

		// .. Confirmation method that the user want to delete this day
		const confirmation = window.confirm("Are you sure, you want to delete this day?\nDeleting this day will delete its tasks permenantly!!");
		if (!confirmation) return;

		const updatedDays = [ ...days ];

		// 1. get the index of the deleted day
		const deletedDayIndex = updatedDays.findIndex(day => day.id === activeDay);

		// 2. Removing the day from the list of days
		updatedDays.splice(deletedDayIndex, 1);

		// 3. Updating the state
		setDays(updatedDays);
		setActiveDay(-1);

		// 4. Closing the form of daily tasks, IF IT IS OPENED
		if (dailyTasksCtx.actingTask)
			dailyTasksCtx.toggleActingTask();

		// 5. Updating the local storage
		setLocalStorage('days', updatedDays);
	}

	// ===================================


	const context = {
		days,
		activeDay,
		addingDay,
		selectDay: handleSelectDay,
		toggleAddingDay: handleToggleAddingDay,
		addDay: handleAddDay,
		deleteActiveDay: handleDeleteActiveDay
	};

	return (
		<DaysContext.Provider value={context}>
			{props.children}
		</DaysContext.Provider>
	);
}


export default DaysContext;