import { Component } from '@angular/core';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-dashboard',
  imports: [RegisterUserComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Dashboard');
  }
}
