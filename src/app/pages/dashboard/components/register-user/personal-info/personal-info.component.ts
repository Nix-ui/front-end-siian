import { Component, Input } from '@angular/core';
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
  @Input() formGroup!: any;
  constructor(public registerUserService: RegisterUserService) {}
  getForm(){
    if(this.formGroup){
      return this.formGroup;
    }
    return this.registerUserService.personalInfoForm;
  }
  getFieldError(formName:string,fieldName:string): string | null {
    return this.registerUserService.getFieldError(formName, fieldName);
  }
  nextStep() {
    this.registerUserService.nextStep();
  }
}
