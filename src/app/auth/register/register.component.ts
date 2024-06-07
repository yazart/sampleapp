import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiButtonModule, TuiGroupModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {map, startWith} from "rxjs";
import {TuiDay} from "@taiga-ui/cdk";
import {ClientsApiService, CreateClientModel, SexType} from "@api";
import {ControlConfigMap} from "../../types/form-type";
import {formExtractorFn} from "../../form-utils/form-extractor.fn";
import {
  TuiInputDateModule,
  TuiInputModule, TuiInputPasswordModule,
  TuiInputPhoneModule,
  TuiIslandModule,
  TuiRadioBlockModule,
  TuiRadioLabeledModule
} from "@taiga-ui/kit";
import {RouterLink} from "@angular/router";
import {AsyncPipe} from "@angular/common";


export type CreateClientModelForm = CreateClientModel & {password2: string};

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
    TuiRadioBlockModule
  ],
  selector: 'app-register',
  standalone: true,
  styleUrl: 'register.component.scss',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  readonly registerForm =  this.fb.group<ControlConfigMap<CreateClientModelForm>>({
    phoneNumber: ['', Validators.required],
    login: ['', Validators.required],
    email: ['', Validators.required],
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    middleName: ['', Validators.required],
    birthdate: [undefined, Validators.required],
    sex: [SexType.Unknown, Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required],
  });

  readonly sexType = SexType;
  private readonly currentDay = new Date();
  readonly maxDate = new TuiDay(this.currentDay.getFullYear()-18, this.currentDay.getMonth(), this.currentDay.getDate())

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
      this.api.updateApiClients(formExtractorFn<CreateClientModel>(form)).subscribe((e)=>{
        console.log(e)
      })
    }
  }
}
