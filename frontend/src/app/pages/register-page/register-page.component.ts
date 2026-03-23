import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {
  username = '';
  password = '';
  fullName = '';
  role = 'PATIENT';
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  onSubmit() {
    this.error = '';
    const user = {
      username: this.username,
      password: this.password,
      fullName: this.fullName,
      role: this.role
    };
    this.api.register(user).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.error = 'Registration failed'
    });
  }
}

