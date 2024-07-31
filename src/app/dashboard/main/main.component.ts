import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
    TuiCardModule,
    TuiCellModule,
    TuiFadeModule,
    TuiHeaderModule,
    TuiIconModule,
    TuiSurfaceModule, TuiTitleModule
} from "@taiga-ui/experimental";
import {TuiLinkModule} from "@taiga-ui/core";
import {TuiMoneyModule, TuiThumbnailCardModule} from "@taiga-ui/addon-commerce";
import {RouterLink} from "@angular/router";
import {AccountsApiService, CardsApiService} from "@api";
import {AsyncPipe} from "@angular/common";
import {PaymentSystemPipe} from "../payment-system.pipe";

@Component({
  selector: 'app-main',
  standalone: true,
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
    TuiThumbnailCardModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {


  public readonly cardsApi = inject(CardsApiService);
  public readonly accountsApi = inject(AccountsApiService);

  public readonly cards$ = this.cardsApi.getApiCards();
  public readonly cardsOrders$ = this.cardsApi.getApiCardsOrders();
  public readonly accounts$ = this.accountsApi.getApiAccounts();
}
