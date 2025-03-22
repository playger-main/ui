import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/navigation/tabs/tabs.routes').then((m) => m.routes),
  },
];
