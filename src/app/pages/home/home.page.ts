import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.services';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser: any;
  scanActive: boolean = false;
  weather: any;
  city: string = 'Santiago'; // Ciudad por defecto

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertController: AlertController,
    private weatherService: WeatherService
  ) {}

  async ngOnInit() {
    this.currentUser = await this.authService.getCurrentUser();
    const isAuthenticated = await this.authService.isAuthenticated();
    if (!isAuthenticated) {
      console.warn('No hay usuario autenticado');
      this.router.navigate(['/login']);
    } else {
      console.log('Usuario autenticado:', this.currentUser);
      // Llamada al servicio de clima después de autenticar al usuario
      this.getWeather();
    }
  }

  async getWeather() {
    try {
      this.weather = await this.weatherService.getWeather(this.city).toPromise(); // Si usas Observable
      console.log(this.weather); // Imprime los datos de la API en la consola
    } catch (error) {
      console.error('Error getting weather data:', error);
    }
  }
  

  async startScan() {
    console.log("Iniciando escaneo...");
    try {
      console.log("Verificando permisos...");
      const permission = await BarcodeScanner.checkPermission({ force: true });

      // Verificar si los permisos han sido otorgados
      if (!permission.granted) {
          console.log("Permisos de cámara denegados.");
          return; // Salir si no se otorgan permisos
      }
      
      console.log("Permisos verificados, iniciando el escáner...");

      this.scanActive = true;
      document.body.classList.add('scanner-active'); // Añade una clase para ocultar el fondo
      const result = await BarcodeScanner.startScan();
      console.log("Escáner iniciado");

      if (result.hasContent) {
          console.log('QR Content:', result.content);
          this.scanActive = false;
          document.body.classList.remove('scanner-active');
          await this.mostrarPopupAsistenciaRegistrada(result.content);
      } else {
          console.log("No se encontró contenido en el escáner");
      }
    } catch (error) {
      console.error('Error durante el escaneo:', error);
      this.scanActive = false;
      document.body.classList.remove('scanner-active');
    }
  }

  async mostrarPopupAsistenciaRegistrada(codigo: string) {
    const alert = await this.alertController.create({
      header: 'Asistencia Registrada',
      message: `La asistencia para el código QR ${codigo} ha sido registrada exitosamente.`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  stopScan() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
    document.body.classList.remove('scanner-active');
  }

  ingresarLogin() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
