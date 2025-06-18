import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder , ReactiveFormsModule, FormControl, FormGroup, FormArray } from '@angular/forms';
import { first } from 'rxjs';
import { ProfileComponent } from '../components/register-user/profile/profile.component';
import { RegisterTeacherService } from '../services/register-teacher.service';
import { PersonalInfoComponent } from '../components/register-user/personal-info/personal-info.component';
import { UserAddressFormComponent } from '../components/register-user/user-address-form/user-address-form.component';
import { Title } from '@angular/platform-browser';
import { Teacher, RegisterTeacherInterface } from '../../interfaces/teacher';
import { Router } from '@angular/router';
import { Subject } from '../../interfaces/subject';
import { SubjectService } from '../../services/subject.service';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-register-user',
  imports: [ReactiveFormsModule, CommonModule, ProfileComponent, PersonalInfoComponent,
    UserAddressFormComponent
  ],
  templateUrl: './register-teacher.component.html',
  styleUrl: './register-teacher.component.scss'
})
export class RegisterTeacherComponent implements OnInit {
  currentStep!: number;
  numberOfSubjects = 0;
  listOfSubjects!: number[];
  subjects:Subject[] = [];
  subjectsForm!: FormArray;
  selectedSubjects: string[] = [];
  constructor(public registerTeacherService: RegisterTeacherService,
    private titleService: Title,
    private router: Router,
    private fb: FormBuilder,
    private subjectService:SubjectService,
    private teacherService: TeacherService
  ) {
    this.titleService.setTitle('Registrar Usurio');
    this.registerTeacherService.currentStep$.subscribe(step => {
      this.currentStep = step;
    });
    this.subjectService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
    });
    this.subjectsForm = this.fb.array([]);
  }
  ngOnInit() {
    this.subjectService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
    });
  }
  addSubject() {
    this.numberOfSubjects++;
    this.listOfSubjects = Array(this.numberOfSubjects).fill(1).map((x, i) => i);
  }
  selectSubject(event: any) {
    console.log(event);
    const subject = event.target.value as string;
    const index =this.numberOfSubjects-1;
    const newSubjects= [...this.selectedSubjects, subject];
    if (event.target.checked) {
      console.log(this.selectedSubjects);
    }
    const select = document.getElementById('subject' + index) as HTMLSelectElement;
    this.selectedSubjects = newSubjects;
    select.innerHTML = this.subjects.map(sub => {
      if(sub.code == subject){
        return `<option  selected>${sub.code}-${sub.name}</option>`;
      }else{
        return `<option>${sub.code}-${sub.name}</option>`;
      }
    }
    ).join('');
    this.subjects = this.subjects.filter(sub=> subject != sub.code);
    select.disabled = true;
    console.log(this.selectedSubjects);
  }
  getForm(){
    return this.registerTeacherService.teacherForm;
  }
  submitForm() {
    this.getForm().markAllAsTouched();
    this.registerTeacherService.getAllFormData();
  }
  resetForm() {
    this.registerTeacherService.resetForm();
  }
  getFieldError(formName: string, fieldName: string): string | null {
    return this.registerTeacherService.getFieldError(formName, fieldName);
  }
  nextStep() {
    this.registerTeacherService.nextStep();
    this.registerTeacherService.currentStep$.subscribe(step => {
      this.currentStep = step;
    });
  }
  
  submit(){
    console.log(this.registerTeacherService.getAllFormData());
    const teacher = {
      id: this.registerTeacherService.personalInfoForm.value.id,
      firstName: this.registerTeacherService.personalInfoForm.value.firstName,
      maternalLastName: this.registerTeacherService.personalInfoForm.value.maternalLastName,
      paternalLastName: this.registerTeacherService.personalInfoForm.value.paternalLastName,
      department: this.registerTeacherService.addressForm.value.department,
      province:this.registerTeacherService.addressForm.value.province,
      street: this.registerTeacherService.addressForm.value.street,
      details: this.registerTeacherService.addressForm.value.details,
      email: this.registerTeacherService.accountForm.value.email,
      password: this.registerTeacherService.accountForm.value.password,
      hireDate: this.registerTeacherService.teacherForm.value.hireDate,
    } as RegisterTeacherInterface
    if(this.numberOfSubjects > 0){
      const registerTeacher ={
        ... teacher,
        subjects: this.selectedSubjects
      }
      this.teacherService.registerTeacher(registerTeacher).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log(error);
        }
      );
    }else{
      this.teacherService.createTeacher(teacher).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
