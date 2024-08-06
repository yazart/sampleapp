import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { TuiPaymentSystem } from '@taiga-ui/addon-commerce';

@Pipe({ standalone: true, name: 'paymentSystem' })
export class PaymentSystemPipe implements PipeTransform {
  public transform(value: string | undefined): TuiPaymentSystem {
    if (!value) {
      return 'mir';
    }

    if (value === 'МИР') {
      return 'mir';
    }

    return value.toLowerCase() as TuiPaymentSystem;
  }
}
