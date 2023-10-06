"use client";

import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext({
	message: '',
	type: 'alert',
	isActive: false,
	showNotification: (notificationMessage, notificationType = 'alert') => {},
	hideNotification: () => {}
});

export const NotificationContextProvider = (props) => {
	const [message, setMessage] = useState('');
	const [type, setType] = useState('alert');
	const [isActive, setIsActive] = useState(false);


	// =============== ON STARTUP ===============

	useEffect(() => {

		if (isActive) {
			const notificationTimer = window.setTimeout(handleHideNotification, 2000);

			return () => {
				window.clearTimeout(notificationTimer);
			}
		}

	}, [isActive]);

	// ================ METHODS =================

	const handleShowNotification = (notificationMessage, notificationType = 'alert') => {
		setMessage(notificationMessage);
		setType(notificationType);
		setIsActive(true);
	}

	const handleHideNotification = () => {
		setMessage('');
		setIsActive(false);
	}

	// ==========================================

	const context = {
		message,
		type,
		isActive,
		showNotification: handleShowNotification,
		hideNotification: handleHideNotification
	}

	return (
		<NotificationContext.Provider value={context}>
			{props.children}
		</NotificationContext.Provider>
	);
}

export default NotificationContext;