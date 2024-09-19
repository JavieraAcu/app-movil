import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser: User | null = null;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.currentUser = this.loginService.getCurrentUser(); // Obtener usuario actual
    if (!this.currentUser) {
      console.warn('No hay usuario autenticado');
    } 
  }

  ingresarLogin() {
    this.router.navigate(['/login']);
  }
}
