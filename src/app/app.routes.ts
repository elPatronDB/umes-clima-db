import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'clima',
    loadComponent: () => import('./pages/clima/clima.page').then( m => m.ClimaPage)
  },
  {
    path: 'cima-fotografia-page',
    loadComponent: () => import('./pages/ClimaFotografiaPage/cima-fotografia-page/cima-fotografia-page.page').then( m => m.CimaFotografiaPagePage)
  },
];
