import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:5000/api/";


  public getRoles(): Observable<any> {

    return this.http.get(this.baseUrl + "roles");
  }

  public getPermissions(): Observable<any> {
    return this.http.get(this.baseUrl + "permissions");
  }

  public getPermissionsByRole(roleKey: number): Observable<any> {

    return this.http.get(this.baseUrl + "roles/" + roleKey + "/permissions");
  }

  public getRoleById(roleKey: number): Observable<any> {
    return this.http.get(this.baseUrl + "roles/" + roleKey)
  }

  public createRoles(roleForm: any): Observable<any> {
    return this.http.post(this.baseUrl + "roles", roleForm)
  }

  public updateRoles(roleKey: number, roleForm: any): Observable<any> {
    return this.http.put(this.baseUrl + "roles/" + roleKey, roleForm);
  }
}
