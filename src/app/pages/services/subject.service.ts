import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterSubjectInterface, Subject } from '../interfaces/subject';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    private http: HttpClient
  ) { }
  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${environment.API_URL}/subject`);
  }
  getSubjectByCarrerId(carrerId:number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${environment.API_URL}/subject/carrer/${carrerId}`);
  }
  getSubjectByCarrerName(carrerName:string): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${environment.API_URL}/subject/carrer/${carrerName}`);
  }
  createSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${environment.API_URL}${environment.ADMIN_PATH}/create-subject`, subject);
  }
  registerSubject(subject:RegisterSubjectInterface): Observable<Subject> {
    return this.http.post<Subject>(`${environment.API_URL}${environment.ADMIN_PATH}/register-subject`, subject);
  }
}
