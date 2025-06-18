import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher, RegisterTeacherInterface } from '../interfaces/teacher';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

    constructor(
    private http: HttpClient
    ) { }
    getTeachers(): Observable<Teacher[]> {
        return this.http.get<Teacher[]>(`${environment.API_URL}/teacher`);
    }
    createTeacher(teacher: RegisterTeacherInterface): Observable<Teacher> {
        return this.http.post<Teacher>(`${environment.API_URL}${environment.ADMIN_PATH}/register-teacher`, teacher);
    }
    registerTeacher(teacher:RegisterTeacherInterface): Observable<Teacher> {
        return this.http.post<Teacher>(`${environment.API_URL}${environment.ADMIN_PATH}/register-teacher-with-subjects`, teacher);
    }
}
