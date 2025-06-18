import { Component } from '@angular/core';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Options } from './interfaces/options.interface';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [ CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  options: Options[] = [
    {
      title: 'Usuarios',
      icon: 'user-circle.svg',
      children: [
        {
          title: 'Crear Usuario',
          icon: 'users-plus.svg',
          path: '/admin/user/register'
        }
      ]
    },
    {
      title: 'Departamentos',
      icon: 'buildings.svg',
      children: [
        {
          title: 'Crear Departamento',
          icon: 'building-plus.svg',
          path: '/admin/department/register'
        }
      ]
    },
    {
      title: 'Carreras',
      icon: 'certificate.svg',
      children: [
        {
          title: 'Crear Carrera',
          icon: 'certificate.png',
          path: '/admin/carrer/register'
        }
      ]
    },
    {
      title:'Periodo Academico',
      icon: 'calendar-week.svg',
      children: [
        {
          title: 'Crear Periodo',
          icon: 'calendar-plus.svg',
          path: '/admin/academic-period/register'
        }
      ]
    },
    {
      title:'Docentes',
      icon: 'teacher.png',
      children: [
        {
          title: 'Crear Docente',
          icon: 'teacher-plus.png',
          path: '/admin/teacher/register'
        }
      ]
    },
    {
      title: 'Asignaturas',
      icon: 'books.svg',
      children: [
        {
          title: 'Crear Asignatura',
          icon: 'book-plus.png',
          path: '/admin/subject/register'
        }
      ]
    },
    {
      title: 'Cursos',
      icon: 'books.svg',
      children: [
        {
          title: 'Crear Curso',
          icon: 'book-plus.png',
          path: '/admin/course/create'
        }
      ]
    },
    {
      title: 'Estudiantes',
      icon: 'school.svg',
      children: [
        {
          title: 'Crear Estudiante',
          icon: 'student-plus.png',
          path: '/admin/student/create',
        }
      ]
    }
  ]
  constructor(private titleService: Title) {
    this.titleService.setTitle('Dashboard');
  }
}
