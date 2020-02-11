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

  public getCategories(): Observable<any> {

    return this.http.get(this.baseUrl + "categories");

  }
  public getTemplate(): Observable<any> {
    return this.http.get(this.baseUrl + "templates");
  }
  public createQuestion(questionForm: any): Observable<any> {

    return this.http.post(this.baseUrl + "questions", questionForm);
  }

  public getQuestion(filterForm?: any): Observable<any> {

    return this.http.get(this.baseUrl + "questions", { params: filterForm });
  }
  public getQuestionById(questionId: number): Observable<any> {

    return this.http.get(this.baseUrl + "questions/" + questionId);
  }

  public updateQuestion(questionId: number, changeData: any): Observable<any> {

    return this.http.put(this.baseUrl + "questions/" + questionId, changeData);
  }

}



