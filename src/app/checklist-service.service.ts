import { Injectable } from '@angular/core';
import { Task } from './Task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecklistServiceService {
  apiUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getChecklist(): Observable<Task[]> {
    const url = this.apiUrl + '/getChecklist';
    return this.http.get<Task[]>(url);
  }

  saveNewTask(newTask: Task): Observable<Task> {
    const url = this.apiUrl + '/addTask';
    return this.http.post<Task>(url, newTask);
  }

  updateTask(task: Task): Observable<number> {
    const url = this.apiUrl + '/updateTask/' + task.id;
    return this.http.put<number>(url, task);
  }

  deleteTaskById(taskId: number): Observable<any>{
    const url = this.apiUrl + '/deleteTask/' + taskId;
    return this.http.delete<any>(url);
  }

  deleteAllTasks(): Observable<number> {
    const url = this.apiUrl + '/deleteAll';
    return this.http.delete<number>(url);
  }
}
