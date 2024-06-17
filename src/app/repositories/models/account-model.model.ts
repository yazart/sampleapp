// Automatically generated - do not modify!

import type { AccountState, ClientModel } from '.';

export interface AccountModel {
  /* ID счёта */
  readonly id?: number;
  readonly client?: ClientModel;
  /* Дата открытия */
  readonly createdDate?: string;
  /* Валюта счёта */
  readonly currency?: number;
  /* Номер счёта */
  readonly number?: string;
  /* Наименование */
  readonly name?: string;
  /* Баланс */
  readonly balance?: number;
  readonly state?: AccountState;
}
