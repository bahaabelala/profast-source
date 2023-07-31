import React from 'react';
import styles from './Button.module.css';


const Button = (props) => {
	const btnStyles = [styles.Button];
	if (props.filled) btnStyles.push(styles.filled)
	if (props.red) btnStyles.push(styles.red)

	return (
		<button onClick={props.click} className={btnStyles.join(' ')}>
			{props.children}
		</button>
	)
}

export default Button;