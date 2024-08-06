// Automatically generated - do not modify!

import type { AccountState } from '.';

export interface CardAccountModel {
  /* ID счёта */
  readonly id?: number;
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
