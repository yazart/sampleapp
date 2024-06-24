import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {OperationCode, OperationsApiService, ShowcaseApiService} from "@api";
import {map, of, switchMap} from "rxjs";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {TuiButtonModule, TuiCellModule, TuiTitleModule} from "@taiga-ui/experimental";
import {TuiDialogService} from "@taiga-ui/core";
import {OperationComponent} from "../operation/operation.component";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    TuiCellModule,
    TuiTitleModule,
    TuiButtonModule
  ],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcaseComponent {
  @Input() product?: string;
  api = inject(ShowcaseApiService);
  operationApi = inject(OperationsApiService);
  dialogs = inject(TuiDialogService);
  products$ = this.api.getApiShowcaseProducts().pipe(
    map((products)=>{
      const filter = this.product === 'card'? 'карта': 'счёт';
      return products.filter((p)=>{
        return p.name?.includes(filter);
      })
    })
  )
  open(id: number| undefined){

    const productRequest = this.operationApi.updateApiOperations({
      operationCode: this.product === 'card'? OperationCode.CardOrder: OperationCode.AccountOpen
    })

    productRequest.pipe(
      switchMap((operation)=>{
        return this.dialogs.open(
          new PolymorpheusComponent(OperationComponent),
          {
            size: 'page',
            closeable: true,
            dismissible: true,
            data: operation
          },
        )
      })
    ).subscribe()
  }
}
