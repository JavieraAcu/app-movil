import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.services';  // Ahora usamos AuthService
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
    private authService: AuthService,  // Inyectamos el AuthService
    private alertController: AlertController
  ) {
    this.password = '';
    this.message = '';
  }

  ngOnInit() {}

  // Modificamos el método de validación para llamar al AuthService
  async validateLogin() {
    if (this.username.length >= 3 && this.username.length <= 8) {
      if (this.password && this.password.length === 5) {
        // Llamamos al método login del AuthService y esperamos la respuesta
        const isValid = await this.authService.login(this.username, this.password);
        if (isValid) {
          console.log("Login exitoso");
          this.username = '';
          this.password = '';
          this.router.navigate(['/transition']);  // Navega a la siguiente página
        } else {
          console.log("No se pudo realizar el login");
          this.presentAlert('Credenciales incorrectas');
        }
      } else {
        this.presentAlert("La contraseña debe contener 5 dígitos");
      }
    } else {
      this.presentAlert("El nombre de usuario debe tener entre 3 y 8 caracteres");
    }

    // Limpiamos los campos en ambos casos
    this.username = '';
    this.password = '';
  }

  async resetPassword() {
    this.router.navigate(['/password']);
  }

  async register() {
    this.router.navigate(['/registro']);
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
