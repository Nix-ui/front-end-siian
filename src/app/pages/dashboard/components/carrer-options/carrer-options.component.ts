import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-carrer-options',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './carrer-options.component.html',
  styleUrl: './carrer-options.component.scss'
})
export class CarrerOptionsComponent {
  carrerOptions = [
    {
      name: 'Crear Carrera',
      icon: 'briefcase.svg',
      path: `${environment.API_URL}${environment.ADMIN_PATH}/register-carrer`
    }
  ]
  constructor() { }

}
