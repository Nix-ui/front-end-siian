import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/course';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient
  ) { }
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${environment.API_URL}/course/${id}`);
  }
}
