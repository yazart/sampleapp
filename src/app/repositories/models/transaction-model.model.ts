// Automatically generated - do not modify!

import { AccountModel, TransactionState, TransactionType } from './';

export interface TransactionModel {
	/* ID транзакции */
	readonly id?: number;
	readonly account?: AccountModel;
	/* Получатель */
	readonly receiver?: string;
	/* Дата */
	readonly date?: string;
	/* Дата выполнения транзакции */
	readonly paymentDate?: string;
	/* Сумма */
	readonly amount?: number;
	/* Комментарий */
	readonly comment?: string;
	/* Причина */
	readonly reason?: string;
	readonly state?: TransactionState;
	readonly type?: TransactionType;
}
