import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {
  TUI_SANITIZER,
  TuiAlertModule, TuiButtonModule, TuiDataListModule,
  TuiDialogModule, TuiHostedDropdownModule,
  TuiRootModule, TuiTooltipModule,
} from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiAppBarModule,
  TuiBadgeNotificationModule,
  TuiHeaderModule, TuiIconModule,
  TuiSensitiveModule,
  TuiTitleModule
} from "@taiga-ui/experimental";
import {LogoComponent} from "./logo.component";
import {TuiAvatarModule} from "@taiga-ui/kit";
import {AuthService} from "./auth/auth.service";
import { map } from 'rxjs/operators';
import {jwtDecode} from "jwt-decode";
import {JWTModel} from "./types/jwt.model";
import {AsyncPipe} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [TuiAppBarModule, RouterOutlet, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiButtonModule, TuiHeaderModule, TuiSensitiveModule, TuiTitleModule, TuiBadgeNotificationModule, TuiTooltipModule, LogoComponent, TuiAvatarModule, AsyncPipe, RouterLink, TuiHostedDropdownModule, TuiDataListModule, TuiIconModule, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {
  open= false;
  items= [{
    name: 'Профиль',
    route: ['/profile'],
    icon: 'tuiIconUser',
  }]
  protected readonly userName$ = this.auth.decodedToken$.pipe(map((model)=> {
   if(!model.lastName && !model.firstName){
     return null;
   }

    return `${model.lastName} ${model.firstName}`
  }))
  constructor(private readonly auth: AuthService) {
  }

  logout(): void {
    this.auth.logout();
  }
}
