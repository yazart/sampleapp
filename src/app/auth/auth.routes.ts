import type { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () =>
      import('./auth.component').then((c) => c.AuthComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        loadComponent: async () =>
          import('./login/login.component').then((c) => c.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: async () =>
          import('./register/register.component').then(
            (c) => c.RegisterComponent,
          ),
      },
      {
        path: 'recovery',
        loadComponent: async () =>
          import('./recovery/recovery.component').then(
            (c) => c.RecoveryComponent,
          ),
      },
    ],
  },
];
