import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  constructor(private http: HttpClient) { }
  getProvinces(departmentId: number): Observable<any> {
    return this.http.get(`${environment.API_URL}${environment.PROVINCES_ENDPOINT}/${departmentId}`);
  }
  getProvince(provinceId: number): Observable<any> {
    return this.http.get(`${environment.API_URL}${environment.PROVINCES_ENDPOINT}/${provinceId}`);
  }
  getProvincesByDepartment(departmentId: string): Observable<any> {
    return this.http.get(`${environment.API_URL}${environment.PROVINCES_ENDPOINT}/${departmentId}`);
  }
}
