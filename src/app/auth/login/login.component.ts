import {AsyncPipe, JsonPipe} from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  TuiButtonModule, TuiErrorModule,
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
import { map, startWith } from 'rxjs';
import {AuthorizationApiService} from "@api";
import {AuthService} from "../auth.service";
import {LogoComponent} from "../../logo.component";

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
  protected readonly loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  protected readonly loginFormValid$ = this.loginForm.statusChanges.pipe(
    startWith(this.loginForm.status),
    map((e) => e === 'VALID'),
  );

  protected readonly loginData$ = this.auth.tokenModel$;

  constructor(private readonly fb: FormBuilder, private readonly auth: AuthService) {}

  protected login(): void {
    this.loginForm.updateValueAndValidity({emitEvent: true});
    if(this.loginForm.valid){
      const {login, password} = this.loginForm.getRawValue();
      if(login && password){
        this.auth.login(
          login,
          password
        ).subscribe((success )=>{
          console.log(success);
        });
      }else {
        //alarm
      }

    }
  }
}
