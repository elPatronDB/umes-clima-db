import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonBackButton, IonItem, IonSelect,
  IonSelectOption, IonSpinner, IonText, IonButton
} from '@ionic/angular/standalone';
import { OpenMeteoService } from 'src/app/services/open-meteo';
import { RestCountriesService, PaisData } from 'src/app/services/rest-countries.service';
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
export class ClimaPage implements OnInit {
  continentes: { nombre: string, paises: PaisData[] }[] = [];
  paisSeleccionado: PaisData | null = null;
  cargando: boolean = false;
  cargandoPaises: boolean = true;
  errorMsg: string = '';
  datosDelClima: any;

  constructor(
    private climaService: OpenMeteoService,
    private restCountries: RestCountriesService
  ) { }

  ngOnInit() {
    this.cargandoPaises = true;
    this.restCountries.getPaises().subscribe({
      next: (paises) => {
        // Agrupar por región
        const grupos: { [key: string]: PaisData[] } = {};
        paises.forEach(p => {
          if (!grupos[p.region]) {
            grupos[p.region] = [];
          }
          grupos[p.region].push(p);
        });

        // Convertir a array de continentes y ordenar
        this.continentes = Object.keys(grupos).map(region => {
          return {
            nombre: region,
            // Ordenar países alfabéticamente
            paises: grupos[region].sort((a, b) => a.nombre.localeCompare(b.nombre))
          };
        }).sort((a, b) => a.nombre.localeCompare(b.nombre));

        this.cargandoPaises = false;
      },
      error: (err) => {
        this.errorMsg = 'Error al cargar la lista de países';
        this.cargandoPaises = false;
      }
    });
  }

  consultar(evento: any) {
    this.paisSeleccionado = evento.detail.value;
    this.cargando = true;
    this.errorMsg = '';
    this.datosDelClima = null;

    this.climaService.getClima(this.paisSeleccionado!.latitud, this.paisSeleccionado!.longitud).subscribe({
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
