import type {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";

export const DASHBOARD_ROUTES: Routes = [
  {path: '', component: DashboardComponent, children:[
      {path: '', pathMatch: 'full', redirectTo: 'main'},
      {path: 'main', loadComponent: ()=> import('./main/main.component').then((c)=>c.MainComponent)},
      {path: 'showcase/:product', loadComponent: ()=> import('./showcase/showcase.component').then((c)=>c.ShowcaseComponent)},
      {path: 'card/:cardId', loadComponent: ()=>import('./cards/cards.component').then(c=>c.CardsComponent)},
      {path: 'account/:cardId', loadComponent: ()=>import('./accounts/accounts.component').then(c=>c.AccountsComponent)},
    ]}
]
