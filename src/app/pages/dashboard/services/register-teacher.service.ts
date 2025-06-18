import { Injectable } from '@angular/core';
import { RegisterStudentInterface } from '../interfaces/register-student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { RegisterFullTeacherInterface, RegisterTeacherInterface } from '../../interfaces/teacher';
@Injectable({
    providedIn: 'root'
})
export class RegisterTeacherService {
    private currentStepSubject = new BehaviorSubject<number>(1);
    private formDataSubject = new BehaviorSubject<Partial<RegisterStudentInterface>>({});  
    currentStep$ = this.currentStepSubject.asObservable();
    formData$ = this.formDataSubject.asObservable();
    // Formularios para cada paso
    personalInfoForm!: FormGroup;
    addressForm!: FormGroup;
    accountForm!: FormGroup;
    teacherForm!: FormGroup;
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
        });
        this.teacherForm = this.fb.group({
        hireDate: ['', Validators.required],
        subjects:[this.fb.array([]), Validators.required],
        });
    }
    private passwordMatchValidator(form: FormGroup) {
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { passwordMismatch: true };
    }
    nextStep() {
        const currentStep = this.currentStepSubject.value;
        if (currentStep < 4 && this.isCurrentStepValid()) {
        this.updateFormData();
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
        if (step >= 1 && step <= 4) {
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
        case 4:
            return this.teacherForm.valid;
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
    getAllFormData(): RegisterTeacherInterface {
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
        password: this.accountForm.value.password,
        hireDate: this.teacherForm.value.hireDate
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
            if(this.teacherForm.value.subjects.length >0){
                const teacherData= {
                    ...this.getAllFormData(),
                    subjectsCodes: this.teacherForm.value.subjects.map((subject: any) => subject.id)
                } as RegisterFullTeacherInterface;
                console.log(teacherData);
                return this.registerFullTeacher(teacherData);
            }else{
                return this.registerUser(this.getAllFormData());
            }
    }
    async registerUser(userData: RegisterTeacherInterface): Promise<any> {
        return this.http.post(`${environment.API_URL}${environment.ADMIN_PATH}/register-teacher`, userData).toPromise();
    }
    async registerFullTeacher(userData: RegisterFullTeacherInterface): Promise<any> {
        return this.http.post(`${environment.API_URL}${environment.ADMIN_PATH}/register-teacher-with-subjects`, userData).toPromise();
    }
}
