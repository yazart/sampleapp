import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import type { OperationInfo } from '@api';
import { OperationsApiService } from '@api';
import type { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyModule } from '@ngx-formly/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiTitleModule } from '@taiga-ui/experimental';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, map, startWith } from 'rxjs';

import { FormlyConfigModule } from './formly/formly.module';
import { OperationBuilderService } from './operation-builder.service';

@Component({
  standalone: true,
  selector: 'app-operation',
  imports: [
    JsonPipe,
    FormlyModule,
    AsyncPipe,
    FormlyConfigModule,
    TuiButtonModule,
    TuiTitleModule,
  ],
  templateUrl: './operation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OperationBuilderService],
  styleUrl: './operation.component.scss',
})
export class OperationComponent {
  private readonly operationApi = inject(OperationsApiService);
  public readonly loading$ = new BehaviorSubject<boolean>(false);
  public readonly form = new FormGroup({});
  public readonly formValid$ = this.form.statusChanges.pipe(
    map((status) => status !== 'VALID'),
    startWith(true),
  );

  public readonly context = inject(POLYMORPHEUS_CONTEXT);
  public readonly builder = inject(OperationBuilderService);
  public readonly rawOperation = new BehaviorSubject<OperationInfo>(
    this.context['data'],
  );

  public readonly finalStep$ = this.rawOperation.pipe(
    map((op) => op.isFinished),
  );

  public readonly title$ = this.rawOperation.pipe(map((op) => op.name));

  public readonly formlyFieldConfig$ = this.rawOperation.pipe(
    map((operation: OperationInfo): FormlyFieldConfig[] =>
      this.builder.build(operation),
    ),
  );

  protected next(): void {
    this.loading$.next(true);
    this.operationApi
      .updateApiOperations1(
        Object.entries(this.form.getRawValue()).map(([key, value]) => ({
          identifier: key,
          value: value as string,
        })),
        this.rawOperation.getValue().requestId,
      )
      .subscribe((e) => {
        this.loading$.next(false);
        this.rawOperation.next(e);
      });
  }

  protected confirm(): void {
    this.operationApi
      .sendApiOperations(this.rawOperation.getValue().requestId)
      .subscribe((_e) => {});
  }
}
