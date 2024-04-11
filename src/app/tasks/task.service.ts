import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from './task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:4200/tasks'


  constructor(private http: HttpClient) { }

  createTask(taskData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, taskData).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error); 
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      catchError(this.handleError)
    );
  }

  updateTask(id: number, taskData: Task): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, taskData).pipe(
      catchError(this.handleError)
    );
  }

  deleteTask(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }
}
