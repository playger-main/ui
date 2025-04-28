import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(c => c.LoginPage) },
  { path: 'register', loadComponent: () => import('./pages/register/register.page').then(c => c.RegisterPage) },
  { path: 'settings', loadComponent: () => import('./pages/settings/settings.page').then(c => c.SettingsPage) },
  { path: 'ground/:id', loadComponent: () => import('./pages/grounds/ground/ground.component').then(c => c.GroundComponent) },
  { path: 'event/:id', loadComponent: () => import('./pages/event/event/event.component').then(c => c.EventComponent) },
  { path: 'home', loadComponent: () => import('./pages/home/home/home.page').then(m => m.HomePage) },
  { path: 'events', loadComponent: () => import('./pages/events/events/events.component').then(m => m.EventsComponent) },
  { path: 'profile', loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage), canActivate: [AuthGuard] },
  
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
