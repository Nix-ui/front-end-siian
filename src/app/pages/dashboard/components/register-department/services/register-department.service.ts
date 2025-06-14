import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterDepartmentService {
  departmentForm!: FormGroup;
  constructor(private http: HttpClient,
    private fb: FormBuilder,
  ) { 
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  getDepartmentForm(): FormGroup {
    return this.departmentForm;
  }
  getFieldError(formName: string, fieldName: string): string | null {
    let form: FormGroup;

    switch (formName) {
      case 'department':
        form = this.departmentForm;
        break;
      default:
        return null;
    }

    const field = form.get(fieldName);
    if (field && field.invalid && (field.dirty || field.touched)) {
      const errors = field.errors;
      if (errors) {
        for (const errorKey in errors) {
          if (errors.hasOwnProperty(errorKey)) {
            return errors[errorKey];
          }
        }
      }
    }
    return null;
  }
  isFormValid(): boolean {
    return this.departmentForm.valid;
  }
  registerDepartment(): Promise<any> {
    console.log(this.departmentForm.value);
    return this.http.post(`${environment.API_URL}${environment.ADMIN_PATH}/create-department`, this.departmentForm.value).toPromise();
  }
}
