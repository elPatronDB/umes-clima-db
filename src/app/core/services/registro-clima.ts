import { Injectable } from '@angular/core';

export interface RegistroClima {
  id: string;
  fechaHora: string;
  latitud: number;
  longitud: number;
  temperatura: number;
  sensacionTermica: number;
  humedad: number;
  velocidadViento: number;
  foto?: string; // URI
}

@Injectable({
  providedIn: 'root'
})
export class RegistroClimaService {
  private registros: RegistroClima[] = [];

  constructor() { }

  getRegistros(): RegistroClima[] {
    return this.registros;
  }

  agregarRegistro(registro: RegistroClima) {
    this.registros.push(registro);
  }

  actualizarFoto(id: string, fotoUri: string) {
    const registro = this.registros.find(r => r.id === id);
    if (registro) {
      registro.foto = fotoUri;
    }
  }

  getTotalRegistros(): number {
    return this.registros.length;
  }
}
