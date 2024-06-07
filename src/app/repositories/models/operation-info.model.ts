// Automatically generated - do not modify!

import { OperationCode, StepParam } from './';

export interface OperationInfo {
	/* ID клиента */
	readonly clientId?: number;
	/* Флаг завершенности операции */
	readonly isConfirmed?: boolean;
	/* Флаг окончания операции */
	readonly isFinished?: boolean;
	/* Название */
	readonly name?: string;
	readonly operationCode?: OperationCode;
	/* ID поручения */
	readonly requestId?: number;
	/* Дата запуска */
	readonly startDate?: string;
	/* Шаг */
	readonly stepId?: number;
	/* Параметры шага */
	readonly stepParams?: StepParam[];
}
