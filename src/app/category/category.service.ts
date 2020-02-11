import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:5000/api/";

  public createCategory(categoryForm: any): Observable<any> {

    return this.http.post(this.baseUrl + "categories", categoryForm);
  }
  public getCategory(filterForm?: any): Observable<any> {
    return this.http.get(this.baseUrl + "categories", { params: filterForm });
  }

  public getCategoryById(categoryId: number): Observable<any> {
    return this.http.get(this.baseUrl + "categories/" + categoryId);
  }

  public updateCategory(categoryId: number, categoryForm: any): Observable<any> {
    return this.http.put(this.baseUrl + "categories/" + categoryId, categoryForm);

  }

}
