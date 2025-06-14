import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DepartmentsAddressService {

  constructor(private http: HttpClient) { }
  getDepartments(): Observable<any> {
    return this.http.get(`${environment.API_URL}${environment.DEPARTMENTS_ENDPOINT}`);
  }
}
