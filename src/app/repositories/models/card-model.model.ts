// Automatically generated - do not modify!

import type { CardAccountModel, CardState, ClientModel, ProductModel } from '.';

export interface CardModel {
  /* ID карты */
  readonly id?: number;
  readonly account?: CardAccountModel;
  readonly client?: ClientModel;
  /* Программа выпуска */
  readonly cardProgram?: string;
  readonly product?: ProductModel;
  /* Номер */
  readonly number?: string;
  /* Месяц */
  readonly month?: string;
  /* Год */
  readonly year?: string;
  /* Требуется установка PIN-кода */
  readonly pinRequired?: boolean;
  readonly state?: CardState;
}
