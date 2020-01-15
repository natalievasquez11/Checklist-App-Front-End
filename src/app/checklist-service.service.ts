import { Injectable } from '@angular/core';
import { Item } from './Item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecklistServiceService {
  listItems: Item[];
  apiUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getListItems(): Observable<Item[]> {
    const url = this.apiUrl + '/get-checklist';
    return this.http.get<Item[]>(url);
  }

  update(item: Item): Observable<number> {
    const url = this.apiUrl + '/update/' + item.id;
    return this.http.put<number>(url, item);
  }

  delete(itemId: number): Observable<any>{
    const url = this.apiUrl + '/delete-task/' + itemId;
    return this.http.delete<any>(url);
  }

  clear(): Observable<number> {
    const url = this.apiUrl + '/delete-all';
    return this.http.delete<number>(url);
  }

  saveNew(newItem: Item): Observable<Item> {
    const url = this.apiUrl + '/add-task';
    return this.http.post<Item>(url, newItem);
  }
}
