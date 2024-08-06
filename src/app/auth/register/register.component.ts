import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import type { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import type { CreateClientModel } from '@api';
import { ClientsApiService, SexType } from '@api';
import { TuiDay } from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiButtonModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TUI_VALIDATION_ERRORS,
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiInputPhoneModule,
  TuiIslandModule,
  TuiRadioBlockModule,
  TuiRadioLabeledModule,
} from '@taiga-ui/kit';
import { catchError, EMPTY, map, startWith, switchMap } from 'rxjs';

import { formExtractorFn } from '../../form-utils/form-extractor.fn';
import { LogoComponent } from '../../logo.component';
import type { ControlConfigMap } from '../../types/form-type';
import { SKIP_HEADER } from '../auth-interceptor.fn';

export type CreateClientModelForm = CreateClientModel & { password2: string };

export const samePasswordValidator = (
  control: AbstractControl,
): ValidationErrors | null => {
  const pass = control.parent?.get('password')?.value || null;
  const pass2 = control.value;

  return pass && pass2 && pass === pass2
    ? null
    : {
        samePassword: 'Пароли не совпадают',
      };
};

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    TuiButtonModule,
    TuiInputModule,
    TuiIslandModule,
    TuiTextfieldControllerModule,
    RouterLink,
    TuiInputPhoneModule,
    TuiInputPasswordModule,
    TuiInputDateModule,
    AsyncPipe,
    TuiRadioLabeledModule,
    TuiGroupModule,
    TuiRadioBlockModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    LogoComponent,
  ],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        pattern: 'Телефон введен неверно',
        required: 'Поле не заполнено',
        email: 'Введите корректный адрес электронной почты',
        minlength: ({ requiredLength }: { requiredLength: string }) =>
          `Минимальная длинна — ${requiredLength} символов`,
      },
    },
  ],
  styleUrl: 'register.component.scss',
})
export class RegisterComponent {
  private readonly alerts = inject(TuiAlertService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ClientsApiService);
  private readonly currentDay = new Date();

  protected readonly registerForm = this.fb.group<
    ControlConfigMap<CreateClientModelForm>
  >({
    phoneNumber: ['', [Validators.required, Validators.pattern(/\+7\d{10}/gi)]],
    login: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    middleName: ['', Validators.required],
    birthdate: [undefined, Validators.required],
    sex: [SexType.Unknown, Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    address: ['', Validators.required],
    password2: [
      '',
      [Validators.required, Validators.minLength(8), samePasswordValidator],
      [],
    ],
  });

  protected readonly sexType = SexType;

  protected readonly maxDate = new TuiDay(
    this.currentDay.getFullYear() - 18,
    this.currentDay.getMonth(),
    this.currentDay.getDate(),
  );

  protected readonly minDate = new TuiDay(
    this.currentDay.getFullYear() - 100,
    this.currentDay.getMonth(),
    this.currentDay.getDate(),
  );

  protected readonly registerFormValid$ = this.registerForm.statusChanges.pipe(
    startWith(this.registerForm.status),
    map((e) => e === 'VALID'),
  );

  protected register(): void {
    this.registerForm.updateValueAndValidity({ emitEvent: true });

    if (this.registerForm.valid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password2, ...form } = this.registerForm.getRawValue();

      this.api
        .updateApiClients(formExtractorFn<CreateClientModel>(form), undefined, {
          [SKIP_HEADER]: `${SKIP_HEADER}`,
        })
        .pipe(
          catchError((e: unknown) => {
            const inner: { error: string } = e as { error: string };

            this.alerts.open(`${inner.error}`, { status: 'error' }).subscribe();

            return EMPTY;
          }),
          switchMap(() =>
            this.alerts.open('Регистрация прошла успешно, авторизуйтесь!', {
              status: 'success',
            }),
          ),
        )
        .subscribe(() => {
          this.router.navigate(['/', 'auth', 'login']).then();
        });
    }
  }
}
