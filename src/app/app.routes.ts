import type { Routes } from '@angular/router';
import {authGuard} from "./auth/auth.guard.fn";
import {noAuthGuard} from "./auth/no-auth.guard.fn";

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    loadComponent: async () =>
      import('./welcome/welcome.component').then((c) => c.WelcomeComponent),
  },
  {
    path: 'auth',
    canActivate: [noAuthGuard],
    loadChildren: async () =>
      import('./auth/auth.routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
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
