import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AcademicPeriodService } from '../../services/academic-period.service';
import { AcademicPeriod, RegisterAcademicPeriodInterface } from '../../interfaces/academic-period';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-academic-period',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-academic-period.component.html',
  styleUrl: './register-academic-period.component.scss'
})
export class RegisterAcademicPeriodComponent {
  academicForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private academicPeriodService: AcademicPeriodService,
    private router: Router
  ) {
    this.academicForm = this.fb.group({
      name:['',Validators.required] ,
      startDate:['',Validators.required] ,
      endDate:['',Validators.required] ,
    });
  }
  checkDates(startDate:string, endDate:string):boolean {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    return startDateObj < endDateObj;
  }
  onSubmit(){
    const academicPeriod:RegisterAcademicPeriodInterface = {
      name: this.academicForm.value.name,
      startDate: this.academicForm.value.startDate,
      endDate: this.academicForm.value.endDate,
    }
    this.academicPeriodService.registerAcademicPeriod(academicPeriod).subscribe({
      next: (response: AcademicPeriod) => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
