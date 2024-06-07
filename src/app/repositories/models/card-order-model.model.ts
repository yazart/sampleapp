// Automatically generated - do not modify!

import { ClientModel, ProductModel, CardOrderState } from './';

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
