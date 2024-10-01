import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.services';  // Asegúrate de que la ruta sea correcta
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './registro.page.html',  // Nombre correcto de tu template HTML
  styleUrls: ['./registro.page.scss'],
})
export class RegisterPage {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertController: AlertController
  ) {}

  async registerUser() {
    if (this.username && this.password) {
      console.log('Botón de registro presionado'); 
      const isRegistered = await this.authService.registerUser(this.username, this.password);
      if (isRegistered) {
        console.log('Usuario registrado con éxito');
        this.router.navigate(['/login']);  // Redirige al login después del registro
      } else {
        this.presentAlert('El nombre de usuario ya existe. Intenta con otro.');
      }
    } else {
      this.presentAlert('Por favor, ingresa un nombre de usuario y una contraseña.');
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  register() {
    this.router.navigate(['/registro']);
  }

  ingresarLogin() {
    this.router.navigate(['/login']);
  }
  
}
