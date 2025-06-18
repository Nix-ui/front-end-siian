import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../interfaces/department';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient
  ) { }
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.API_URL}/department`);
  }
}
