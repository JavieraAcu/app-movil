import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false; // Esto cambiará según tu lógica real de autenticación.

  constructor(private router: Router) {}

  login() {
    // Lógica para autenticar al usuario.
    this.loggedIn = true;
  }

  logout() {
    // Lógica para cerrar sesión.
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    // Retorna si el usuario está autenticado.
    return this.loggedIn;
  }
}
