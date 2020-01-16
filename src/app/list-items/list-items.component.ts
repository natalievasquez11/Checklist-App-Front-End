import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Task } from '../Task';
import { ChecklistServiceService } from '../checklist-service.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit, OnDestroy {
  checklistTasksArr: Task[];
  taskSub: Subscription;
  deleteTaskSub: Subscription;
  updateTaskSub: Subscription;
  deleteAllSub: Subscription;
  addTaskSub: Subscription;
  isAddingTask : boolean = false;
  newTask: string;
  
  constructor(private checklistService: ChecklistServiceService) { 
  }

  ngOnInit() {
    this.getChecklistFromServer();
  }

  ngOnDestroy() {
    if(this.taskSub) {
      this.taskSub.unsubscribe();
    }

    if(this.deleteTaskSub) {
      this.deleteTaskSub.unsubscribe();
    }

    if(this.updateTaskSub) {
      this.updateTaskSub.unsubscribe();
    }

    if(this.deleteAllSub) {
      this.deleteAllSub.unsubscribe();
    }

    if(this.addTaskSub) {
      this.addTaskSub.unsubscribe();
    }
  }

  getChecklistFromServer() {
    this.taskSub = this.checklistService.getChecklist().subscribe(
      (res: Task[]) => {
        this.checklistTasksArr = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  onSaveNewTask() {
    this.isAddingTask = false;

   const tempTask = new Task(this.newTask);
    this.addTaskSub = this.checklistService.saveNewTask(tempTask).subscribe(
      (res: Task) => {
        console.log('res' + res);
        this.getChecklistFromServer();
        this.newTask = '';
      }, 
      (err) => {
        console.log(err);
      }
    )
  }

  onUpdateTask(task:Task) {
    task.taskEdited = false;
    this.updateTaskSub = this.checklistService.updateTask(task).subscribe(
      (res: number) => {
        console.log(res);
        this.getChecklistFromServer();
      },
      err => {
        console.log(err);
      }
    ) 
  }

  onCompleteTask(task: Task) {
    task.taskCompleted = !task.taskCompleted;
    this.updateTaskSub = this.checklistService.updateTask(task).subscribe(
      (res: number) => {
        console.log(res);
        this.getChecklistFromServer();
      },
      err => {
        console.log(err);
      }
    ) 
  }

  onDeleteTaskById(taskId: number) {
    this.deleteTaskSub = this.checklistService.deleteTaskById(taskId).subscribe(
      (res: any) => {
        console.log(res + ' task deleted.');
        this.getChecklistFromServer();
      },
      err => {
        console.log(err);
      }
    )
  }

  onShowEditInput(task: Task) {
    task.taskEdited = true;
  }

  onDeleteAllTasks() {
    this.deleteAllSub = this.checklistService.deleteAllTasks().subscribe(
      (res: number) => {
        console.log(res);
        this.getChecklistFromServer();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  onShowAddInput() {
    this.isAddingTask = true;
  }
}
