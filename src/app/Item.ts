export class Item {
    task: string;
    completed: boolean;
    edited: boolean;
    id: number;

    constructor(task: string) {
        this.task = task;
        this.completed = false;
        this.edited = false;
    }
}