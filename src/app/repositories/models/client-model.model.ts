// Automatically generated - do not modify!

import { SexType } from './';

export interface ClientModel {
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
	/* Требование сменить пароль */
	readonly isMustChangePassword?: boolean;
}
