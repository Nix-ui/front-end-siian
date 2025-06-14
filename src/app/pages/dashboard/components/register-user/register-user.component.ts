import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder , ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { ProfileComponent } from './profile/profile.component';
import { RegisterUserService } from '../../services/register-user.service';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { UserAddressFormComponent } from './user-address-form/user-address-form.component';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-register-user',
  imports: [ReactiveFormsModule, CommonModule, ProfileComponent, PersonalInfoComponent,
    UserAddressFormComponent
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {
  currentStep!: number;
  constructor(public registerUserService: RegisterUserService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Registrar Usurio');
    this.registerUserService.currentStep$.subscribe(step => {
      this.currentStep = step;
    });
  }
  submitForm() {
    this.registerUserService.getAllFormData();
  }
  resetForm() {
    this.registerUserService.resetForm();
  }
  getFieldError(formName: string, fieldName: string): string | null {
    return this.registerUserService.getFieldError(formName, fieldName);
  }
  nextStep() {
    this.registerUserService.nextStep();
    this.registerUserService.currentStep$.subscribe(step => {
      this.currentStep = step;
    });
  }
  submit(){
    console.log(this.registerUserService.getAllFormData());
    this.registerUserService.submitForm();
  }
}
