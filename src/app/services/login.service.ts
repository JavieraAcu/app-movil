import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[] = [
    new User('admin', 'admin@ionic.com', '12345'),
  ];

  constructor() { }

  validateLogin(u: string, p: string): boolean {
    const found = this.users.find(user => user.username === u)
    if (found !== undefined) {
      console.log('LoginService found user')
      return found.password === p;
    }
    console.log('LoginService didnt find user')
    return false;
  }
}
