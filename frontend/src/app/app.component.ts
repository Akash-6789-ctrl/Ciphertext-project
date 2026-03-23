import { Component } from '@angular/core';
import { AuthService, AuthUser } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'SPECIALIZED ENCIPHERED ACCESS THROUGH TEXT STEGANOGRAPHY';

  constructor(public auth: AuthService) {}

  get user(): AuthUser | null {
    return this.auth.getUser();
  }
}

