import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptorFn } from './auth/interceptors/auth.interceptor';
import { AuthService } from './auth/services/auth.service';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withFetch(),
    withInterceptors([
      authInterceptorFn
    ])
  )
  ]
};
