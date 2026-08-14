import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface PaisData {
  nombre: string;
  capital: string;
  latitud: number;
  longitud: number;
  region: string;
  banderaEmoji: string;
  banderaUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestCountriesService {

  private paises: PaisData[] = [
    // América Central
    { nombre: 'El Salvador',       capital: 'San Salvador',          latitud: 13.79,  longitud: -88.93,  region: 'América Central', banderaEmoji: '🇸🇻', banderaUrl: 'https://flagcdn.com/sv.svg' },
    { nombre: 'Guatemala',         capital: 'Ciudad de Guatemala',   latitud: 14.64,  longitud: -90.51,  region: 'América Central', banderaEmoji: '🇬🇹', banderaUrl: 'https://flagcdn.com/gt.svg' },
    { nombre: 'Honduras',          capital: 'Tegucigalpa',           latitud: 14.08,  longitud: -87.21,  region: 'América Central', banderaEmoji: '🇭🇳', banderaUrl: 'https://flagcdn.com/hn.svg' },
    { nombre: 'Nicaragua',         capital: 'Managua',               latitud: 12.13,  longitud: -86.25,  region: 'América Central', banderaEmoji: '🇳🇮', banderaUrl: 'https://flagcdn.com/ni.svg' },
    { nombre: 'Costa Rica',        capital: 'San José',              latitud: 9.93,   longitud: -84.08,  region: 'América Central', banderaEmoji: '🇨🇷', banderaUrl: 'https://flagcdn.com/cr.svg' },
    { nombre: 'Panamá',            capital: 'Ciudad de Panamá',      latitud: 8.98,   longitud: -79.52,  region: 'América Central', banderaEmoji: '🇵🇦', banderaUrl: 'https://flagcdn.com/pa.svg' },
    { nombre: 'Belice',            capital: 'Belmopán',              latitud: 17.25,  longitud: -88.77,  region: 'América Central', banderaEmoji: '🇧🇿', banderaUrl: 'https://flagcdn.com/bz.svg' },
    // América del Norte
    { nombre: 'México',            capital: 'Ciudad de México',      latitud: 19.43,  longitud: -99.13,  region: 'América del Norte', banderaEmoji: '🇲🇽', banderaUrl: 'https://flagcdn.com/mx.svg' },
    { nombre: 'Estados Unidos',    capital: 'Washington D.C.',       latitud: 38.90,  longitud: -77.03,  region: 'América del Norte', banderaEmoji: '🇺🇸', banderaUrl: 'https://flagcdn.com/us.svg' },
    { nombre: 'Canadá',            capital: 'Ottawa',                latitud: 45.42,  longitud: -75.69,  region: 'América del Norte', banderaEmoji: '🇨🇦', banderaUrl: 'https://flagcdn.com/ca.svg' },
    // América del Sur
    { nombre: 'Colombia',          capital: 'Bogotá',                latitud: 4.61,   longitud: -74.08,  region: 'América del Sur',  banderaEmoji: '🇨🇴', banderaUrl: 'https://flagcdn.com/co.svg' },
    { nombre: 'Venezuela',         capital: 'Caracas',               latitud: 10.48,  longitud: -66.88,  region: 'América del Sur',  banderaEmoji: '🇻🇪', banderaUrl: 'https://flagcdn.com/ve.svg' },
    { nombre: 'Ecuador',           capital: 'Quito',                 latitud: -0.22,  longitud: -78.51,  region: 'América del Sur',  banderaEmoji: '🇪🇨', banderaUrl: 'https://flagcdn.com/ec.svg' },
    { nombre: 'Perú',              capital: 'Lima',                  latitud: -12.04, longitud: -77.02,  region: 'América del Sur',  banderaEmoji: '🇵🇪', banderaUrl: 'https://flagcdn.com/pe.svg' },
    { nombre: 'Brasil',            capital: 'Brasilia',              latitud: -15.82, longitud: -47.92,  region: 'América del Sur',  banderaEmoji: '🇧🇷', banderaUrl: 'https://flagcdn.com/br.svg' },
    { nombre: 'Bolivia',           capital: 'Sucre',                 latitud: -19.02, longitud: -65.26,  region: 'América del Sur',  banderaEmoji: '🇧🇴', banderaUrl: 'https://flagcdn.com/bo.svg' },
    { nombre: 'Chile',             capital: 'Santiago',              latitud: -33.44, longitud: -70.66,  region: 'América del Sur',  banderaEmoji: '🇨🇱', banderaUrl: 'https://flagcdn.com/cl.svg' },
    { nombre: 'Argentina',         capital: 'Buenos Aires',          latitud: -34.61, longitud: -58.38,  region: 'América del Sur',  banderaEmoji: '🇦🇷', banderaUrl: 'https://flagcdn.com/ar.svg' },
    { nombre: 'Uruguay',           capital: 'Montevideo',            latitud: -34.90, longitud: -56.19,  region: 'América del Sur',  banderaEmoji: '🇺🇾', banderaUrl: 'https://flagcdn.com/uy.svg' },
    // Europa
    { nombre: 'España',            capital: 'Madrid',                latitud: 40.41,  longitud: -3.70,   region: 'Europa',           banderaEmoji: '🇪🇸', banderaUrl: 'https://flagcdn.com/es.svg' },
    { nombre: 'Portugal',          capital: 'Lisboa',                latitud: 38.71,  longitud: -9.14,   region: 'Europa',           banderaEmoji: '🇵🇹', banderaUrl: 'https://flagcdn.com/pt.svg' },
    { nombre: 'Francia',           capital: 'París',                 latitud: 48.85,  longitud: 2.35,    region: 'Europa',           banderaEmoji: '🇫🇷', banderaUrl: 'https://flagcdn.com/fr.svg' },
    { nombre: 'Alemania',          capital: 'Berlín',                latitud: 52.52,  longitud: 13.40,   region: 'Europa',           banderaEmoji: '🇩🇪', banderaUrl: 'https://flagcdn.com/de.svg' },
    { nombre: 'Reino Unido',       capital: 'Londres',               latitud: 51.50,  longitud: -0.12,   region: 'Europa',           banderaEmoji: '🇬🇧', banderaUrl: 'https://flagcdn.com/gb.svg' },
    { nombre: 'Italia',            capital: 'Roma',                  latitud: 41.90,  longitud: 12.49,   region: 'Europa',           banderaEmoji: '🇮🇹', banderaUrl: 'https://flagcdn.com/it.svg' },
    { nombre: 'Países Bajos',      capital: 'Ámsterdam',             latitud: 52.37,  longitud: 4.90,    region: 'Europa',           banderaEmoji: '🇳🇱', banderaUrl: 'https://flagcdn.com/nl.svg' },
    { nombre: 'Suecia',            capital: 'Estocolmo',             latitud: 59.33,  longitud: 18.06,   region: 'Europa',           banderaEmoji: '🇸🇪', banderaUrl: 'https://flagcdn.com/se.svg' },
    { nombre: 'Noruega',           capital: 'Oslo',                  latitud: 59.91,  longitud: 10.75,   region: 'Europa',           banderaEmoji: '🇳🇴', banderaUrl: 'https://flagcdn.com/no.svg' },
    { nombre: 'Suiza',             capital: 'Berna',                 latitud: 46.94,  longitud: 7.44,    region: 'Europa',           banderaEmoji: '🇨🇭', banderaUrl: 'https://flagcdn.com/ch.svg' },
    // Asia
    { nombre: 'Japón',             capital: 'Tokio',                 latitud: 35.67,  longitud: 139.65,  region: 'Asia',             banderaEmoji: '🇯🇵', banderaUrl: 'https://flagcdn.com/jp.svg' },
    { nombre: 'China',             capital: 'Pekín',                 latitud: 39.90,  longitud: 116.40,  region: 'Asia',             banderaEmoji: '🇨🇳', banderaUrl: 'https://flagcdn.com/cn.svg' },
    { nombre: 'Corea del Sur',     capital: 'Seúl',                  latitud: 37.56,  longitud: 126.97,  region: 'Asia',             banderaEmoji: '🇰🇷', banderaUrl: 'https://flagcdn.com/kr.svg' },
    { nombre: 'India',             capital: 'Nueva Delhi',           latitud: 28.61,  longitud: 77.20,   region: 'Asia',             banderaEmoji: '🇮🇳', banderaUrl: 'https://flagcdn.com/in.svg' },
    { nombre: 'Tailandia',         capital: 'Bangkok',               latitud: 13.75,  longitud: 100.52,  region: 'Asia',             banderaEmoji: '🇹🇭', banderaUrl: 'https://flagcdn.com/th.svg' },
    { nombre: 'Indonesia',         capital: 'Yakarta',               latitud: -6.21,  longitud: 106.84,  region: 'Asia',             banderaEmoji: '🇮🇩', banderaUrl: 'https://flagcdn.com/id.svg' },
    { nombre: 'Arabia Saudita',    capital: 'Riad',                  latitud: 24.68,  longitud: 46.72,   region: 'Asia',             banderaEmoji: '🇸🇦', banderaUrl: 'https://flagcdn.com/sa.svg' },
    // África
    { nombre: 'Egipto',            capital: 'El Cairo',              latitud: 30.06,  longitud: 31.24,   region: 'África',           banderaEmoji: '🇪🇬', banderaUrl: 'https://flagcdn.com/eg.svg' },
    { nombre: 'Nigeria',           capital: 'Abuya',                 latitud: 9.07,   longitud: 7.40,    region: 'África',           banderaEmoji: '🇳🇬', banderaUrl: 'https://flagcdn.com/ng.svg' },
    { nombre: 'Sudáfrica',         capital: 'Pretoria',              latitud: -25.74, longitud: 28.19,   region: 'África',           banderaEmoji: '🇿🇦', banderaUrl: 'https://flagcdn.com/za.svg' },
    { nombre: 'Marruecos',         capital: 'Rabat',                 latitud: 33.99,  longitud: -6.85,   region: 'África',           banderaEmoji: '🇲🇦', banderaUrl: 'https://flagcdn.com/ma.svg' },
    // Oceanía
    { nombre: 'Australia',         capital: 'Canberra',              latitud: -35.28, longitud: 149.13,  region: 'Oceanía',          banderaEmoji: '🇦🇺', banderaUrl: 'https://flagcdn.com/au.svg' },
    { nombre: 'Nueva Zelanda',     capital: 'Wellington',            latitud: -41.28, longitud: 174.77,  region: 'Oceanía',          banderaEmoji: '🇳🇿', banderaUrl: 'https://flagcdn.com/nz.svg' },
  ];

  getPaises(): Observable<PaisData[]> {
    return of(this.paises);
  }
}



