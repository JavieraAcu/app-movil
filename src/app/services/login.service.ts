import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[] = [
    new User('admin', 'admin@ionic.com', '12345'),
  ];

  private currentUser: User | null = null;
  constructor() { }

  validateLogin(u: string, p: string): boolean {
    const found = this.users.find(user => user.username === u)
    if (found && found.password === p) {
      this.currentUser = found; 
      console.log('LoginService found user');
      return true;
    }
    console.log('LoginService didnt find user')
    return false;
  }



  getCurrentUser(): User | null {
    return this.currentUser;
  }
}

