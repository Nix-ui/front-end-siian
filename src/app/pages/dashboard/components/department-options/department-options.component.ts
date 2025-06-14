import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-department-options',
  imports: [CommonModule, RouterLink],
  templateUrl: './department-options.component.html',
  styleUrl: './department-options.component.scss'
})
export class DepartmentOptionsComponent {
  departmentOptions = [
    {
      name: 'Crear Departamento',
      icon: 'building-plus.svg',
      path: `${environment.API_URL}${environment.ADMIN_PATH}/create-department`
    }
  ]
  constructor() { }
}
