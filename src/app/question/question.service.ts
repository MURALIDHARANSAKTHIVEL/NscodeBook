import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }
  baseUrl="http://localhost:5000/api/";

  public getCategories(): Observable<any> {

    return this.http.get(this.baseUrl+"categories");

  }




}



