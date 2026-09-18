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
    path: 'registros',
    loadComponent: () => import('./features/clima/pages/registros/registros.page').then( m => m.RegistrosPage)
  },
];
