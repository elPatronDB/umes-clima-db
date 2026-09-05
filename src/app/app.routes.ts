import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/clima/pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'clima',
    loadComponent: () => import('./features/clima/pages/clima-page/clima.page').then( m => m.ClimaPage)
  },
  {
    path: 'cima-fotografia-page',
    loadComponent: () => import('./features/clima/pages/clima-fotografia-page/cima-fotografia-page.page').then( m => m.CimaFotografiaPagePage)
  },
];
