import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserOption } from './interfaces/user-option.interface';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-user-options',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-options.component.html',
  styleUrl: './user-options.component.scss'
})
export class UserOptionsComponent {
  userOptions: UserOption[] = [
    {
      name: 'Crear Usuario',
      icon: 'users-plus.svg',
      path: `${environment.ADMIN_PATH}/${environment.USER_ENDPOINT}s/register`
    }
  ];
  constructor() { }
}
