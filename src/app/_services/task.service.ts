import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/_models/task';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'http://localhost:8081/GestionDesAbsences/tasks';
    constructor(private http: HttpClient) { }
    createTask(task: Task, projectId: number): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}/${projectId}`, task);
      }
    
      getTaskById(id: number): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/${id}`);
      }
    
      getAllTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
      }
    
      updateTask(id: number, task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
      }
    
      deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
      }
    
      getAllTasksByProjectId(projectId: number): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}/project/${projectId}`);
      }
    }