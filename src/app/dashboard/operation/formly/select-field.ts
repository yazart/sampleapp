import {ChangeDetectionStrategy, Component} from "@angular/core";
import {FieldType, FormlyFieldConfig, FormlyFieldProps} from "@ngx-formly/core";
import {isObservable, Observable, of, switchMap} from "rxjs";

@Component({
  selector: 'app-formly-input',
  template: `
    <tui-select
      [tuiTextfieldSize]="props.size"
      [formControl]="$any(formControl)"
      class="tui-space_top-4"
    >
      {{props.label}}
      <input
        tuiTextfield
        [required]="props.required"
      />
      <tui-data-list-wrapper
        *tuiDataList
        [items]="selectItems$ | async"
      ></tui-data-list-wrapper>
    </tui-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlySelectType extends FieldType<FormlyFieldConfig<FormlyFieldProps & { clean: boolean, fieldType: 'text' | 'number', size: 's' | 'm' | 'l', selectOptions: any[], selectOptions$: Observable<any[]> }>> {
  public readonly selectItems$ = of([]).pipe(
    switchMap(()=>{
      if(this.props.selectOptions$){
        return this.props.selectOptions$;
      }
      return of(this.props.selectOptions);
    })
  )
}
