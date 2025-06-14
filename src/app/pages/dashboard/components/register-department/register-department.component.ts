import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterDepartmentService } from './services/register-department.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-register-department',
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './register-department.component.html',
  styleUrl: './register-department.component.scss'
})
export class RegisterDepartmentComponent {
  constructor(
    private registerDepartmentService: RegisterDepartmentService,
    private fb: FormBuilder,
  ) { 
  }
  getFieldError(formName: string, fieldName: string): string | null {
    return this.registerDepartmentService.getFieldError(formName, fieldName);
  }
  getForm(): FormGroup {
    return this.registerDepartmentService.getDepartmentForm();
  }
  isFormValid(): boolean {
    return this.registerDepartmentService.isFormValid();
  }
  resetForm() {
    this.registerDepartmentService.getDepartmentForm().reset();
  }
  onSubmit() {
    this.registerDepartmentService.registerDepartment();
    // Aquí puedes realizar acciones adicionales, como enviar los datos al servidor, etc.
  }
}
