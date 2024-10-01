import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.services'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.authService.isAuthenticated(); // Espera a que la promesa se resuelva

    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
      return false; // Bloquea el acceso
    }
    return true; // Permite el acceso
  }
}
