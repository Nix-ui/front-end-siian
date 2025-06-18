import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AcademicPeriod, RegisterAcademicPeriodInterface } from '../interfaces/academic-period';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademicPeriodService {

  constructor(
    private http: HttpClient
  ) { }
  getAcademicPeriods(): Observable<AcademicPeriod[]> {
    return this.http.get<AcademicPeriod[]>(`${environment.API_URL}/academic-period`);
  }
  registerAcademicPeriod(academicPeriod:RegisterAcademicPeriodInterface): Observable<AcademicPeriod> {
    return this.http.post<AcademicPeriod>(`${environment.API_URL}${environment.ADMIN_PATH}/register-academic-period`, academicPeriod);
  }
}
