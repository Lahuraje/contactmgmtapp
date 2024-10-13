import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interface/IUser';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7250/api/User/';
  constructor(private http: HttpClient) { }

  //  Get All Users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'GetUsers');
  }

  //  Get a Single User by ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  //  Create a New User
  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'CreateUser', user);
  }

  // Update an Existing User
  updateUser(id: number, user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}UpdateUser?id=${id}`, user);
  }

  //  Delete a User by ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}DeleteUser?id=${id}`);
  }
}
