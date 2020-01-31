import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:5000/api/";

  public getRoles(): Observable<any> {
    return this.http.get(this.baseUrl + "roles");
  }

  public getGenders(): Observable<any> {

    return this.http.get(this.baseUrl + "genders");
  }

  public createUsers(userFormData: any): Observable<any> {
    return this.http.post(this.baseUrl + "users", userFormData)
  }


  public getUsers(): Observable<any> {
    return this.http.get(this.baseUrl + "users");
  }
  public getUsersById(userKey: number): Observable<any> {
    console.log(userKey)
    return this.http.get(this.baseUrl + "users/" + userKey);
  }


  public getUsersByUserName(userName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}users/userByUserName/${userName}`);
  }

  public updateUsers(userFormData: any, userKey: number): Observable<any> {
    return this.http.put(this.baseUrl + "users/" + userKey, userFormData);
  }
}
