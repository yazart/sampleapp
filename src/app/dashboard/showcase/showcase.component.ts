import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { OperationCode, OperationsApiService, ShowcaseApiService } from '@api';
import { TuiDialogService } from '@taiga-ui/core';
import {
  TuiButtonModule,
  TuiCellModule,
  TuiTitleModule,
} from '@taiga-ui/experimental';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { map, switchMap } from 'rxjs';

import { OperationComponent } from '../operation/operation.component';

@Component({
  standalone: true,
  selector: 'app-showcase',
  imports: [
    AsyncPipe,
    JsonPipe,
    TuiCellModule,
    TuiTitleModule,
    TuiButtonModule,
  ],
  templateUrl: './showcase.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './showcase.component.scss',
})
export class ShowcaseComponent {
  @Input()
  public product?: string;

  public api = inject(ShowcaseApiService);
  public operationApi = inject(OperationsApiService);
  public dialogs = inject(TuiDialogService);
  public products$ = this.api.getApiShowcaseProducts().pipe(
    map((products) => {
      const filter = this.product === 'card' ? 'карта' : 'счёт';

      return products.filter((p) => p.name?.includes(filter));
    }),
  );

  public open(_id: number | undefined): void {
    const productRequest = this.operationApi.updateApiOperations({
      operationCode:
        this.product === 'card'
          ? OperationCode.CardOrder
          : OperationCode.AccountOpen,
    });

    productRequest
      .pipe(
        switchMap((operation) =>
          this.dialogs.open(new PolymorpheusComponent(OperationComponent), {
            size: 'page',
            closeable: true,
            dismissible: true,
            data: operation,
          }),
        ),
      )
      .subscribe();
  }
}
