import { Component, Output, EventEmitter,Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterUserService } from '../../../services/register-user.service';
@Component({
  selector: 'app-profile',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Input() formGroup!: any;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  constructor(public registerUserService: RegisterUserService) {}
  
  getFieldError(formName: string, fieldName: string): string | null {
    return this.registerUserService.getFieldError(formName, fieldName);
  }
  getForm(){
    if(this.formGroup){
      return this.formGroup;
    }
    return this.registerUserService.accountForm;
  }
  toglePasswordVisibility() {
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
    if (passwordInput) {
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
      this.showPassword = !this.showPassword;
      this.togleImgPassword('showPassword',this.showPassword);
    }
  }
  tooglePasswordVisibilityConfirm() {
    const passwordInput = document.getElementById('confirmPassword') as HTMLInputElement | null;
    if (passwordInput) {
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
      this.showConfirmPassword = !this.showConfirmPassword;
      this.togleImgPassword('showConfirmPassword',this.showConfirmPassword);
    }
  }
  togleImgPassword(id:string, condition:boolean){
    const imgEye = document.getElementById(id) as HTMLImageElement | null;
    if (imgEye) {
      if(condition){
        imgEye.src = 'assets/icons/eye-off.svg'
      }else{
        imgEye.src = 'assets/icons/eye.svg'
      }
    }
  }
}
