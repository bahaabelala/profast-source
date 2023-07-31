
// > This function takes the day with "dd-mm-yyyy" format as a parameter.
// > This function gives a fromatted day with "{ value: Number, text: 'dd month, yyyy' }" format.
export default function getFormattedDay(day) {
	const formattedDayObj = {
		value: 0,
		text: ''
	};
	// Getting the needed format of the day date
	const date = new Date(day);
  const formattedDateText = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  // Setting the value and date of the day object
  formattedDayObj.value = date.valueOf();
  formattedDayObj.text = `${formattedDateText}`;

  // Getting today date
  // Then typing "Today" or "Tomorrow" for the their dates
	const today = new Date();
    if (date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
    	if (date.getDate() === today.getDate()) {
    		formattedDayObj.text = 'Today';
    	} else if (date.getDate() === today.getDate() + 1) {
    		formattedDayObj.text = 'Tomorrow';
    	} else if (date.getDate() === today.getDate() - 1) {
        formattedDayObj.text = 'Yesterday';
      }
    }


    return formattedDayObj;
}




/*
	=> Array Methods Used:
    	.getMonth()  ---> for getting the month (0 --> 11)
    	.getDate()  ---> for getting the day of the month
    	.getFullYear()  ---> for getting the year
*/