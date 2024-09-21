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
  password: string;
  username!: string;
  message: string;
  isLoggedIn: boolean = false;

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
      if (this.password.toString().length === 5) {
        const isValid = this.loginService.validateLogin(this.username, this.password.toString());

        if (isValid) {
          console.log("Login exitoso");
          this.isLoggedIn = true;

          setTimeout(() => {this.router.navigate(['/home']);
          }, 3000);
        } else {
          console.log("No se pudo realizar el login");
          this.presentAlert('Credenciales incorrectas');
        }
      } else {
        this.presentAlert("La contraseña debe tener 4 dígitos");
      }
    } else {
      this.presentAlert("El nombre de usuario debe tener entre 3 y 8 caracteres");
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
