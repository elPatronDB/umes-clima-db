import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner, AlertController, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { OpenMeteoService } from 'src/app/core/services/open-meteo';
import { RegistroClimaService, RegistroClima } from 'src/app/core/services/registro-clima';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, CommonModule],
})
export class HomePage implements OnInit {
  isLoading = false;

  constructor(
    private climaService: OpenMeteoService,
    private registroService: RegistroClimaService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  get totalRegistros(): number {
    return this.registroService.getTotalRegistros();
  }

  irARegistros() {
    this.router.navigate(['/registros']);
  }

  async consultarClima() {
    this.isLoading = true;
    try {
      const permStatus = await Geolocation.requestPermissions();
      if (permStatus.location !== 'granted' && permStatus.coarseLocation !== 'granted') {
        throw new Error('Permiso de ubicación denegado');
      }
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      this.climaService.getClima(lat, lng).subscribe({
        next: async (data: any) => {
          this.isLoading = false;
          if (data && data.current) {
            await this.mostrarDialogo(lat, lng, data.current);
          } else {
            this.mostrarError('No se pudo obtener la información del clima.');
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.mostrarError('Error al consultar la API del clima.');
        }
      });
    } catch (e: any) {
      this.isLoading = false;
      this.mostrarError(e.message || 'Error al obtener la ubicación.');
    }
  }

  async mostrarDialogo(lat: number, lng: number, current: any) {
    const temp = current.temperature_2m;
    const sensacion = current.apparent_temperature;
    const humedad = current.relative_humidity_2m;
    const viento = current.wind_speed_10m;

    const alert = await this.alertController.create({
      header: 'Resultado del Clima',
      message: `
        Latitud: ${lat}<br>
        Longitud: ${lng}<br>
        Temperatura actual: ${temp} °C<br>
        Sensación térmica: ${sensacion} °C<br>
        Humedad: ${humedad}%<br>
        Velocidad del viento: ${viento} km/h
      `,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        },
        {
          text: 'Registrar',
          handler: () => {
            const nuevoRegistro: RegistroClima = {
              id: this.generarId(),
              fechaHora: new Date().toISOString(),
              latitud: lat,
              longitud: lng,
              temperatura: temp,
              sensacionTermica: sensacion,
              humedad: humedad,
              velocidadViento: viento
            };
            this.registroService.agregarRegistro(nuevoRegistro);
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  private generarId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
