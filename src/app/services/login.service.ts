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
    this.currentUser = await this.storage.get(this.currentUserKey); // Recupera el usuario al iniciar
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

  async resetPassword(u: string, p: string): Promise<boolean> {
    const found = this.users.find((user) => user.username === u);
    if (found && found.password === p) {
      this.currentUser = found;
      console.log('resetPassword found user');
      return true;
    }
    console.log('resetPassword didn\'t find user');
    return false;
  }

  async logout() {
    await this.storage.remove(this.currentUserKey); // Elimina el usuario del almacenamiento
    this.currentUser = null; // Limpia la variable actual
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

