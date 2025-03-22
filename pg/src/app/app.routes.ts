import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./components/pages/home/home.page').then(m => m.HomePage)},
  { path: 'profile', loadComponent: () => import('./components/pages/profile/profile.page').then(m => m.ProfilePage)},
  { path: 'settings', loadComponent: () => import('./components/pages/settings/settings.page').then(m => m.SettingsPage)},  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
