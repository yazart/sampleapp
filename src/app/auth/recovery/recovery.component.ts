import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe} from "@angular/common";
import {LogoComponent} from "../../logo.component";
import {TuiButtonModule, TuiErrorModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {
  TuiFieldErrorPipeModule,
  TuiInputModule, TuiInputNumberModule,
  TuiInputPasswordModule, TuiInputPhoneModule,
  TuiInputYearModule,
  TuiIslandModule, TuiProgressModule
} from "@taiga-ui/kit";
import {RouterLink} from "@angular/router";
import {TuiProgressSegmentedModule} from "@taiga-ui/experimental";
import {BehaviorSubject} from "rxjs";
import {samePasswordValidator} from "../register/register.component";
import {MaskitoModule} from "@maskito/angular";

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
    TuiInputPasswordModule,
    TuiInputYearModule,
    TuiIslandModule,
    TuiTextfieldControllerModule,
    RouterLink,
    TuiInputPhoneModule,
    TuiProgressModule,
    TuiProgressSegmentedModule,
    TuiInputNumberModule,
    MaskitoModule
  ],
  templateUrl: './recovery.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoveryComponent {
  currenStep$ = new BehaviorSubject(1);

  protected readonly phoneNumber = new FormControl<string>('', Validators.required)
  protected readonly code = new FormControl<string>('', Validators.required)
  protected readonly codeMask = {
    mask: /^\d\d\d\d$/,
  }

  protected readonly passwordsForm = this.fb.group({
    password: ['',[Validators.required]],
    password2: ['', [Validators.required, samePasswordValidator]]
  });
  constructor(private readonly fb: FormBuilder) {
  }
  recover(): void {
    this.currenStep$.next(this.currenStep$.value+1);
  }
}
