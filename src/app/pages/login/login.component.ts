import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  loading = false;
  error = '';
  returnUrl = '';
  constructor(private fb: FormBuilder
    , private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.titleService.setTitle('Login');
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]), 
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    console.log(passwordInput);
    if (passwordInput && this.showPassword) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }else{
      passwordInput.type = 'password';
    }
  }
  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          console.log('Login successful');
          alert('Inicio de sesión exitoso');
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          this.error = error.error?.message || 'Error al iniciar sesión';
          this.loading = false;
        }
      });
    }
  }

}
