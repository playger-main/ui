import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { FooterMenuComponent } from './components/footer-menu/footer-menu.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('.//pages/login/login.page').then(c => c.LoginPage) },
  { path: 'register', loadComponent: () => import('./pages/register/register.page').then(c => c.RegisterPage) },
  { path: 'home', loadComponent: () => import('./pages/home/home.page').then(c => c.HomePage)},
  { path: 'profile', loadComponent: () => import('./pages/profile/profile.page').then(c => c.ProfilePage), canActivate: [AuthGuard]},
  { path: 'settings', loadComponent: () => import('./pages/settings/settings.page').then(c => c.SettingsPage)},    
  { path: 'events', loadComponent: () => import('./pages/events/events/events.component').then(c => c.EventsComponent)},  
  {
    path: '',
    component: FooterMenuComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'events',
        loadComponent: () => import('./pages/events/events/events.component').then((m) => m.EventsComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
