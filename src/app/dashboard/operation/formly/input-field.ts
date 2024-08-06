import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-input',
  template: `
    <tui-input
      [formControl]="$any(formControl)"
      [tuiTextfieldSize]="props.size"
      [tuiTextfieldCleaner]="props.clean"
      class="tui-space_top-4"
    >
      {{ props.label }}
      <input
        tuiTextfield
        [required]="props.required"
        [type]="props.fieldType"
      />
    </tui-input>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyInputType extends FieldType<
  FormlyFieldConfig<
    FormlyFieldProps & {
      clean: boolean;
      fieldType: 'number' | 'text';
      size: 'l' | 'm' | 's';
    }
  >
> {}
