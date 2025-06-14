import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { RegisterUserComponent } from './pages/dashboard/components/register-user/register-user.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard,RoleGuard],data: { roles: ['admin'] } },
    {path: 'admin/users/register',component: RegisterUserComponent, canActivate: [AuthGuard,RoleGuard],data: { roles: ['admin'] } },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
