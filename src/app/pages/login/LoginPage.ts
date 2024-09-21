import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  password: string = '';
  username: string = '';
  message: string;

constructor(
  private router: Router,
  private loginService: LoginService,
  private alertController: AlertController
) {
  this.password = '';
  this.message = '';
}

ngOnInit() {}

async validateLogin() {
  if (this.username.length >= 3 && this.username.length <= 8) {
    if (this.password && this.password.length === 5) {
      const isValid = this.loginService.validateLogin(this.username, this.password.toString());
      if (isValid) {
        console.log("Login exitoso");
        this.username = '';
        this.password = '';
        this.router.navigate(['/transition']);
      } else {
        console.log("No se pudo realizar el login");
        this.username = '';
        this.password = '';
        this.presentAlert('Credenciales incorrectas');
      }
    } else {
      this.presentAlert("La contraseña debe contener 5 dígitos");
      this.username = '';
        this.password = '';
    }
  } else {
    this.presentAlert("El nombre de usuario debe tener entre 3 y 8 caracteres");
    this.username = '';
    this.password = '';
  }
}

async resetPassword() {
  this.router.navigate(['/password'])
}


async presentAlert(message: string) {
  const alert = await this.alertController.create({
    header: 'Error',
    message: message,
    buttons: ['OK']
  });

  await alert.present();
}
}
