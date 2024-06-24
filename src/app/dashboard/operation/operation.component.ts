import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {FormlyFieldConfig, FormlyModule} from "@ngx-formly/core";
import {FormGroup} from "@angular/forms";
import {BehaviorSubject, map, startWith} from "rxjs";
import {OperationBuilderService} from "./operation-builder.service";
import {type OperationInfo, OperationsApiService} from "@api";
import {FormlyConfigModule} from "./formly/formly.module";
import {TuiButtonModule} from "@taiga-ui/core";
import {TuiTitleModule} from "@taiga-ui/experimental";

@Component({
  selector: 'app-operation',
  standalone: true,
  imports: [
    JsonPipe,
    FormlyModule,
    AsyncPipe,
    FormlyConfigModule,
    TuiButtonModule,
    TuiTitleModule
  ],
  templateUrl: './operation.component.html',
  styleUrl: './operation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OperationBuilderService]
})
export class OperationComponent {
  public readonly loading$ = new BehaviorSubject<boolean>(false);
  public readonly form = new FormGroup({});
  public readonly formValid$ = this.form.statusChanges.pipe(
    map((status)=>status !== 'VALID'),
    startWith(true),
  );
  public readonly context = inject(POLYMORPHEUS_CONTEXT);
  public readonly builder = inject(OperationBuilderService);
  public readonly rawOperation = new BehaviorSubject<OperationInfo>(this.context['data']);
  public readonly finalStep$ = this.rawOperation.pipe(
    map(op=> op.isFinished)
  )
  public readonly title$ = this.rawOperation.pipe(map((op)=>{
    return op.name;
  }));
  public readonly formlyFieldConfig$ = this.rawOperation.pipe(
    map((operation: OperationInfo): FormlyFieldConfig[]=>{
      return this.builder.build(operation)
    })
  )

  constructor(private readonly operationApi: OperationsApiService) {
  }

  next(): void {
    this.loading$.next(true);
    this.operationApi.updateApiOperations1(
      Object.entries(this.form.getRawValue()).map(([key, value])=>{
      return {
        identifier: key,
        value: value as string,
      };
    }), this.rawOperation.getValue().requestId).subscribe((e)=>{
      this.loading$.next(false);
      this.rawOperation.next(e);
    })
  }
  confirm():void {
    this.operationApi.sendApiOperations(this.rawOperation.getValue().requestId).subscribe((e)=>{
      console.log(e);
    })
  }
}
