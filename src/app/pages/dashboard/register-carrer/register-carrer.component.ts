import { Component,OnInit } from '@angular/core';
import { CarrerService } from '../../services/carrer.service';
import { Carrer,RegisterCarrerInterface } from '../../interfaces/carrer';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../interfaces/department';
@Component({
  selector: 'app-register-carrer',
  imports: [ReactiveFormsModule],
  templateUrl: './register-carrer.component.html',
  styleUrl: './register-carrer.component.scss'
})
export class RegisterCarrerComponent {
    carrerForm!: FormGroup;
    departments: Department[] = [];
    constructor(
        private carrerService: CarrerService,
        private departmentService: DepartmentService,
        private formBuilder: FormBuilder
    ) { }
    ngOnInit(): void {
        this.carrerForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            totalSemester:[0, Validators.required],
            departmentId: [0, Validators.required],
            state:['active', Validators.required],
            creationDate:[new Date().toISOString(), Validators.required]
        });
        this.departmentService.getDepartments().subscribe(departments => {
            this.departments = departments;
        });
    }
    onSubmit() {
        if (this.carrerForm.valid) {
            const carrer: RegisterCarrerInterface = {
                name: this.carrerForm.value.name,
                description: this.carrerForm.value.description,
                totalSemester: this.carrerForm.value.totalSemester,
                departmentId: parseInt(this.carrerForm.value.departmentId),
                state: this.carrerForm.value.state,
                creationDate: this.carrerForm.value.creationDate
            };
            this.carrerService.registerCarrer(carrer).subscribe(carrer => {
                console.log(carrer);
            });
        }
    }
}
