import { Component } from '@angular/core';
import { RegisterUserService } from '../../../services/register-user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-personal-info',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})
export class PersonalInfoComponent {
  constructor(public registerUserService: RegisterUserService) {}
  getForm(){
    return this.registerUserService.personalInfoForm;
  }
  getFieldError(formName:string,fieldName:string): string | null {
    return this.registerUserService.getFieldError(formName, fieldName);
  }
  nextStep() {
    this.registerUserService.nextStep();
  }
}
