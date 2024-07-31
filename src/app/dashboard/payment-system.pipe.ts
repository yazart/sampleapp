import {Pipe, PipeTransform} from '@angular/core';
import {TuiPaymentSystem} from "@taiga-ui/addon-commerce";

@Pipe({
  name: 'paymentSystem',
  standalone: true,
})
export class PaymentSystemPipe implements PipeTransform {
  transform(value: string | undefined): TuiPaymentSystem {
    if(!value){
      return 'mir'
    }
    if(value === 'МИР') {
      return 'mir'
    }
    return value.toLowerCase() as TuiPaymentSystem;
  }
}
