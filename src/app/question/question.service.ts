import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from './categoryInterface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:5000/api/";

  public getCategories(): Observable<ICategory> {

    return this.http.get(this.baseUrl + "categories");

  }
  public createQuestion(questionForm: any): Observable<any> {

    return this.http.post(this.baseUrl + "questions", questionForm);
  }

public getQuestion():Observable<any>
{

  return this.http.get(this.baseUrl+"questions");
}


}



