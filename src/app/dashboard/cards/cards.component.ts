import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardsApiService } from '@api';
import { TuiButtonModule } from '@taiga-ui/core';
import {
  TuiBadgeNotificationModule,
  TuiHeaderModule,
  TuiTitleModule,
} from '@taiga-ui/experimental';
import { filter, map, of, shareReplay, switchMap } from 'rxjs';

import { PaymentSystemPipe } from '../payment-system.pipe';

@Component({
  standalone: true,
  selector: 'app-cards',
  imports: [
    AsyncPipe,
    JsonPipe,
    TuiHeaderModule,
    TuiTitleModule,
    TuiBadgeNotificationModule,
    TuiButtonModule,
    PaymentSystemPipe,
  ],
  templateUrl: './cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  public cardSevice = inject(CardsApiService);
  public route = inject(ActivatedRoute);

  public card$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const cardId = Number(params.get('cardId'));

      if (cardId) {
        return this.cardSevice
          .getApiCards()
          .pipe(
            map((cards) =>
              cards.find((card) => card?.id === (cardId as unknown as number)),
            ),
          );
      }

      return of(null);
    }),
    filter((x) => !!x),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
}
