import { Injectable } from '@angular/core';
import { RegisterUserInterface} from '../interfaces/register-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {
  private currentStepSubject = new BehaviorSubject<number>(1);
  private formDataSubject = new BehaviorSubject<Partial<RegisterUserInterface>>({});
  
  currentStep$ = this.currentStepSubject.asObservable();
  formData$ = this.formDataSubject.asObservable();
  
  // Formularios para cada paso
  personalInfoForm!: FormGroup;
  addressForm!: FormGroup;
  accountForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private http: HttpClient
  ) { 
    this.initializeForms();
  }
  private initializeForms(){
    this.personalInfoForm = this.fb.group({
      id:['', Validators.required],
      firstName: ['', Validators.required],
      maternalLastName: ['', Validators.required],
      paternalLastName: ['', Validators.required]
    });
    this.addressForm = this.fb.group({
      department: ['', Validators.required],
      province: ['', Validators.required],
      street: ['', Validators.required],
      details: ['', Validators.required]
    });
    this.accountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    })
  }
  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  nextStep() {
    const currentStep = this.currentStepSubject.value;
    if (currentStep < 3 && this.isCurrentStepValid()) {
      this.updateFormData();
      console.log(this.accountForm.value);
      console.log(this.personalInfoForm.value);
      console.log(this.addressForm.value);
      this.currentStepSubject.next(currentStep + 1);
    }
  }
  previousStep() {
    const currentStep = this.currentStepSubject.value;
    if (currentStep > 1) {
      this.currentStepSubject.next(currentStep - 1);
    }
  }
  goToStep(step: number) {
    if (step >= 1 && step <= 3) {
      this.currentStepSubject.next(step);
    }
  }
  isCurrentStepValid(): boolean {
    const currentStep = this.currentStepSubject.value;
    switch (currentStep) {
      case 1:
        return this.accountForm.valid;
      case 2:
        return this.personalInfoForm.valid;
      case 3:
        return this.addressForm.valid;
      default:
        return false;
    }
  }
  private updateFormData() {
    const currentData = this.formDataSubject.value;
    const currentStep = this.currentStepSubject.value;
    
    let stepData = {};
    switch (currentStep) {
      case 1:
        stepData = this.personalInfoForm.value;
        break;
      case 2:
        stepData = this.addressForm.value;
        break;
      case 3:
        stepData = this.accountForm.value;
        break;
    }
    
    this.formDataSubject.next({ ...currentData, ...stepData });
  }
  getAllFormData(): RegisterUserInterface {
    this.updateFormData();
    return {
      id: this.personalInfoForm.value.id,
      firstName: this.personalInfoForm.value.firstName,
      maternalLastName: this.personalInfoForm.value.maternalLastName,
      paternalLastName: this.personalInfoForm.value.paternalLastName,
      department: this.addressForm.value.department,
      province:this.addressForm.value.province,
      street: this.addressForm.value.street,
      details: this.addressForm.value.details,
      email: this.accountForm.value.email,
      password: this.accountForm.value.password
    }
  }
  resetForm() {
    this.personalInfoForm.reset();
    this.addressForm.reset();
    this.accountForm.reset();
    this.currentStepSubject.next(1);
    this.formDataSubject.next({});
  }
  getFieldError(formName: string, fieldName: string): string | null {
    let form: FormGroup;
    
    switch (formName) {
      case 'personal':
        form = this.personalInfoForm;
        break;
      case 'address':
        form = this.addressForm;
        break;
      case 'account':
        form = this.accountForm;
        break;
      default:
        return null;
    }
    
    const field = form.get(fieldName);
    if (field && field.errors && field.touched) {
      const errors = field.errors;
      
      if (errors['required']) return `${fieldName} es requerido`;
      if (errors['email']) return 'Email inválido';
      if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
      if (errors['pattern']) return 'Formato inválido';
      if (errors['passwordMismatch']) return 'Las contraseñas no coinciden';
    }
    
    return null;
  }
  async submitForm(){
    return this.registerUser(this.getAllFormData());
  }
  async registerUser(userData: RegisterUserInterface): Promise<any> {
    return this.http.post(`${environment.API_URL}${environment.USER_ENDPOINT}`, userData).toPromise();
  }
}
