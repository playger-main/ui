import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./components/pages/login/login.page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./components/pages/register/register.page').then(m => m.RegisterPage) },
  { path: 'home', loadComponent: () => import('./components/pages/home/home.page').then(m => m.HomePage)},
  { path: 'profile', loadComponent: () => import('./components/pages/profile/profile.page').then(m => m.ProfilePage), canActivate: [AuthGuard]},
  { path: 'settings', loadComponent: () => import('./components/pages/settings/settings.page').then(m => m.SettingsPage)},    
];
