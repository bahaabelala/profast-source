import taskSetClasses from '../components/ui/TaskKit/TaskSet/TaskSet.module.css';
import subtaskBodyClasses from '../components/ui/TaskKit/SubtaskBody/SubtaskBody.module.css';


// Storing the dragged element DOM and dragging class
let draggedElement = null;


export const handleDragStart = (draggedEl, draggingClass) => {
	// 1. Storing the dragged element in a global variable
	draggedElement = draggedEl;

	// 2. Adding the class of dragging into the dragged element classes
	// .. (to change its style to the state of dragging)
	draggedEl.classList.add(draggingClass);
}

export const handleDragOver = (e, containerClass, activeNestedContClass) => {
	e.preventDefault();

	let draggingArea;
	
	// 1. Storing the main container element DOM (the container that has the "dragover" event)
	const mainContainerEl = e.target.closest(`.${containerClass}`);

	// 2. Storing the active nested container DOM
	const activeNestedContainerEl = mainContainerEl.querySelector(`.${activeNestedContClass}`);

	// 3. Deciding which element should be the dragging area
	if (draggedElement.classList.contains(subtaskBodyClasses.Main)) {
		draggingArea = activeNestedContainerEl;
	} else {
		draggingArea = mainContainerEl;
	}

	// 4. Getting the element that is below the dragged element
	const belowDraggedEl = getBelowDraggedEl(e.clientY, draggingArea);

	// 5. Inserting the dragged element into the DOM according to the element that is below it
	if (!belowDraggedEl) {
		draggingArea.appendChild(draggedElement);
	} else {
		draggingArea.insertBefore(draggedElement, belowDraggedEl);
	}

}

export const handleDragEnd = (draggedElement, draggingClass) => {
	draggedElement.classList.remove(draggingClass);
}


const getBelowDraggedEl = (cursorY, draggingArea) => {

	const shortestOffsetEl = {
		dom: null,
		offset: Number.POSITIVE_INFINITY
	};

	// Excluding the dragged element and the form from the children of this container
	const draggableElements = Array.from(draggingArea.children)
		.filter(el => {
			return !(el === draggedElement) && !(el.nodeName === "FORM");
		});


	// Looping through the draggable element to determine which has the short distance
	// ...from the dragged element
	draggableElements.forEach(element => {
		const elementInfo = {
			top: element.getBoundingClientRect().top,
			height: element.getBoundingClientRect().height
		}

		// 1. Calculating the distance between the top of the current element in this loop
		// ...and the dragged element
		const currentOffset = elementInfo.top + (elementInfo.height / 2) - cursorY;
		
		// 2. Determining if it is the shortest distance or not

		if (currentOffset < shortestOffsetEl.offset && currentOffset > 0) {
			shortestOffsetEl.offset = currentOffset;
			shortestOffsetEl.dom = element;
		}

	});




	return shortestOffsetEl.dom;

}
