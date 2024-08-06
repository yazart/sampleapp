import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  TuiAlertService,
  TuiButtonModule,
  TuiErrorModule,
  TuiLinkModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
} from '@taiga-ui/kit';
import { map, startWith, switchMap } from 'rxjs';

import { LogoComponent } from '../../logo.component';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    AsyncPipe,
    TuiIslandModule,
    TuiLinkModule,
    RouterLink,
    TuiSvgModule,
    TuiInputPasswordModule,
    JsonPipe,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    LogoComponent,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly alerts = inject(TuiAlertService);
  private readonly router = inject(Router);
  protected readonly loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  protected readonly loginFormValid$ = this.loginForm.statusChanges.pipe(
    startWith(this.loginForm.status),
    map((e) => e === 'VALID'),
  );

  protected readonly loginData$ = this.auth.pTokenModel$;

  protected login(): void {
    this.loginForm.updateValueAndValidity({ emitEvent: true });

    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.getRawValue();

      if (login && password) {
        this.auth
          .login(login, password)
          .pipe(
            switchMap((e) => {
              if (!e) {
                return this.alerts
                  .open(
                    'Логин или пароль введены неверно, либо пользователя не существует',
                    { status: 'error' },
                  )
                  .pipe(map(() => e));
              }

              return this.alerts
                .open('Вы успешно авторизовались', { status: 'success' })
                .pipe(map(() => e));
            }),
          )

          .subscribe((e) => {
            if (e) {
              this.router.navigate(['/', 'dashboard']).then();
            }
          });
      } else {
        this.alerts
          .open('Введены не все параметры для авторизации', { status: 'error' })
          .subscribe();
      }
    }
  }
}
