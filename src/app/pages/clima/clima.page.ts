import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonBackButton, IonItem, IonSelect,
  IonSelectOption, IonSpinner, IonText, IonButton
} from '@ionic/angular/standalone';
import { OpenMeteoService } from 'src/app/services/open-meteo';
import { DetailClimaComponent } from 'src/app/components/detail-clima/detail-clima.component';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonBackButton, IonItem, IonSelect,
    IonSelectOption, IonSpinner, IonText, IonButton,
    CommonModule, FormsModule, RouterLink, DetailClimaComponent
  ]
})
export class ClimaPage {
  paises = [
    { nombre: "El Salvador", latitud: 13.79, longitud: -88.93, capital: "San Salvador" },
    { nombre: "Guatemala", latitud: 14.64, longitud: -90.51, capital: "Ciudad de Guatemala" },
    { nombre: "Honduras", latitud: 14.08, longitud: -87.21, capital: "Tegucigalpa" },
    { nombre: "Nicaragua", latitud: 12.13, longitud: -86.25, capital: "Managua" },
    { nombre: "Costa Rica", latitud: 9.93, longitud: -84.08, capital: "San José" },
    { nombre: "Panamá", latitud: 8.98, longitud: -79.52, capital: "Ciudad de Panamá" },
    { nombre: "México", latitud: 19.43, longitud: -99.13, capital: "Ciudad de México" },
    { nombre: "Colombia", latitud: 4.61, longitud: -74.08, capital: "Bogotá" },
    { nombre: "Argentina", latitud: -34.61, longitud: -58.38, capital: "Buenos Aires" },
  ];
  paisSeleccionado: any;
  cargando: boolean = false;
  errorMsg: string = '';
  datosDelClima: any;

  constructor(private climaService: OpenMeteoService) { }

  consultar(evento: any) {
    this.paisSeleccionado = evento.detail.value;
    this.cargando = true;
    this.errorMsg = '';
    this.datosDelClima = null;

    this.climaService.getClima(this.paisSeleccionado.latitud, this.paisSeleccionado.longitud).subscribe({
      next: (datos) => {
        this.datosDelClima = datos;
        this.cargando = false;
      },
      error: (err) => {
        this.errorMsg = err.message || 'Error al obtener el clima';
        this.cargando = false;
      }
    });
  }

}
