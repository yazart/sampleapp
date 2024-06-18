import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {NavigationComponent} from "../navigation/navigation.component";
import {TuiAvatarModule,TuiBadgeModule, TuiCellModule, TuiTitleModule} from "@taiga-ui/experimental";
import {type AccountModel, TransactionsApiService, TransactionState, TransactionType} from "@api";
import {BehaviorSubject, skip, startWith, switchMap} from "rxjs";
import {AsyncPipe, DatePipe} from "@angular/common";
import {TuiMoneyModule} from "@taiga-ui/addon-commerce";
import {TuiFormatDatePipeModule} from "@taiga-ui/core";

@Component({
  standalone: true,
  selector: 'app-history',
  imports: [
    NavigationComponent,
    TuiCellModule,
    TuiAvatarModule,
    TuiTitleModule,
    TuiBadgeModule,
    AsyncPipe,
    TuiMoneyModule,
    TuiFormatDatePipeModule,
    DatePipe,
  ],
  templateUrl: './history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  api = inject(TransactionsApiService);
  transactionsQuery = new BehaviorSubject({});
  public state = TransactionState;
  public ttype = TransactionType;
  transactions$ = this.transactionsQuery.pipe(
    switchMap((query)=>{
      return this.api.getApiTransactions();
    }),
    skip(1),
    startWith([
      {
        id: 1,
        account: 1,
        /* Получатель */
        receiver: 'Вкусно и точка',
        /* Дата */
        date: new Date(),
        /* Дата выполнения транзакции */
        paymentDate: new Date(),
        /* Сумма */
        amount: 12345,
        /* Комментарий */
        comment: 'перевод',
        /* Причина */
        reason: '',
        state: TransactionState.Hold,
        type: TransactionType.Expense,
      }
    ])
  )
  protected readonly TransactionType = TransactionType;
}
