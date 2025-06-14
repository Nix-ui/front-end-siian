import { Component } from '@angular/core';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UserOptionsComponent } from './components/user-options/user-options.component';
import { DepartmentOptionsComponent} from './components/department-options/department-options.component';
@Component({
  selector: 'app-dashboard',
  imports: [ CommonModule, UserOptionsComponent, DepartmentOptionsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Dashboard');
  }
}
