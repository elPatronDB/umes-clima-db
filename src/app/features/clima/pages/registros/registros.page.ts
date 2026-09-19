import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, 
  IonIcon, IonImg, IonText, AlertController, ToastController 
} from '@ionic/angular/standalone';
import { RegistroClimaService, RegistroClima } from 'src/app/core/services/registro-clima';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { RouterLink } from '@angular/router';

@Component({       
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, IonButton, IonIcon, IonImg, IonText, RouterLink
  ]
})
export class RegistrosPage implements OnInit {
  registros: RegistroClima[] = [];

  constructor(
    private registroService: RegistroClimaService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.cargarRegistros();
  }

  ionViewWillEnter() {
    this.cargarRegistros();
  }

  cargarRegistros() {
    this.registros = this.registroService.getRegistros();
  }

  async tomarFotografia(registro: RegistroClima) {
    const alert = await this.alertController.create({
      header: 'Guardar Fotografía',
      message: '¿Deseas guardar esta fotografía en la galería de tu dispositivo?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.abrirCamara(registro, false);
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.abrirCamara(registro, true);
          }
        }
      ]
    });
    await alert.present();
  }

  async abrirCamara(registro: RegistroClima, guardarEnGaleria: boolean) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        saveToGallery: guardarEnGaleria
      });

      if (image.webPath) {
        this.registroService.actualizarFoto(registro.id, image.webPath);
        this.mostrarMensaje('Fotografía guardada exitosamente.');
      }
    } catch (e) {
      console.error('Error al tomar fotografía', e);
    }
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }
}
