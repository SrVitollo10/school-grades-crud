import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isRegisterMode = false;

  name = '';
  email = '';
  password = '';

  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  changeMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
    this.successMessage = '';
    this.name = '';
    this.email = '';
    this.password = '';
  }

  submitForm(): void {
    if (this.isRegisterMode) {
      this.register();
    } else {
      this.login();
    }
  }

  register(): void {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.register(userData).subscribe({
      next: () => {
        this.successMessage = 'Usuario registrado correctamente. Ahora puedes iniciar sesión.';
        this.errorMessage = '';
        this.isRegisterMode = false;
        this.name = '';
        this.password = '';
      },
      error: () => {
        this.errorMessage = 'No se pudo registrar el usuario';
        this.successMessage = '';
      }
    });
  }

  login(): void {
    const userData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(userData).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Correo o contraseña incorrectos';
        this.successMessage = '';
      }
    });
  }
}