import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenMeteoService {
  constructor(private http: HttpClient) { }

  getClima(lat: number, lng: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;
    return this.http.get(url);
  }

  buscarUbicacion(nombre: string) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nombre)}&count=10&language=es&format=json`;
    return this.http.get(url);
  }
}