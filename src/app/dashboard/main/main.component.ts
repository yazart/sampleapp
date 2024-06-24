import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
    TuiCardModule,
    TuiCellModule,
    TuiFadeModule,
    TuiHeaderModule,
    TuiIconModule,
    TuiSurfaceModule, TuiThumbnailCardModule, TuiTitleModule
} from "@taiga-ui/experimental";
import {TuiLinkModule} from "@taiga-ui/core";
import {TuiMoneyModule} from "@taiga-ui/addon-commerce";
import {RouterLink} from "@angular/router";
import {AccountsApiService, CardsApiService} from "@api";
import {AsyncPipe} from "@angular/common";
import {TuiCurrencyVariants} from "@taiga-ui/addon-commerce/types";
import {combineLatest, combineLatestAll, map} from "rxjs";

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
    AsyncPipe
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
