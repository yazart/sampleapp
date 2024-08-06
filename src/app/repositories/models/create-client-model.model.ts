// Automatically generated - do not modify!

import type { SexType } from '.';

export interface CreateClientModel {
  /* Логин */
  readonly login?: string;
  /* Email */
  readonly email?: string;
  /* Фамилия */
  readonly lastName?: string;
  /* Имя */
  readonly firstName?: string;
  /* Отчество */
  readonly middleName?: string;
  readonly sex?: SexType;
  /* Дата рождения */
  readonly birthdate?: string;
  /* Номер телефона */
  readonly phoneNumber?: string;
  /* Адрес */
  readonly address?: string;
  /* Пароль */
  readonly password?: string;
}
