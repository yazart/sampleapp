import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountsApiService, CardsApiService } from '@api';
import {
  TuiMoneyModule,
  TuiThumbnailCardModule,
} from '@taiga-ui/addon-commerce';
import { TuiLinkModule } from '@taiga-ui/core';
import {
  TuiCardModule,
  TuiCellModule,
  TuiFadeModule,
  TuiHeaderModule,
  TuiIconModule,
  TuiSurfaceModule,
  TuiTitleModule,
} from '@taiga-ui/experimental';

import { PaymentSystemPipe } from '../payment-system.pipe';

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [
    TuiCardModule,
    TuiCellModule,
    TuiFadeModule,
    TuiHeaderModule,
    TuiIconModule,
    TuiLinkModule,
    TuiMoneyModule,
    TuiSurfaceModule,
    TuiThumbnailCardModule,
    TuiTitleModule,
    RouterLink,
    AsyncPipe,
    PaymentSystemPipe,
    TuiThumbnailCardModule,
  ],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './main.component.scss',
})
export class MainComponent {
  public readonly cardsApi = inject(CardsApiService);
  public readonly accountsApi = inject(AccountsApiService);

  public readonly cards$ = this.cardsApi.getApiCards();
  public readonly cardsOrders$ = this.cardsApi.getApiCardsOrders();
  public readonly accounts$ = this.accountsApi.getApiAccounts();
}
