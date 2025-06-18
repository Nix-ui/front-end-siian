import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Inyecta el servicio aquí

  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('AuthInterceptorFn: Encabezado Authorization añadido.');
  } else {
    console.log('AuthInterceptorFn: No se encontró token, encabezado Authorization no añadido.');
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.error('AuthInterceptorFn: Recibido 401, cerrando sesión.');
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};