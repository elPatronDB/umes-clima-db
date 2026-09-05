import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detail-clima',
  templateUrl: './detail-clima.component.html',
  styleUrls: ['./detail-clima.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent]
})
export class DetailClimaComponent implements OnInit {

  @Input() climaData: any;
  @Input() pais: string = '';
  @Input() capital: string = '';
  @Input() banderaUrl: string = '';

  constructor() { }

  ngOnInit() { }

  getWeatherDescription(code: number): string {
    const weatherCodes: { [key: number]: string } = {
      0: 'Cielo despejado ☀️',
      1: 'Mayormente despejado 🌤️',
      2: 'Parcialmente nublado ⛅',
      3: 'Nublado ☁️',
      45: 'Niebla 🌫️',
      48: 'Niebla con escarcha 🌫️',
      51: 'Llovizna leve 🌦️',
      53: 'Llovizna moderada 🌧️',
      55: 'Llovizna densa 🌧️',
      56: 'Llovizna helada leve ❄️',
      57: 'Llovizna helada densa ❄️',
      61: 'Lluvia leve 🌧️',
      63: 'Lluvia moderada 🌧️',
      65: 'Lluvia fuerte 🌧️',
      66: 'Lluvia helada leve ❄️',
      67: 'Lluvia helada fuerte ❄️',
      71: 'Nevada leve 🌨️',
      73: 'Nevada moderada 🌨️',
      75: 'Nevada fuerte 🌨️',
      77: 'Granizo 🌨️',
      80: 'Chubascos leves 🌦️',
      81: 'Chubascos moderados 🌧️',
      82: 'Chubascos fuertes ⛈️',
      85: 'Chubascos de nieve leves 🌨️',
      86: 'Chubascos de nieve fuertes 🌨️',
      95: 'Tormenta eléctrica ⛈️',
      96: 'Tormenta con granizo leve ⛈️',
      99: 'Tormenta con granizo fuerte ⛈️',
    };
    return weatherCodes[code] || 'Desconocido ❓';
  }

}
