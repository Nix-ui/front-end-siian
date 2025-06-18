import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User, JwtPayload, AuthRequest, AuthResponse} from '../interfaces/auth';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // BehaviorSubject para manejar el estado del usuario
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromToken());
  public currentUser$ = this.currentUserSubject.asObservable();

  // BehaviorSubject para el estado de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Iniciar sesión
  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.API_URL}${environment.LOGIN_ENDPOINT}`, credentials)
      .pipe(
        tap(response => {
          this.setSession(response.access_token);
        })
      );
  }

  // Cerrar sesión
  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  // Configurar sesión después del login
  private setSession(token: string): void {
    localStorage.setItem(environment.TOKEN_KEY, token);
    
    const user = this.getUserFromToken();
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  // Limpiar sesión
  private clearSession(): void {
    localStorage.removeItem(environment.TOKEN_KEY);
    
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem(environment.TOKEN_KEY);
  }

  // Decodificar JWT y extraer payload
  private decodeToken(token: string): JwtPayload | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Obtener usuario desde el token JWT
  private getUserFromToken(): User | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = this.decodeToken(token);
    if (!payload) return null;

    return {
      uuid: payload.uuid,
      email: payload.email,
      roles: payload.roles || []
    };
  }

  // Obtener usuario actual
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.hasValidToken();
  }

  // Verificar si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.roles.includes(role) : false;
  }

  // Verificar si el usuario tiene alguno de los roles especificados
  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    return roles.some(role => user.roles.includes(role));
  }

  // Verificar si el usuario tiene todos los roles especificados
  hasAllRoles(roles: string[]): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    return roles.every(role => user.roles.includes(role));
  }

  // Verificar si el token es válido
  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = this.decodeToken(token);
    if (!payload) {
      this.clearSession();
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    
    if (payload.exp < currentTime) {
      this.clearSession();
      return false;
    }
    
    return true;
  }

  // Obtener tiempo de expiración del token
  getTokenExpiration(): Date | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = this.decodeToken(token);
    if (!payload) return null;

    return new Date(payload.exp * 1000);
  }

  // Verificar si el token expira pronto (útil para renovación automática)
  isTokenExpiringSoon(minutesThreshold: number = 5): boolean {
    const expiration = this.getTokenExpiration();
    if (!expiration) return true;

    const now = new Date();
    const timeDiff = expiration.getTime() - now.getTime();
    const minutesLeft = Math.floor(timeDiff / (1000 * 60));

    return minutesLeft <= minutesThreshold;
  }

  // Refrescar el estado del usuario desde el token actual
  refreshUserState(): void {
    if (this.hasValidToken()) {
      const user = this.getUserFromToken();
      this.currentUserSubject.next(user);
    } else {
      this.logout();
    }
  }
}

