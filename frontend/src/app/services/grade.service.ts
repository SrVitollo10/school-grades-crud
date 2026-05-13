import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private apiUrl = 'http://localhost:3000/api/grades';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getGrades(): Observable<any> {
    return this.http.get(this.apiUrl, this.getHeaders());
  }

  createGrade(grade: any): Observable<any> {
    return this.http.post(this.apiUrl, grade, this.getHeaders());
  }

  deleteGrade(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}