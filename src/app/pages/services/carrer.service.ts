import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrer, RegisterCarrerInterface } from '../interfaces/carrer';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarrerService {

  constructor(
    private http: HttpClient
  ) { }
  getCarrers(): Observable<Carrer[]> {
    return this.http.get<Carrer[]>(`${environment.API_URL}/carrer`);
  }
  getCarrerById(id: number): Observable<Carrer> {
    return this.http.get<Carrer>(`${environment.API_URL}/carrer/${id}`);
  }
  getCarrerByName(name: string): Observable<Carrer[]> {
    return this.http.get<Carrer[]>(`${environment.API_URL}/carrer/${name}`);
  }
  getCarrersByDepartment(departmentId: number): Observable<Carrer[]> {
    return this.http.get<Carrer[]>(`${environment.API_URL}/carrer/department/${departmentId}`);
  }
  registerCarrer(carrer:RegisterCarrerInterface): Observable<Carrer> {
    return this.http.post<Carrer>(`${environment.API_URL}${environment.ADMIN_PATH}/create-carrer`, carrer);
  }
}
