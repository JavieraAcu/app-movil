import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Storage } from '@ionic/storage-angular'; // Importa Storage

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentUserKey = 'currentUser'; // Clave para almacenar el usuario
  private currentUser: User | null = null;
  private users: User[] = []; // Asume que tienes un array de usuarios

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create(); // Inicializa el almacenamiento
    this.users = await this.storage.get('users') || []; // Cargar usuarios almacenados
    this.currentUser = await this.storage.get(this.currentUserKey); // Recupera el usuario al iniciar
  }

  // Registrar un nuevo usuario
  async registerUser(username: string, email: string, password: string): Promise<boolean> {
    const existingUser = this.users.find(user => user.username === username);
    if (existingUser) {
      console.log('El usuario ya existe');
      return false; // El usuario ya existe
    } else {
      const newUser = new User(username, email, password);
      this.users.push(newUser); // Agrega el nuevo usuario al array
      await this.storage.set('users', this.users); // Almacena el array actualizado
      console.log('Usuario registrado con éxito');
      return true; // Registro exitoso
    }
  }

  async validateLogin(u: string, p: string): Promise<boolean> {
    const found = this.users.find((user) => user.username === u);
    if (found && found.password === p) {
      this.currentUser = found; 
      await this.storage.set(this.currentUserKey, found); // Almacena el usuario
      console.log('Usuario encontrado!');
      return true;
    }
    console.log('Usuario no encontrado');
    return false;
  }

  async validateUser(u: string): Promise<boolean> {
    const found = this.users.find((user) => user.username === u);
    if (found) {
      this.currentUser = found;
      await this.storage?.set('currentUser', this.currentUser);
      console.log('validateUser found user');
      return true;
    }
    console.log('validateUser didn\'t find user');
    return false;
  }

  // Cambiar contraseña
  async changePassword(username: string, newPassword: string): Promise<boolean> {
    const foundUser = this.users.find(user => user.username === username);
    if (foundUser) {
      foundUser.password = newPassword; // Cambia la contraseña
      await this.storage.set('users', this.users); // Almacena el array actualizado
      this.currentUser = foundUser; // Actualiza el usuario actual si es necesario
      console.log('Contraseña cambiada con éxito');
      return true;
    }
    console.log('Usuario no encontrado');
    return false;
  }

  async logout() {
    await this.storage.remove(this.currentUserKey); // Elimina el usuario del almacenamiento
    this.currentUser = null; // Limpia la variable actual
    console.log('Usuario deslogueado');
  }

  async getCurrentUser(): Promise<User | null> {
    if (!this.currentUser) {
      this.currentUser = await this.storage.get(this.currentUserKey); // Recupera el usuario del almacenamiento
    }
    return this.currentUser;
  }


  backtoLogin(){
    console.log('Volver a home')
    return true;
  }

}

