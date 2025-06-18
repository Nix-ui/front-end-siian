import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectService } from '../../services/subject.service';
import { CarrerService } from '../../services/carrer.service';
import { Carrer } from '../../interfaces/carrer';
import { Subject, RegisterSubjectInterface } from '../../interfaces/subject';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-subject',
  imports: [ReactiveFormsModule],
  templateUrl: './register-subject.component.html',
  styleUrl: './register-subject.component.scss'
})
export class RegisterSubjectComponent implements OnInit {
  carrers: Carrer[] = [];
  subjectForm!: FormGroup;
  constructor(
    private subjectService: SubjectService,
    private carrerService: CarrerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.subjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      carrer: new FormControl({
        value: null,
        disabled: true
      }),
    });
    this.carrerService.getCarrers().subscribe(carrers => {
      this.carrers = carrers;
    });
  }
  ngOnInit(): void {
    this.carrerService.getCarrers().subscribe(carrers => {
      this.carrers = carrers;
    });
    
  }
  onSubmit() {
    if (this.subjectForm.valid) {
      if(this.subjectForm.get('carrer')?.value === null){
        const subject: Subject = {
          name: this.subjectForm.value.name,
          code: this.subjectForm.value.code,
        };
        this.subjectService.createSubject(subject).subscribe(subject => {
          console.log(subject);
          this.router.navigate(['/dashboard']);
        });
      }
      const subject: RegisterSubjectInterface = {
        name: this.subjectForm.value.name,
        code: this.subjectForm.value.code,
        carrer: this.subjectForm.value.carrer
      };
      this.subjectService.registerSubject(subject).subscribe(subject => {
        console.log(subject);
        this.router.navigate(['/dashboard']);
      });
    }
  }
  selectCarrer() {
    const checkBox = document.getElementById('selectCarrer') as HTMLInputElement;
    if (checkBox.checked) {
      const carrer = document.getElementById('carrer') as HTMLSelectElement;
      carrer.disabled = false;
      this.subjectForm.get('carrer')?.enable();
    }
    else {
      const carrer = document.getElementById('carrer') as HTMLSelectElement;
      carrer.disabled = true;
      this.subjectForm.get('carrer')?.disable();
      this.subjectForm.get('carrer')?.setValue(null);
    }
  }
}
