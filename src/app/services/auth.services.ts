import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { User } from '../models/user';
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
  async registerUser(username: string, email: string, password: string): Promise<boolean> {
    // Recupera todos los usuarios almacenados
    const users: User[] = (await this.storage.get('users')) || [];
  
    // Verifica si el usuario ya existe
    const existingUser = users.find(user => user.username === username);
    if (!existingUser) {
      const newUser: User = new User(username, email, password); // Crea un nuevo usuario
      users.push(newUser); // Agrega el nuevo usuario al arreglo
      await this.storage.set('users', users); // Almacena la lista de usuarios
      console.log('Usuario registrado con éxito');
      return true; // Registro exitoso
    }
    console.log('El nombre de usuario ya existe.');
    return false; // Registro fallido
  }

  // Lógica para iniciar sesión
  async login(username: string, password: string): Promise<boolean> {
    const users: User[] = (await this.storage.get('users')) || [];
    const storedUser = users.find(user => user.username === username);
  
    if (storedUser && storedUser.password === password) {
      this.loggedIn = true;
      await this.storage.set('loggedIn', true);
      await this.storage.set('currentUser', storedUser); // Guarda el usuario actual
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
  async isAuthenticated(): Promise<boolean> {
    const loggedInStatus = await this.storage.get('loggedIn');
    return loggedInStatus || false;  // Retorna el estado de autenticación
  }
  
  async getCurrentUser(): Promise<User | null> {
    return await this.storage.get('currentUser'); // Devuelve el usuario actual
  }
}
