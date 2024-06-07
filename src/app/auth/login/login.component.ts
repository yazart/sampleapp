import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiInputModule, TuiIslandModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiLinkModule, TuiSvgModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {map, startWith} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    AsyncPipe,
    TuiIslandModule,
    TuiLinkModule,
    RouterLink,
    TuiSvgModule
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  readonly loginForm =  this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  readonly loginFormInvalid$ = this.loginForm.statusChanges.pipe(startWith(this.loginForm.status), map((e)=> {return e !== 'VALID';}))

  constructor(private readonly fb: FormBuilder) {}

  login():void {
    console.log(this.loginForm.value);
  }
}
