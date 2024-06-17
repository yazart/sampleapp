// Automatically generated - do not modify!

import type { CardOrderState, ClientModel, ProductModel } from '.';

export interface CardOrderModel {
  /* ID заказа */
  readonly id?: number;
  readonly client?: ClientModel;
  /* Программа выпуска */
  readonly cardProgram?: string;
  readonly product?: ProductModel;
  /* ID поручения */
  readonly requestId?: number;
  readonly state?: CardOrderState;
}
