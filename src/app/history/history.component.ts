import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  TransactionsApiService,
  TransactionState,
  TransactionType,
} from '@api';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { TuiFormatDatePipeModule } from '@taiga-ui/core';
import {
  TuiAvatarModule,
  TuiBadgeModule,
  TuiCellModule,
  TuiTitleModule,
} from '@taiga-ui/experimental';
import { BehaviorSubject, switchMap } from 'rxjs';

import { NavigationComponent } from '../navigation/navigation.component';

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
  protected api = inject(TransactionsApiService);
  protected transactionsQuery = new BehaviorSubject({});
  protected transactions$ = this.transactionsQuery.pipe(
    switchMap((_query) => this.api.getApiTransactions()),
  );

  public state = TransactionState;
  public ttype = TransactionType;
}
