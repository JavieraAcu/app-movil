import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  ngOnInit() {
  }

  password: number;
  username!: string;
  massage1: string;
  massage2: string;
  // message!: string;
  // message: string = '';
  constructor(
    private router: Router
  ) {
    // this.username = '';
    this.password = 1111;
    this.massage1 = '';
    this.massage2 = '';
  }

  validateLogin() {
    const usernameV: string = 'adm';
    const passwordV: number = 12345;

    if (usernameV.length >= 3 && usernameV.length <= 8) {
      console.log("el rango de palabras es correcto");
      this.massage1 = 'El rango de palabras debe ser 3 a 8 caracteres';
      if (passwordV.toString().length == 4) {
        console.log("Contiene los 4 digitos");
        if (usernameV === this.username && passwordV === this.password) {
          console.log("Login exitoso");
          // this.router.navigate(['/home']);
        } else {
          console.log("No se pudo realizar el login");
        }
      } else {
        console.log("no cumple con la cantidad de digitos");
      }
    } else {
      console.log("el rango de palabras es incorrecto");
    }

    console.log("ejecutando validacion");
    this.router.navigate(['/home']);
  }

}
