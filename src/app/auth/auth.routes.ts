import {Routes} from "@angular/router";

export const AUTH_ROUTES: Routes = [
  {path: '', loadComponent: ()=> import('./auth.component').then((c)=>c.AuthComponent), children:[

      {path: 'login', loadComponent: ()=>import('./login/login.component').then((c)=>c.LoginComponent)},
      {path: 'register', loadComponent: ()=>import('./register/register.component').then((c)=>c.RegisterComponent)},
      {path: 'recovery', loadComponent: ()=>import('./recovery/recovery.component').then((c)=>c.RecoveryComponent)},
    ]},
]
