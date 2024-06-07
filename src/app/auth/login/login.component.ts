import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  TuiButtonModule,
  TuiLinkModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
} from '@taiga-ui/kit';
import { map, startWith } from 'rxjs';

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
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  protected readonly loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  protected readonly loginFormValid$ = this.loginForm.statusChanges.pipe(
    startWith(this.loginForm.status),
    map((e) => e === 'VALID'),
  );

  constructor(private readonly fb: FormBuilder) {}

  protected login(): void {
    console.log(this.loginForm.value);
  }
}
