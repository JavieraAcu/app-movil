import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    this.currentUser = await this.authService.getCurrentUser(); // Obtener usuario actual
    const isAuthenticated = await this.authService.isAuthenticated(); // Verifica si el usuario está autenticado
    if (!isAuthenticated) {
      console.warn('No hay usuario autenticado');
    } else {
      console.log('Usuario autenticado:', this.currentUser);
    }
  }

  ingresarLogin() {
    this.router.navigate(['/login']);
  }
}
