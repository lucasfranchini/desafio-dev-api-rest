import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';
import { AccountSchema } from './account.schema';

export interface BankStatementSchema {
  id: Generated<number>;
  type: string;
  amount: number;
  accountNumber: number;
  createdAt: ColumnType<Date, undefined, never>;
  updatedAt: ColumnType<Date, undefined, never>;
  account?: AccountSchema;
}

export type BankStatement = Selectable<BankStatementSchema>;
export type NewBankStatement = Insertable<BankStatementSchema>;
export type BankStatementUpdate = Updateable<BankStatementSchema>;
