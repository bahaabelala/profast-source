
// ========= DAILY TASK ==========
export class DailyTask {
	constructor(day, id, title, description, status, subtasks, isSubtasksShown, addingSubtask) {
		this.day = day;
		this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.subtasks = subtasks;
    this.isSubtasksShown = isSubtasksShown;
    this.addingSubtask = addingSubtask;
	}
}

// ========= SUBTASK ==========
export class Subtask {
	constructor(id, content, isDone = false) {
		this.id = id;
		this.content = content;
		this.isDone = isDone;
	}
}