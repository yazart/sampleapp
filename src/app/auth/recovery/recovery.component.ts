import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthorizationApiService, ClientsApiService } from '@api';
import { MaskitoModule } from '@maskito/angular';
import { maskitoWithPlaceholder } from '@maskito/kit';
import { CRYPTO } from '@ng-web-apis/common';
import {
  TuiAlertService,
  TuiButtonModule,
  TuiErrorModule,
  TuiLinkModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiProgressSegmentedModule } from '@taiga-ui/experimental';
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputPasswordModule,
  TuiInputPhoneModule,
  TuiInputYearModule,
  TuiIslandModule,
  TuiProgressModule,
} from '@taiga-ui/kit';
import {BehaviorSubject, catchError, EMPTY, map, of, startWith, switchMap, tap} from 'rxjs';

import { LogoComponent } from '../../logo.component';
import { AuthService } from '../auth.service';
import { samePasswordValidator } from '../register/register.component';
import {routes} from "../../app.routes";

@Component({
  standalone: true,
  selector: 'app-recovery',
  imports: [
    AsyncPipe,
    FormsModule,
    LogoComponent,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiInputYearModule,
    TuiIslandModule,
    TuiTextfieldControllerModule,
    RouterLink,
    TuiInputPhoneModule,
    TuiProgressModule,
    TuiInputPasswordModule,
    TuiProgressSegmentedModule,
    TuiInputNumberModule,
    MaskitoModule,
    TuiLinkModule,
  ],
  templateUrl: './recovery.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoveryComponent {
  private readonly alerts = inject(TuiAlertService);
  private readonly router  = inject(Router);
  private readonly crypto = inject(CRYPTO);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly clientApi = inject(ClientsApiService);
  private readonly auth = inject(AuthService);
  private readonly authApi = inject(AuthorizationApiService);

  protected currenStep$ = new BehaviorSubject(1);
  protected codeValue: string | undefined;
  protected readonly nextMessage$ = this.currenStep$.pipe(
    map((stepNumber) => {
      switch (stepNumber) {
        case 1:
          return 'Получить код';
        case 2:
          return 'Отправить код';
        case 3:
          return 'Обновить пароль';
        default:
          return 'Далее';
      }
    }),
  );

  protected disabledNext$ = this.currenStep$.pipe(
    switchMap((step) => {
      switch (step) {
        case 1:
          return this.login.statusChanges.pipe(
            startWith(this.login.status),
            map((status) => status !== 'VALID'),
          );
        case 2:
          return this.code.statusChanges.pipe(
            startWith(this.code.status),
            map((status) => status !== 'VALID'),
          );
        case 3:
          return this.passwordsForm.statusChanges.pipe(
            startWith(this.passwordsForm.status),
            map((status) => status !== 'VALID'),
          );
        default:
          return of(true);
      }
    }),
  );

  protected readonly login = new FormControl<string>('', Validators.required);
  protected readonly code = new FormControl<string>('', [
    Validators.required,
    Validators.pattern(/^\d{0,4}$/gi),
  ]);

  protected readonly codeMask = {
    ...maskitoWithPlaceholder('****', true),
    mask: /^\d{0,4}$/,
  };

  protected readonly passwordsForm = this.fb.group({
    password: ['', [Validators.required]],
    password2: ['', [Validators.required, samePasswordValidator]],
  });

  protected next(): void {
    const step = this.currenStep$.value;

    if (step === 1) {
      this.notify();
    } else if (step === 2) {
      if (this.code.value !== this.codeValue) {
        this.throwErrorCode();

        return;
      }
    } else if (step === 3) {
      this.resetPassword();

      return;
    }

    this.currenStep$.next(this.currenStep$.value + 1);
  }

  protected notify(): void {
    this.codeValue = [
      ...this.crypto.getRandomValues(new Uint16Array(4)).values(),
    ]
      .reduce((acc, x) => acc + x, 0)
      .toString()
      .split('')
      .reverse()
      .slice(0, 4)
      .join('');
    this.alerts
      .open(`SMS Code: ${this.codeValue}`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  protected throwErrorCode(): void {
    this.alerts
      .open('SMS код не совпадает', {
        status: 'error',
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  protected resetPassword(): void {
    this.auth.recoveryProcess$.next(true);
    this.authApi
      .updateApiAuthorizationRestore({
        login: this.login.value || '',
      })
      .pipe(
        switchMap((pass) => this.auth.login(this.login.value || '', `${pass}`)),
        switchMap(() =>
          this.clientApi.updateApiClientsPassword(
           {
              newPassword: this.passwordsForm.get('password')?.value || '',
            },
          ),
        ),
        catchError((e)=>{
          this.alerts.open(`${e.error}`, {status: 'error'}).subscribe()
          return EMPTY;
        }),
        tap(() => this.auth.logout()),
        tap(() => this.auth.recoveryProcess$.next(false)),
      )
      .subscribe(()=>{
        this.router.navigate(['/','auth', 'login']).then()
        this.alerts.open(`Пароль обновлен`, {status: 'success'}).subscribe()
      });
  }
}
