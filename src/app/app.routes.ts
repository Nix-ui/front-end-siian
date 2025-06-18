import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { RegisterUserComponent } from './pages/dashboard/components/register-user/register-user.component';
import { RegisterDepartmentComponent } from './pages/dashboard/components/register-department/register-department.component';
import { RegisterStudentComponent } from './pages/dashboard/components/register-student/register-student.component';
import { RegisterCarrerComponent } from './pages/dashboard/register-carrer/register-carrer.component';
import { RegisterAcademicPeriodComponent } from './pages/dashboard/register-academic-period/register-academic-period.component';
import { RegisterTeacherComponent } from './pages/dashboard/register-teacher/register-teacher.component';
import { RegisterSubjectComponent } from './pages/dashboard/register-subject/register-subject.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard,RoleGuard],data: { roles: ['admin'] } },
    { path:'admin/student/create',component:RegisterStudentComponent, canActivate: [AuthGuard,RoleGuard],data: { roles: ['admin'] } },
    {path: 'admin/users/register',component: RegisterUserComponent, canActivate: [AuthGuard,RoleGuard],data: { roles: ['admin'] } },
    { path: 'admin/department/register',component: RegisterDepartmentComponent, canActivate: [AuthGuard,RoleGuard],data: { roles: ['admin'] } },
    { path: 'admin/carrer/register',component: RegisterCarrerComponent, canActivate: [AuthGuard,RoleGuard],data: { roles: ['admin'] } },
    {path:'admin/academic-period/register',component:RegisterAcademicPeriodComponent,canActivate:[AuthGuard,RoleGuard],data:{roles:['admin']}},
    {path:'admin/teacher/register', component: RegisterTeacherComponent, canActivate: [AuthGuard,RoleGuard],data: { roles: ['admin'] } },
    {path:'admin/subject/register',component:RegisterSubjectComponent,canActivate:[AuthGuard,RoleGuard],data:{roles:['admin']}},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
