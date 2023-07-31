let draggedElClass = new Array();


export const handleDragStart = (e, draggingClass) => {
	// > Save dragged Element in the memory in the array
	draggedElClass.length = 0;
	draggedElClass.push(draggingClass);

	e.target.classList.add(draggingClass);
}

export const handleDragOver = (e, containerClass) => {
	e.preventDefault();

	const containerEl = e.target.closest(`.${containerClass}`);

	const draggedElement = containerEl.querySelector(`.${draggedElClass[0]}`);
	const belowDraggedEl = getBelowDraggedEl(e.clientY, containerEl);

	if (!belowDraggedEl) {
		containerEl.appendChild(draggedElement);
	} else {
		containerEl.insertBefore(draggedElement, belowDraggedEl);
	}

}

export const handleDragEnd = (e, draggingClass) => {
	e.target.classList.remove(draggingClass);
}


const getBelowDraggedEl = (cursorY, containerEl) => {

	// Excluding the dragged element and the form from the children of this container
	const draggableElements = Array.from(containerEl.children)
		.filter(el => {
			return !el.classList.contains(draggedElClass[0]) && !(el.nodeName === "FORM");
		});

	// Determining the closest element right below the dragged element 
	const { el: belowDraggedEl} = draggableElements.reduce((closest, element) => {

		const elementBox = element.getBoundingClientRect();

		// Determining the position of the cursor with respect to the draggable elements
		const offset = elementBox.top + (elementBox.height / 2) - cursorY;

		// Determining the closest element right below the dragged element
		if (offset > 0 && offset < closest.offset) {
			return { offset: offset, el: element };
		} else {
			return closest;
		}

	}, {
		offset: Number.POSITIVE_INFINITY
	});


	// Returning the closest element right below the dragged element
	return belowDraggedEl;

}
