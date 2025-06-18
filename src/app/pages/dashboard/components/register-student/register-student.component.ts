import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder , ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { ProfileComponent } from '../register-user/profile/profile.component';
import { RegisterStudentService } from '../../services/register-student.service';
import { PersonalInfoComponent } from '../register-user/personal-info/personal-info.component';
import { UserAddressFormComponent } from '../register-user/user-address-form/user-address-form.component';
import { Title } from '@angular/platform-browser';
import { Department } from '../../../interfaces/department';
import { Carrer } from '../../../interfaces/carrer';
import { DepartmentService } from '../../../services/department.service';
import { CarrerService } from '../../../services/carrer.service';
@Component({
  selector: 'app-register-student',
  imports: [ReactiveFormsModule, CommonModule, ProfileComponent, PersonalInfoComponent,
    UserAddressFormComponent
  ],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.scss'
})
export class RegisterStudentComponent implements OnInit {
  currentStep!: number;
  departments: Department[] = [];
  carrers: Carrer[] = [];
  constructor(public registerStudentService: RegisterStudentService,
    private titleService: Title,
    private departmentService: DepartmentService,
    private carrerService: CarrerService,
  ) {
    this.titleService.setTitle('Registrar Usurio');
    this.registerStudentService.currentStep$.subscribe(step => {
      this.currentStep = step;
    });
  }
  ngOnInit() {
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }
  onChangeDepartment(event: any) {
    const departmentId = event.target.value;
    console.log(departmentId);
    this.carrerService.getCarrersByDepartment(departmentId).subscribe(carrers => {
      this.carrers = carrers;
      console.log(carrers);
    });
  }
  onChangeCarrer(event: any) {
    const carrerName = event.target.value;
    this.getForm().get('carrer')?.setValue(carrerName);
  } 
  getForm(){
    return this.registerStudentService.studentForm;
  }
  submitForm() {
    this.getForm().markAllAsTouched();
    this.registerStudentService.getAllFormData();
  }
  resetForm() {
    this.registerStudentService.resetForm();
  }
  getFieldError(formName: string, fieldName: string): string | null {
    return this.registerStudentService.getFieldError(formName, fieldName);
  }
  nextStep() {
    this.registerStudentService.nextStep();
    this.registerStudentService.currentStep$.subscribe(step => {
      this.currentStep = step;
    });
  }
  
  submit(){
    this.registerStudentService.submitForm();
  }
}
