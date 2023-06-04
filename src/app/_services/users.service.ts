import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8081/GestionDesAbsences';
  private apiUrl1 = 'http://localhost:8081/GestionDesAbsences/users';


  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  getAllusers(): Observable<any> {
    return this.http.get(this.apiUrl1);
  }

  removeUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  blockUser(userId: number): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${userId}/block`, null);
  }

  unblockUser(userId: number): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${userId}/unblock`, null);
  }
}
