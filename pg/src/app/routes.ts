import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home-grounds/home/home.page').then((m) => m.HomePage),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((c) => c.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then((c) => c.RegisterPage),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.page').then((c) => c.SettingsPage),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile/profile.component').then(
        (m) => m.ProfileComponent,
      ),
  },

  {
    path: 'ground/:id',
    loadComponent: () =>
      import('./pages/ground/ground/ground.component').then(
        (c) => c.GroundComponent,
      ),
  },

  {
    path: 'event/:id',
    loadComponent: () =>
      import('./pages/event/event/event.component').then(
        (c) => c.EventComponent,
      ),
  },
  {
    path: 'user/:id',
    loadComponent: () =>
      import('./pages/view-user/view-user/view-user.component').then(
        (c) => c.ViewUserComponent,
      ),
  },

  {
    path: 'events',
    loadComponent: () =>
      import('./pages/events/events/events.component').then(
        (m) => m.EventsComponent,
      ),
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./pages/my-events/my-events/my-events.component').then(
        (m) => m.MyEventsComponent,
      ),
  },
  {
    path: 'fav-grounds',
    loadComponent: () =>
      import('./pages/my-grounds/my-grounds/my-grounds.component').then(
        (m) => m.MyGroundsComponent,
      ),
  },

  // { path: 'profile', loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage),
  //    canActivate: [AuthGuard] },

  {
    path: 'error',
    loadComponent: () =>
      import('./pages/error/error/error.component').then(
        (m) => m.ErrorComponent,
      ),
  },
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];
