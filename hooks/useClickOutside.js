import { useEffect } from 'react';

const useClickOutside = (ref, actionFunc) => {
	useEffect(() => {
		const callBackFunc = e => {
	    	if (ref.current && !ref.current.contains(e.target)) {
	    		// What action are you doing by clicking outside the current reference
	     		actionFunc(e);
	    		// =============
	    	}
	  	}

		document.addEventListener('click', callBackFunc);

		return () => {
			document.removeEventListener('click', callBackFunc);
		}

	}, [ref]);
}

export default useClickOutside;