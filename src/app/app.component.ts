import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiHostedDropdownModule,
  TuiRootModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import {
  TuiAppBarModule,
  TuiBadgeNotificationModule,
  TuiHeaderModule,
  TuiIconModule,
  TuiSensitiveModule,
  TuiTitleModule,
} from '@taiga-ui/experimental';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {filter, map, switchMap, tap} from 'rxjs';

import { AuthService } from './auth/auth.service';
import { LogoComponent } from './logo.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    TuiAppBarModule,
    RouterOutlet,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
    TuiHeaderModule,
    TuiSensitiveModule,
    TuiTitleModule,
    TuiBadgeNotificationModule,
    TuiTooltipModule,
    LogoComponent,
    TuiAvatarModule,
    AsyncPipe,
    RouterLink,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiIconModule,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected open = false;
  protected items = [
    {
      name: 'Профиль',
      route: ['/profile'],
      icon: 'tuiIconUser',
    },
  ];

  protected readonly userName$ = this.auth.isAuthorized$.pipe(
    filter(x=>!!x),
    tap((x)=> console.log(x)),
    switchMap(()=>this.auth.decodedToken$),
    map((model) => {
      if (!model.lastName && !model.firstName) {
        return null;
      }

      return `${model.lastName} ${model.firstName}`;
    }),
  );

  protected logout(): void {
    this.auth.logout();
    this.router.navigate(['/']).then();
  }
}
