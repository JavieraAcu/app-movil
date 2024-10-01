import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;

  constructor(private router: Router, private storage: Storage) {
    this.init();
  }

  // Inicializa el almacenamiento
  async init() {
    await this.storage.create();
    const loggedInStatus = await this.storage.get('loggedIn');
    this.loggedIn = loggedInStatus || false;  // Verifica si ya hay una sesión activa
  }

  // Registrar un nuevo usuario
  async registerUser(username: string, password: string): Promise<boolean> {
    const storedUser = await this.storage.get(username);
    if (storedUser) {
      // Si el usuario ya existe
      return false;  // Registro fallido, el usuario ya existe
    } else {
      // Registrar un nuevo usuario
      const user = { username, password };
      await this.storage.set(username, user);
      return true;  // Registro exitoso
    }
  }

  // Lógica para iniciar sesión
  async login(username: string, password: string): Promise<boolean> {
    // Aquí puedes obtener las credenciales desde Ionic Storage (o una API si lo prefieres).
    const storedUser = await this.storage.get(username);

    if (storedUser && storedUser.password === password) {
      this.loggedIn = true;
      await this.storage.set('loggedIn', true);  // Guarda el estado de sesión
      return true; // Usuario autenticado correctamente
    } else {
      return false; // Usuario o contraseña incorrectos
    }
  }

  // Lógica para cerrar sesión
  async logout() {
    this.loggedIn = false;
    await this.storage.set('loggedIn', false);  // Actualiza el estado de sesión en el storage
    this.router.navigate(['/login']); // Redirige al login
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.loggedIn;
  }
}
