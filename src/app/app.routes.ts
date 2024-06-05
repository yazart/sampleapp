import type { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'auth', loadComponent: ()=> import('./auth/auth.component').then((c)=> c.AuthComponent)},
  {path: 'dashboard', loadComponent: ()=> import('./dashboard/dashboard.component').then((c)=> c.DashboardComponent)},
  {path: 'profile', loadComponent: ()=> import('./profile/profile.component').then((c)=> c.ProfileComponent)},
  {path: 'history', loadComponent: ()=> import('./history/history.component').then((c)=> c.HistoryComponent)}
];
