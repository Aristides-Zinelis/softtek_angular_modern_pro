import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'stocks',
    loadComponent: () =>
      import('./stocks-page.component').then((m) => m.StocksPageComponent),
  },
];
