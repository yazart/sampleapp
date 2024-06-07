import { ChangeDetectionStrategy, Component } from '@angular/core';
import {AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";
import {TuiButtonModule, TuiErrorModule, TuiGroupModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {map, startWith} from "rxjs";
import {TuiDay} from "@taiga-ui/cdk";
import {ClientsApiService, CreateClientModel, SexType} from "@api";
import {ControlConfigMap} from "../../types/form-type";
import {formExtractorFn} from "../../form-utils/form-extractor.fn";
import {
  TUI_VALIDATION_ERRORS,
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputModule, TuiInputPasswordModule,
  TuiInputPhoneModule,
  TuiIslandModule,
  TuiRadioBlockModule,
  TuiRadioLabeledModule
} from "@taiga-ui/kit";
import {RouterLink} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {SKIP_HEADER} from "../auth-interceptor.fn";
import {LogoComponent} from "../../logo.component";


export type CreateClientModelForm = CreateClientModel & {password2: string};

export const samePasswordValidator = (control: AbstractControl): ValidationErrors | null => {
  const pass = control.parent?.get('password')?.value || null;
  const pass2 = control.value;
  return pass && pass2 && pass === pass2 ? null: {
    samePassword: 'Пароли не совпадают',
  };
}


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    LogoComponent
  ],
  selector: 'app-register',
  standalone: true,
  styleUrl: 'register.component.scss',
  templateUrl: './register.component.html',
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        pattern: 'Телефон введен неверно'
      },
    },
  ]
})
export class RegisterComponent {
  readonly registerForm =  this.fb.group<ControlConfigMap<CreateClientModelForm>>({
    phoneNumber: ['', [Validators.required, Validators.pattern(/\+7\d{10}/ig)]],
    login: ['', Validators.required],
    email: ['', Validators.required],
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    middleName: ['', Validators.required],
    birthdate: [undefined, Validators.required],
    sex: [SexType.Unknown, Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    address: ['', Validators.required],
    password2: ['', [Validators.required, Validators.minLength(8), samePasswordValidator], []],
  });

  readonly sexType = SexType;
  private readonly currentDay = new Date();
  readonly maxDate = new TuiDay(this.currentDay.getFullYear()-18, this.currentDay.getMonth(), this.currentDay.getDate())
  readonly minDate = new TuiDay(this.currentDay.getFullYear() - 100, this.currentDay.getMonth(), this.currentDay.getDate())
  readonly registerFormValid$ = this.registerForm.statusChanges.pipe(
    startWith(this.registerForm.status),
    map((e)=> {return e === 'VALID';})
  )
  constructor(private readonly fb: FormBuilder,
              private readonly api: ClientsApiService) {
  }
  register():void {
    console.log(this.registerForm.value);
    this.registerForm.updateValueAndValidity({emitEvent: true});
    if(this.registerForm.valid){
      const {password2, ...form} = this.registerForm.getRawValue();
      this.api.updateApiClients(formExtractorFn<CreateClientModel>(form),undefined, {[SKIP_HEADER]: `${SKIP_HEADER}`}).subscribe((e)=>{
        console.log(e)
      })
    }
  }
}
