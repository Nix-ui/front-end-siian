import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasRoleDirective } from '../../auth/directives/has-role.directive';
import { AuthService } from '../../auth/services/auth.service';
import { SideBarItem } from './interfaces/side-bar-item';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [HasRoleDirective, CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  openedItems = new Set<SideBarItem>();
  sideBarItems: SideBarItem[]=[
    {
      label: 'Inicio',
      icon: 'home.svg',
      route: '/dashboard',
      roles: ['admin']
    },
    {
      label: 'Admin',
      icon: 'shield-code.svg',
      route: '/users',
      roles: ['admin'],
      children: [
        {
          label: 'Usuarios',
          route: 'admin/users',
          roles: ['admin'],
          children:[{
            label: 'Crear Usuario', 
            route: 'admin/users/register',
            roles: ['admin']
          },{
            label: 'Editar Usuario',
            route: 'admin/users/edit',
            roles: ['admin']
          }
        ]
      },
      {
        label: 'Departamentos',
        roles: ['admin'],
        children: [
          {
            label: 'Crear Departamento',
            route: 'admin/department/register',
            roles: ['admin']
          }
        ]
      }
    ]
  },
  {
    label: 'Reportes',
    icon: 'report.svg',
    route: '/report',
    roles:['standard','admin']
  },
  {
    label: 'Configuración',
    icon: 'settings.svg',
    route: '/settings',
    roles:['standard','admin']
  }

]
  constructor(private authService: AuthService) {}
  showDropdownAdmin:boolean = false;
  logout() {
    this.authService.logout();
  }
  toggleDropdownAdmin(){
    const dropdown = document.getElementById('admin-dropdown') as HTMLInputElement | null;
    if (dropdown) {
      dropdown.classList.toggle('dropdown-open');
    }
    this.showDropdownAdmin = !this.showDropdownAdmin;
  }
  toggleDropdown(item: SideBarItem) {
    if (this.openedItems.has(item)) {
      this.openedItems.delete(item);
    } else {
      this.openedItems.add(item);
    }
  }

  isOpen(item: SideBarItem): boolean {
    return this.openedItems.has(item);
  }
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
