import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  username!: string;
  newPassword!: string;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}
  //recuperar contraseña
  async changePassword() {
    const success = await this.loginService.changePassword(this.username, this.newPassword);
    
    const alert = await this.alertController.create({
      header: success ? 'Éxito' : 'Error',
      message: success ? 'Contraseña cambiada con éxito.' : 'Usuario no encontrado.',
      buttons: ['OK']
    });
    await alert.present();
  }

  ingresarLogin() {
    this.router.navigate(['/login']);
  }
}
