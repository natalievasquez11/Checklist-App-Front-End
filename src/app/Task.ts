export class Task {
    taskName: string;
    taskCompleted: boolean;
    taskEdited: boolean;
    id: number;

    constructor(taskName: string) {
        this.taskName = taskName;
        this.taskCompleted = false;
        this.taskEdited = false;
    }
}