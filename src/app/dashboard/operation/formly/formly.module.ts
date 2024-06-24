import {NgModule} from "@angular/core";
import {FormlyInputType} from "./input-field";
import {FormlyModule} from "@ngx-formly/core";
import {ControlTypeConstant} from "./control-type.constant";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TuiDataListWrapperModule, TuiInputModule, TuiSelectModule} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";
import {AsyncPipe} from "@angular/common";
import {FormlySelectType} from "./select-field";

@NgModule({
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    FormlyModule.forRoot({
      types: [
        {
          name: ControlTypeConstant.Input,
          component: FormlyInputType
        },
        {
          name: ControlTypeConstant.Select,
          component: FormlySelectType
        }
      ]
    }),
    FormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiDataListWrapperModule,
    TuiSelectModule
  ],
  declarations: [
    FormlyInputType,
    FormlySelectType
  ]
})
export class FormlyConfigModule{}
