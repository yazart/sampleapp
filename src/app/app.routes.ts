import type { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    loadComponent: async () =>
      import('./welcome/welcome.component').then((c) => c.WelcomeComponent),
  },
  {
    path: 'auth',
    loadChildren: async () =>
      import('./auth/auth.routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    loadComponent: async () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.DashboardComponent,
      ),
  },
  {
    path: 'profile',
    loadComponent: async () =>
      import('./profile/profile.component').then((c) => c.ProfileComponent),
  },
  {
    path: 'history',
    loadComponent: async () =>
      import('./history/history.component').then((c) => c.HistoryComponent),
  },
];
